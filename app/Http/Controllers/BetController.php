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
                'userPapers' => $userPapers
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
