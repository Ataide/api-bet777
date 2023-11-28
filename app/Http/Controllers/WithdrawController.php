<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWithdrawRequest;
use App\Http\Requests\UpdateWithdrawRequest;
use App\Models\Transaction;
use App\Models\Withdraw;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Redirect;

class WithdrawController extends Controller
{
    /**
     * Display a listing of the resource.
     */

    public function index()
    {
        $withdraws = Withdraw::when(Request::input('search'), function (Builder $query, $search) {
            $query->whereRelation('user', 'name', 'like', '%' . $search . '%');
        })
        ->when(Request::input('status'), function (Builder $query, $status) {
            $query->where('status', $status);
        })
        ->with(['user.wallet', 'user.profile', 'transaction'])
        ->paginate(5);
        
        $all = Withdraw::all()->count();

        $pending = Withdraw::where('status', Transaction::PENDING)->count();

        $aproved = Withdraw::where('status', Transaction::APROVED)->count();

        $canceled = Withdraw::where('status', Transaction::CANCELED)->count();

        $totals_groups = collect(
            ['pending' => $pending, 'aproved' => $aproved, 'canceled' => $canceled, 'total_withdraws' => $all]
        );
        
        $with_totals = $totals_groups->merge($withdraws);

        return Inertia::render(
            'Withdraws',
            [
                'withdraws' => $with_totals,
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
    public function store(StoreWithdrawRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Withdraw $withdraw)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Withdraw $withdraw)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWithdrawRequest $request, Withdraw $withdraw)
    {
        // $this->authorize('update', $withdraw);
        try {
            $status = $request->input('status');

            if ($withdraw->status === 'aproved') {
                throw new Exception("Essa transação não pode ser alterada. Já foi aprovada.", 1);
            }
            
            switch ($status) {
                case 'aproved':
                    $haveFunds = $withdraw->user->checkIfHaveFundsToDraw($withdraw->amount);
                    
                    if (!$haveFunds) {
                        throw new Exception("Não há fundos disponível para a solicitação");
                    }
                    
                    $withdraw->aproveWithdrawTransaction();
                    $withdraw->update([
                        'status' => $request->input('status'),
                        'reason' => $request->input('reason')
                    ]);

                    break;
                case 'canceled':
                    $withdraw->cancelWithdrawTransaction();

                    $withdraw->update([
                        'status' => $request->input('status'),
                        'reason' => $request->input('reason')
                    ]);

                    break;

                case 'pending':
                    $withdraw->update([
                        'status' => $request->input('status'),
                        'reason' => $request->input('reason')
                    ]);
    
                    break;
            }
      
            return Redirect::back()->with(['message' => 'Operação não foi realizada.']);
        } catch (\Throwable $th) {
            return Redirect::back()->withErrors(['message' => 'Operação não foi realizada. ' . $th->getMessage()]);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Withdraw $withdraw)
    {
        //
    }
}
