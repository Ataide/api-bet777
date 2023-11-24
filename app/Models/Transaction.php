<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    const APROVED = 'aproved';

    const PENDING = 'pending';

    const CANCELED = 'canceled';

    protected $fillable = [
        'user_id',
        'type',
        'status',
        'payment_id',
        'deposit',
        'withdraw',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * [Função para aprovar a transação]
     *
     * @param string $payment_id
     *
     * @return void
     *
     */
    public function aprove(string $payment_id): void
    {
        $this->update(['status' => 'aproved', 'payment_id' => $payment_id]);
    }

    /**
     * [Cancela a transação]
     *
     * @return void
     *
     */
    public function cancel(): void
    {
        $this->update(['status' => 'canceled']);
    }

    public function requestPixQrcodeAsPng(): array
    {
        $client = new \GuzzleHttp\Client();

        $data = [
            "reference_id" => $this->id,
            "customer"     => [
                "name"   => $this->user->name,
                "email"  => $this->user->email,
                "tax_id" => $this->user->profile->cpf,
                // "phones" => [
                //     [
                //         "country" => "55",
                //         "area"    => "11",
                //         "number"  => "999999999",
                //         "type"    => "MOBILE"
                //     ]
                // ]
            ],
           
            "items" => [
                [
                    "name"        => "Depósito na conta",
                    "quantity"    => 1,
                    "unit_amount" => $this->deposit
                ]
            ],
            "qr_codes" => [
                [
                    "amount" => [
                        "value" => $this->deposit
                    ],
                    "expiration_date" => Carbon::now()->addHours(4),
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
        $qr_code_link = json_decode($response->getBody())->qr_codes[0]->links[0]->href;
        $text_link    = json_decode($response->getBody())->qr_codes[0]->text;
        $value        = json_decode($response->getBody())->qr_codes[0]->amount->value;

        return ['text' => $text_link, 'image' => $qr_code_link, 'amount' => $value];
    }
}
