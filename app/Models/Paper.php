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
        'rate',
        'profit'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function bets()
    {
        return $this->belongsToMany(Bet::class);
    }
}
