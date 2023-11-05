<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Game extends Model
{
    use HasFactory;

    const DONE     = 1;
    const NOT_DONE = 0;

    const HOME = 1;
    const DRAW = 0;
    const AWAY = -1;

    const HOME_WIN = 1;
    const DRAW_WIN = 0;
    const AWAY_WIN = -1;

    /**
    * The attributes that are mass assignable.
    *
    * @var array<int, string>
    */
    protected $fillable = [
        'event_id',
        'home_name',
        'away_name',
        'home_rate',
        'draw_rate',
        'away_rate',
        'home_score',
        'away_score',
        'time_close_bet',
        'time_start',
        'time_end',
        'done',
        'result',
        //
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
        // 'created_at',
        'updated_at',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function bet()
    {
        return $this->hasMany(Bet::class);
    }
}
