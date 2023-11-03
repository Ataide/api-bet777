<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = [
        'event_id',
        'home',
        'home_odd',
        'home_icon',
        'visitor',
        'visitor_odd',
        'visitor_icon',
        'x_odd',
        'start_date'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'created_at',
        'updated_at',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }
}
