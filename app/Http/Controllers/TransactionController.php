<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Request;

class TransactionController extends Controller
{
    public function index()
    {
        $transactions = Transaction::when(Request::input('search'), function (Builder $query, $search) {
            $query->whereRelation('user', 'name', 'like', '%' . $search . '%');
        })
            ->selectRaw("(select name from users u where u.id = user_id) as name")
            ->selectRaw("SUM(deposit) as total_deposits")
            ->selectRaw("SUM(withdraw) as total_withdraws")
            ->selectRaw("user_id")
            ->groupBy('user_id')
            ->paginate(5);

        $transactionDetails = Transaction::where('user_id', Request::input('id'))
        ->when(Request::input('type'), function (Builder $query, $type) {
            $query->where('type', $type);
        })
        ->when(Request::input('date'), function (Builder $query, $date) {
            $query->whereDate('created_at', '=', Carbon::parse($date));
        })
        ->orderBy('created_at', 'DESC')
        ->paginate(5);

        $total_deposits = 0;
        $total_withdraw = 0;
        $total_geral    = 0;
        
        if (Request::input('id')) {
            $total_deposits = Transaction::where(['user_id' => Request::input('id'), 'type' => 'deposit'])->count();
            $total_withdraw = Transaction::where(['user_id' => Request::input('id'), 'type' => 'withdraw'])->count();
            $total_geral    = Transaction::where(['user_id' => Request::input('id')])->count();
        }

        $totals_groups = collect(
            ['total_deposit' => $total_deposits, 'total_withdraw' => $total_withdraw, 'total_geral' => $total_geral]
        )->merge($transactionDetails);

        return Inertia::render(
            'Transactions',
            [
                'transactions'       => $transactions,
                'transactionDetails' => $totals_groups,
            ]
        );
    }

    public function show(Request $request)
    {
    }
}
