<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
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

        $transactionDetails = Transaction::query()
        ->when(Request::input('id'), function (Builder $query, $user_id) {
            $query->where('user_id', $user_id);
        })
        ->when(Request::input('type'), function (Builder $query, $type) {
            $query->where('type', $type);
        })
        ->paginate(5);

        $totals_groups = collect(
            ['total_deposit' => 10, 'total_withdraw' => 10]
        )->merge($transactionDetails);

        return Inertia::render(
            'Transactions',
            [
                'transactions'       => $transactions,
                'transactionDetails' => $totals_groups,
                // 'withdraws'    => $withdraws
            ]
        );
    }

    public function show(Request $request)
    {
        // $transactions = Transaction::selectRaw("(select name from users u where u.id = user_id) as name")
        //     ->selectRaw("SUM(deposit) as total_deposits")
        //     ->selectRaw("SUM(withdraw) as total_withdraws")
        //     ->selectRaw("user_id")
        //     ->groupBy('user_id')
        //     ->paginate(5);

        // $transactionDetails = Transaction::query()
        //     ->when(Request::input('id'), function (Builder $query, $id) {
        //         $query->where('user_id', $id);
        //     })
        //     ->when(Request::input('type'), function (Builder $query, $type) {
        //         $query->where('type', $type);
        //     })
        //     // ->with('profile')
        //     ->paginate(5);
          
        // return Inertia::render(
        //     'Transactions',
        //     [
        //         'transactions'       => $transactions,
        //         'transactionDetails' => $transactionDetails,
        //         // 'withdraws'    => $withdraws
        //     ]
        // );
    }
}
