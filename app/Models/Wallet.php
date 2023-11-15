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
}
