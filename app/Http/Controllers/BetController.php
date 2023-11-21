<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBetRequest;
use App\Http\Requests\UpdateBetRequest;
use App\Models\Bet;
use App\Models\Paper;
use Illuminate\Database\Eloquent\Builder;
use Inertia\Inertia;
use Request;

class BetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $futebol = Bet::when(Request::input('id'), function (Builder $query, $id) {
            $query->where('user_id', $id);
        })->whereRelation('game.event.sport', 'id', '=', 1)->count();
        $volei = Bet::when(Request::input('id'), function (Builder $query, $id) {
            $query->where('user_id', $id);
        })->whereRelation('game.event.sport', 'id', '=', 2)->count();
        $basquete = Bet::when(Request::input('id'), function (Builder $query, $id) {
            $query->where('user_id', $id);
        })->whereRelation('game.event.sport', 'id', '=', 3)->count();
        $baisebol = Bet::when(Request::input('id'), function (Builder $query, $id) {
            $query->where('user_id', $id);
        })->whereRelation('game.event.sport', 'id', '=', 4)->count();
        $boxe = Bet::when(Request::input('id'), function (Builder $query, $id) {
            $query->where('user_id', $id);
        })->whereRelation('game.event.sport', 'id', '=', 5)->count();
        $futAmericano = Bet::when(Request::input('id'), function (Builder $query, $id) {
            $query->where('user_id', $id);
        })->whereRelation('game.event.sport', 'id', '=', 6)->count();
        $tenis = Bet::when(Request::input('id'), function (Builder $query, $id) {
            $query->where('user_id', $id);
        })->whereRelation('game.event.sport', 'id', '=', 7)->count();
        $outros = Bet::when(Request::input('id'), function (Builder $query, $id) {
            $query->where('user_id', $id);
        })->whereRelation('game.event.sport', 'id', '=', 8)->count();

        $resume = [$futebol, $volei, $basquete, $tenis, $futAmericano, $baisebol, $boxe, $outros];
        
        $bets = Paper::when(Request::input('search'), function (Builder $query, $search) {
            $query->whereRelation('user', 'name', 'like', '%' . $search . '%');
        })
            ->selectRaw("(select name from users u where u.id = user_id) as name")
            ->selectRaw("SUM(amount) as amount")
            ->selectRaw("count(user_id) as total_bets")
            ->selectRaw("user_id")
            ->groupBy('user_id')
            ->orderBy('amount', 'desc')
            ->paginate(5);

        $userPapers = Paper::where('user_id', Request::input('id'))->with('bets.game')->paginate(5);

        return Inertia::render(
            'Bets',
            [
                'bets'       => $bets,
                'userPapers' => $userPapers,
                'data_donut' => $resume
            ]
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreBetRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Bet $bet)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Bet $bet)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateBetRequest $request, Bet $bet)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Bet $bet)
    {
        //
    }
}
