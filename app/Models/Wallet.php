<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

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

    public function updateWalletAmount($amount)
    {
        $currentAmount = $this->amount;
        $this->update(['amount' => $currentAmount + $amount]);
    }
}
