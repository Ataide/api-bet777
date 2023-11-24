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

        switch($action) {
            case "state_FINISHED":
                // $payment = Payment::find_by_id($_POST["data"]["id"]);
                // \Log::debug(print_r($payment, 1));
              
            case "payment.created":

                $transaction = Transaction::where('payment_id', $request->data_id)->first();
                $transaction->aprove();
                \Log::info("Transação aprovada: " . $transaction->payment_id . ". Adicionado " . $transaction->deposit);
        }

        return response()->json(['status' => 200], 200);
    }
}
