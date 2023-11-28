<?php

namespace App\Models;

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

    public function withdraw()
    {
        return $this->hasMany(Withdraw::class);
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
        if ($this->type === 'deposit') {
            $this->update(['status' => 'aproved']);
            $this->user->addToWallet($this->deposit);
        }

        if ($this->type === 'withdraw') {
            $this->update(['status' => 'aproved']);
            $this->user->wallet->processWithdraw($this->withdraw);
        }
    }

    /**
     * [Cancela a transação]
     *
     * @return void
     *
     */
    public function cancel(): void
    {
        if ($this->type === 'deposit') {
            $this->update(['status' => 'canceled']);
        }

        if ($this->type === 'withdraw') {
            $this->update(['status' => 'canceled']);
        }
    }

    public function requestMercadoPagoPix()
    {
        try {
            //code...
            MercadoPagoConfig::setAccessToken(env('MP_ACCESS_TOKEN'));
    
            $client          = new PaymentClient();
            $request_options = new RequestOptions();
            // $request_options->setCustomHeaders(["X-Idempotency-Key:" . uniqid()]);
    
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
        } catch (\MercadoPago\Exceptions\MPApiException $e) {
            // echo Response::json(['error' => $e->getApiResponse()]);
        }
    }
}
