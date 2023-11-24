<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use MercadoPago\Client\Common\RequestOptions;
use MercadoPago\Client\Payment\PaymentClient;
use MercadoPago\MercadoPagoConfig;

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
    public function aprove(): void
    {
        $this->update(['status' => 'aproved']);

        $this->user->addToWallet($this->deposit);
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
                env("PAGSEGURO_WEBHOOK_URL", "localhost"),
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

    public function requestMercadoPagoPix(): array
    {
        MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));

        $client          = new PaymentClient();
        $request_options = new RequestOptions();
        $request_options->setCustomHeaders(["X-Idempotency-Key:" . uniqid()]);

        $payment = $client->create([
            "transaction_amount" => (float)$this->deposit,
            "description"        => "Pagamento de deposito.",
            "payment_method_id"  => "pix",
            "payer"              => [
                "email"          => $this->user->email,
                "first_name"     => $this->user->name,
                "identification" => [
                    "type"   => 'cpf',
                    "number" => $this->user->profile->cpf
                ]
            ]
        ], $request_options);

        $this->update(['payment_id' => $payment->id]);

        $qr_code_link = $payment->point_of_interaction->transaction_data->qr_code_base64;
        $text_link    = $payment->point_of_interaction->transaction_data->qr_code;
        $value        = $payment->transaction_amount;
        $payment_id   = $payment->id;

        return [
            'text'       => $text_link,
            'image'      => "data:image/png;base64," . $qr_code_link,
            'amount'     => $value,
            'payment_id' => $payment_id
        ];
    }
}
