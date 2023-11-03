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
        'end_date',
    ];

    public function games()
    {
        return $this->hasMany(Game::class);
    }
}
