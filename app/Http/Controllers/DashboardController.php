<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;

use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // $transactions = Transaction::where('status', Transaction::APROVED);

        $transactionsDayGroup = Transaction::whereBetween('created_at', [now()->subDays(30), now()])
        ->where('status', Transaction::APROVED)
             ->orderBy('created_at')
             ->get()
             ->groupBy(function ($val) {
                 return $val->created_at->format('Y-m-d');
             });
        $transactionsDayMonth = Transaction::whereBetween('created_at', [now()->subMonths(13), now()])
        ->where('status', Transaction::APROVED)
        ->orderBy('created_at')
        ->get()
        ->groupBy(function ($val) {
            return $val->created_at->format('M');
        });

        $transactionsToDay = Transaction::whereBetween('created_at', [now()->subHours(24), now()])
        ->where('status', Transaction::APROVED)
        ->orderBy('created_at')
        ->get()
        ->groupBy(function ($val) {
            return $val->type;
        });
     
        return Inertia::render(
            'Dashboard',
            [
                'dashboard' => $transactionsDayGroup,
                'incomes'   => $transactionsDayMonth,
                'today'     => $transactionsToDay,
                // 'transactions' => $transactions
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
