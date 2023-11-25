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

            //Valor a ser atualizado.
            $amount = $fields['amount'];

            // Tipo de transação;
            $type = $fields['type'];

            if ($type == 'deposit') {
                // Cria a transação interna;
                $transaction = $user->createDepositTransaction($amount);

                // Envia a transação para para gerar o qrcode de pagamento.
                $qr_code = $transaction->requestMercadoPagoPix();

                return response()->json([
                    'message' => 'Operação realizada com sucesso',
                    "qr_code" => $qr_code
                ], 200);
            }

            if ($type == 'withdraw') {
                $haveFunds = $user->checkIfHaveFunds($amount);
                
                if (!$haveFunds) {
                    throw new Exception("Não há fundos disponível para a solicitação");
                }

                $user->createWithdrawTransaction($amount);
                
                $wallet->processWithdraw($amount);
            }
            
            return response()->json(['message' => 'Operação realizada com sucesso'], 200);
        } catch (\Throwable $th) {

            return response()->json(['message' => $th], 422);

            \Log::debug(print_r($th, 1));
              
            // \Log::debug(json_decode($th));

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
