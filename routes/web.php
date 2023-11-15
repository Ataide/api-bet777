<?php

use App\Http\Controllers\AdministrationController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::group(['namespace' => 'App\Http\Controllers'], function () {
    /**
    * Home Routes
    */
    Route::get('/', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');
    Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['auth'])->name('dashboard');

    Route::group(['middleware' => ['auth', 'permission']], function () {
        /**
         * Usuarios Routes
         */
        Route::get('/usuarios', [UserController::class, 'index'])->name('users');
        Route::post('/usuarios/fromModal', [UserController::class, 'storeFromModal'])->name('users.storeFromModal');
        /**
         * Administraçao Routes
        */
        Route::get('/administracao', [AdministrationController::class, 'index'])->name('administration');
        Route::put('/administracao/{id}', [AdministrationController::class, 'update'])->name('administration.update');
    
        Route::get('/transacoes', [TransactionController::class, 'index'])->name('transactions');
        Route::get('/transacoes/{id}', [TransactionController::class, 'show'])->name('transactions.details');
    
        Route::get('/eventos', [EventController::class, 'index'])->name('events.index');
        Route::get('/eventos/{id}', [EventController::class, 'show'])->name('events.show');
        Route::post('/eventos/fromModal', [EventController::class, 'storeFromModal'])->name('events.storeFromModal');
        Route::delete('/eventos/{event}', [EventController::class, 'destroy'])->name('events.destroy');
       
        Route::post('/games/fromModal', [GameController::class, 'storeFromModal'])->name('games.storeFromModal');
    
        Route::get('/apostas', function () {
            return Inertia::render('Bets');
        })->name('bets');
        
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Route::resource('roles', RolesController::class);
        // Route::resource('permissions', PermissionsController::class);
    });
});

require __DIR__ . '/auth.php';
