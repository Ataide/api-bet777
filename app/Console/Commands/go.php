<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

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
        $client = new \GuzzleHttp\Client();

        $data = [
            "reference_id" => "ex-00001",
            "customer"     => [
                "name"   => "Jose da Silva",
                "email"  => "email@test.com",
                "tax_id" => "12345678909",
                "phones" => [
                    [
                        "country" => "55",
                        "area"    => "11",
                        "number"  => "999999999",
                        "type"    => "MOBILE"
                    ]
                ]
            ],
            "items" => [
                [
                    "name"        => "nome do item",
                    "quantity"    => 1,
                    "unit_amount" => 500
                ]
            ],
            "qr_codes" => [
                [
                    "amount" => [
                        "value" => 500
                    ],
                    "expiration_date" => "2023-11-29T20:15:59-03:00",
                ]
            ],
            "shipping" => [
                "address" => [
                    "street"      => "Avenida Brigadeiro Faria Lima",
                    "number"      => "1384",
                    "complement"  => "apto 12",
                    "locality"    => "Pinheiros",
                    "city"        => "São Paulo",
                    "region_code" => "SP",
                    "country"     => "BRA",
                    "postal_code" => "01452002"
                ]
            ],
            "notification_urls" => [
                "https://meusite.com/notificacoes"
            ]
        ];

        $response = $client->request('POST', 'https://sandbox.api.pagseguro.com/orders', [
            'body'    => json_encode($data),
            'headers' => [
                'Authorization' => 'Bearer 72E9635253A44FB9AF5A6BBBA5CC704E',
                'accept'        => 'application/json',
                'content-type'  => 'application/json',
            ],
        ]);

        dd(json_decode($response->getBody())->qr_codes[0]->links[0]->href);
    }
}
