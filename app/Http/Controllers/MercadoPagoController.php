<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class MercadoPagoController extends Controller
{
    public function notification(Request $request)
    {
        \Log::debug(print_r($request->getContent(), 1));
    }
}
