<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

class MercadoPagoController extends Controller
{
    public function notification(Request $request)
    {
        MercadoPagoConfig::setAccessToken(env("MP_ACCESS_TOKEN"));
        $client = new PaymentClient();
  
        $action = $request->input('action');

        \Log::info($request->all());

        switch($action) {
            case "payment.updated":
                $status = $client->get($request->data_id)->status;

                if ($status === 'approved') {
                    $transaction = Transaction::where('payment_id', $request->data_id)->first();
                    $transaction->aprove();
                    \Log::info("Transação aprovada: " . $transaction->payment_id . ". Adicionado " . $transaction->deposit);
                }

                if ($status === 'cancelled') {
                    $transaction = Transaction::where('payment_id', $request->data_id)->first();
                    $transaction->cancel();
                }
            
                // no break
            case "payment.created":
                \Log::info("Transação criada");
        }

        return response()->json(['status' => 200], 200);
    }
}
