<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\UserController;
use App\Models\Bet;
use App\Models\Paper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/register', [AuthController::class, 'register'])->name('user.register');
Route::post('/login', [AuthController::class, 'login'])->name('user.login');

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    // $paper = Paper::with('bets')->where('user_id', '=', $request->user()->id)->get();
    // $bets = Bet::with('game')->where('user_id', '=', $request->user()->id)->get();

    return $request->user()->load('sports');
});
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('user.logout');

    //Rotas dps evetnos.
    Route::get('/eventos', [EventController::class, 'api_index'])->name('events.list');
    Route::post('/favorite-sport', [UserController::class, 'favoriteSport'])->name('user.favorite');
});
