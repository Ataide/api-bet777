<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

class go extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:go';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));

        $client          = new PaymentClient();
        $request_options = new RequestOptions();
        $request_options->setCustomHeaders(["X-Idempotency-Key: 123"]);

        $payment = $client->create([
            "transaction_amount" => 100,
            "description"        => "description",
            "payment_method_id"  => "pix",
            "payer"              => [
                "email"          => "user@test.com",
                "first_name"     => 'Ataide',
                "identification" => [
                    "type"   => 'cpf',
                    "number" => '22813495867'
                ]
            ]
        ], $request_options);

        $qr_code_link = $payment->point_of_interaction->transaction_data->qr_code_base64;
        $text_link    = $payment->point_of_interaction->transaction_data->qr_code;
        $value        = $payment->transaction_amount;
    }
}
