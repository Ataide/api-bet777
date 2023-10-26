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

        $transactions = Transaction::selectRaw("(select name from users u where u.id = user_id) as name")
     
            ->selectRaw("SUM(deposit) as total_deposits")
            ->selectRaw("SUM(withdraw) as total_withdraws")
            ->groupBy('name')
            ->paginate(5);
          
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
