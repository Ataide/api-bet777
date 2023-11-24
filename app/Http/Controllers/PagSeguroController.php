<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PagSeguroController extends Controller
{
    public function notification(Request $request)
    {
        \Log::debug(print_r($request->getContent(), 1));
    }

    public function pix()
    {
    }
}
