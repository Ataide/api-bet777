<?php

namespace App\Http\Controllers;

use App\Http\Requests\StorePaperRequest;
use App\Http\Requests\UpdatePaperRequest;
use App\Models\Bet;
use App\Models\Paper;
use Auth;
use Illuminate\Database\Eloquent\Builder;
use Request;

class PaperController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = Auth::user();

        $papers = Paper::query()
            ->when(Request::input('status'), function (Builder $query, $status) {
                $query->where('status', $status);
            })
            ->with('bets', 'bets.game')
            ->where('user_id', $user->id)
            ->orderBy('created_at', 'DESC')
            ->get();

        return $papers;
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
    public function store(StorePaperRequest $request)
    {
        $amount = $request->input('amount');
        
        $haveFunds = $request->user()->checkIfHaveFunds($amount);
        
        if (!$haveFunds) {
            return response()->json(['message' => "Você não possui fundos."], 422);
        }
        
        $request->user()->takeOutPaperAmountFromWallet($amount);
        
        $request->user()->updateWalletAmountInBets($amount);
    
        $new_paper = new Paper();

        $new_paper->fill($request->validated());

        $bets = $request->input('bets');

        $new_paper->save();

        foreach ($bets as $key => $bet) {
            $new_bet = new Bet(['user_id' => $request->user()->id, 'quantity' => 1, 'profit' => 0]);
            
            $new_bet->fill($bet);
            $new_bet->save();
            
            $new_paper->bets()->attach($new_bet);
        }

        return response()->json($bets);
    }

    /**
     * Display the specified resource.
     */
    public function show(Paper $paper)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Paper $paper)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePaperRequest $request, Paper $paper)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Paper $paper)
    {
        //
    }
}
