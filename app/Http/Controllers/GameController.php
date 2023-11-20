<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreGameRequest;
use App\Http\Requests\UpdateGameFinalizateRequest;
use App\Http\Requests\UpdateGameRequest;
use App\Models\Game;
use Illuminate\Http\Request;
use Redirect;

class GameController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    public function getLastGames()
    {
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
    public function store(StoreGameRequest $request)
    {
        //
    }

    public function storeFromModal(StoreGameRequest $request)
    {
        $request->validated();

        if ($request->id) {
            $game = Game::find($request->id);
            $game->fill($request->validated());
            $game->save();

            return Redirect::back()->with('success', 'Usuário atualizado com sucesso.');
        }

        Game::create($request->validated());

        return Redirect::back()->with('success', 'Usuário criado com sucesso.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Game $game)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Game $game)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateGameRequest $request, Game $game)
    {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Game $game)
    {
        $game->delete();

        return Redirect::back()->with(['message' => 'Operação realizada com sucesso.']);
    }

    public function finalizate(UpdateGameFinalizateRequest $request, Game $game)
    {
        if ($game->gameIsDone()) {
            return Redirect::back()->withErrors(['message' => 'Operação não foi realizada. O Jogo já foi finalizado.']);
        }

        $result = $request->validated();

        $game->finalizate(...$result);

        return Redirect::back()->with(['message', 'Jogo Finalizado com sucesso.']);
    }
    public function hot(Request $request, Game $game)
    {
        $game->switchToHotGame();

        return Redirect::back()->with(['message' => 'Operação não foi realizada. O Jogo já foi adicionado aos jogos em destaques.']);
    }
}
