<?php

namespace App\Http\Controllers;

class PagSeguroController extends Controller
{
    public static function notification($information)
    {
        \Log::debug(print_r($information->getStatus()->getCode(), 1));
    }

    public function pix()
    {
    }
}
