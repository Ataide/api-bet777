<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bet extends Model
{
    use HasFactory;

    const HOME = 1;
    const DRAW = 0;
    const AWAY = -1;

    protected $fillable = [
        'user_id',
        'game_id',
        'paper_id',
        'bet_choice',
        'quantity',
        'rate',
        'profit'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function game()
    {
        return $this->belongsTo(Game::class);
    }
    public function papers()
    {
        return $this->belongsToMany(Paper::class);
    }
}
