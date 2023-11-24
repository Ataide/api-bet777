<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\PagSeguroController;
use App\Http\Controllers\PaperController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WalletController;
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

Route::get('/eventos', [EventController::class, 'api_index'])->name('events.list');

Route::get('/events/hot', [EventController::class, 'apiHotEvents'])->name('events.list.hot');

//Rota de notificação do webhook do pagseguro.
Route::post('/pagseguro/notification', [PagSeguroController::class, 'notification'])->name('pagseguro.notification');

Route::middleware('auth:sanctum')->get('/me', function (Request $request) {
    // $paper = Paper::with('bets')->where('user_id', '=', $request->user()->id)->get();
    // $bets = Bet::with('game')->where('user_id', '=', $request->user()->id)->get();
    $user = Auth::user();

    return  $user->load(['favorites', 'wallet', 'profile']);
});

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/logout', [AuthController::class, 'logout'])->name('user.logout');
    Route::post('/update-profile', [AuthController::class, 'updateProfile'])->name('user.updateProfile');
    Route::get('/transactions', [UserController::class, 'transactions'])->name('user.transactions');
    Route::apiResource('/paper', PaperController::class);
    Route::apiResource('/wallet', WalletController::class);

    Route::get('/events-favorites', [EventController::class, 'favorites'])->name('events.favorites');

    //Rotas dps evetnos.
    Route::post('/favorite-sport', [UserController::class, 'favoriteSport'])->name('user.favorite');
});
