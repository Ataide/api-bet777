<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreWalletRequest;
use App\Http\Requests\UpdateWalletRequest;
use App\Models\Wallet;
use Auth;
use Exception;

class WalletController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        return response()->json($user->wallet);
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
    public function store(StoreWalletRequest $request)
    {
    }

    /**
     * Display the specified resource.
     */
    public function show(Wallet $wallet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Wallet $wallet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateWalletRequest $request, Wallet $wallet)
    {
        $this->authorize('update', $wallet);

        try {
            $user = $request->user();
        
            $fields = $request->validated();

            $amount = $fields['amount'];

            $type = $fields['type'];

            if ($type == 'deposit') {
                $wallet->fill(['amount' => $wallet->amount + $amount]);
                $user->createDepositTransaction($amount);
            }

            if ($type == 'withdraw') {
                $haveFunds = $user->checkIfHaveFunds($amount);
                if (!$haveFunds) {
                    throw new Exception("Não há fundos disponível para a solicitação");
                }
                $wallet->fill(['amount' => $wallet->amount - $amount]);
                $user->createWithdrawTransaction($amount);
            }
            $wallet->save();
            
            return response()->json(['message' => 'Operação realizada com sucesso, adicionado ' . $amount]);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Operação não foi realizada.' . $th->getMessage()], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Wallet $wallet)
    {
        //
    }
}
