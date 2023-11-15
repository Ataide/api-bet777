<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'sport',
        'sport_id',
        'end_date',
    ];

    public function games()
    {
        return $this->hasMany(Game::class);
    }

    public function sport()
    {
        return $this->belongsTo(Sport::class);
    }
}
