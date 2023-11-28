<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Config;

class Wallet extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'amount',
        'bet_total' ,
        'draw_total'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function updateAmountInBets(\App\Models\Paper  $paper)
    {
        $amountInPaper = $paper->amount;
        $amountInBets  = $this->bet_total;

        $this->update(['bet_total' => $amountInBets - $amountInPaper]);
    }

    public function processWithdraw($amount_to_draw)
    {
        $this->user->takeOutWallet($amount_to_draw);
    }

    public function updateWalletAmount($amount_to_add)
    {
        $rate                  = Config::get("services.gateway.draw_rate");
        $updated_wallet_amount = $this->amount + $amount_to_add;
        $value_to_gateway      = $updated_wallet_amount * $rate;
        $updated_draw_total    = $updated_wallet_amount - $value_to_gateway;

        $this->update([
            'amount'     => $updated_wallet_amount,
            'draw_total' => $updated_draw_total
        ]);
    }
}
