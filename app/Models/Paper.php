<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Paper extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'quantity',
        'amount',
        'rate',
        'profit',
        'status',
        'result'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bets()
    {
        return $this->belongsToMany(Bet::class);
    }

    public function closePaperWithLose()
    {
        $this->update(['status' => 1, 'result' => -1]);

        $this->user->wallet->updateAmountInBets($this);
    }
    public function updatePaperWithBetWin()
    {
        $allBetsHasResults = ($this->bets()->where('game_result', 1)->count() === $this->bets()->count());

        if ($allBetsHasResults) {
            $this->update(['status' => 1, 'result' => 1]);
            $this->user->wallet->updateAmountInBets($this);
            $this->user->wallet->updateWalletAmount($this->profit);
        }
    }
}
