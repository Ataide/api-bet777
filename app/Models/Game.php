<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Game extends Model
{
    use HasFactory, SoftDeletes;

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
        'home_image',
        'away_name',
        'away_image',
        'home_rate',
        'draw_rate',
        'away_rate',
        'home_score',
        'away_score',
        'time_close_bet',
        'time_start',
        'time_end',
        'done',
        'hot',
        'result',
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

    protected $cast = [
        'hot' => 'boolean',
    ];

    public function event()
    {
        return $this->belongsTo(Event::class);
    }

    public function bet()
    {
        return $this->hasMany(Bet::class);
    }

    public function finalizate($home_score = null, $away_score = null)
    {
        $result = $home_score === $away_score ? Game::DRAW : ($home_score > $away_score ? Game::HOME_WIN : Game::AWAY_WIN);
       
        $this->update([
            'home_score' => $home_score,
            'away_score' => $away_score,
            'done'       => Game::DONE,
            'result'     => $result,
            'time_end'   => Carbon::now()
        ]);

        $this->bet->map(function ($b) {
            $isVictory = $b->game->result === $b->bet_choice;
            
            if (!$isVictory) {
                $b->update([
                    'game_result' => Bet::LOSE,
                ]);

                $b->papers->map(function ($paper) {
                    $paper->closePaperWithLose();
                });
            } else {
                $b->update([
                    'game_result' => Bet::WIN,
                ]);

                $b->papers->map(function ($paper) {
                    $paper->updatePaperWithBetWin();
                });
            }
        });
    }
    public function gameIsDone()
    {
        return $this->done;
    }

    public function switchToHotGame()
    {
        $currentValue = $this->hot;
        
        return $this->update(['hot' => !$currentValue]);
    }
}
