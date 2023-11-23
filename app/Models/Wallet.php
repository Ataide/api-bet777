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
        $rate             = Config::get("services.gateway.draw_rate");
        $value_to_gateway = $amount_to_draw * $rate;
        $amount           = $amount_to_draw + $value_to_gateway;
        $this->user->takeOutWallet($amount);
    }

    public function updateWalletAmount($amount)
    {
        $rate          = Config::get("services.gateway.draw_rate");
        $currentAmount = $this->amount;
        $this->update([
            'amount'     => $currentAmount + $amount,
            'draw_total' => ($currentAmount + $amount) * $rate
        ]);
    }
}
