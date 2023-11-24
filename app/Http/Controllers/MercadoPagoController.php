<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use MercadoPago\MercadoPagoConfig;
use MercadoPago\Payment;

class MercadoPagoController extends Controller
{
    public function notification(Request $request)
    {
        MercadoPagoConfig::setAccessToken(env("MP_ACCESS_TOKEN"));

        $action = $request->input('action');

        switch($action) {
            case "state_FINISHED":
                \Log::debug(print_r($request->all(), 1));
                $payment = Payment::find_by_id($_POST["data"]["id"]);
                \Log::debug(print_r($payment, 1));

                break;
           
            case "point_integration_wh":
                // $_POST contém as informações relacionadas à notificação.
                break;
        }
    }
}
