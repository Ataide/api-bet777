<?php

namespace App\Http\Controllers;

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
        
        \Log::debug(print_r($action, 1));

        \Log::debug(print_r($request->all(), 1));

        switch($action) {
            case "state_FINISHED":
                $payment = Payment::find_by_id($_POST["data"]["id"]);
                \Log::debug(print_r($payment, 1));
              
                // no break
            case "payment.created":
                echo "payment.created";
                
                $payment = $client->get($request->input('data_id'));
               
                \Log::debug(print_r($payment, 1));

                break;
        }

        return response()->json(['status' => 200], 200);
    }
}
