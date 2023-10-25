<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Auth;
use Inertia\Inertia;

class TransactionController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        $transactions = Transaction::with('user')
            ->selectRaw("SUM(deposit) as total_deposits")
            ->selectRaw("SUM(withdraw) as total_withdraws")
            ->selectRaw("(select name from users u where u.id = user_id) as name")
            ->groupBy('name')
            ->paginate(5)
            ->all();
           
        return Inertia::render(
            'Transactions',
            [
                'transactions' => $transactions,
                // 'deposits'     => $deposits,
                // 'withdraws'    => $withdraws
            ]
        );
    }
}
