<?php

use App\Http\Controllers\AdministrationController;
use App\Http\Controllers\BetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;

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
    
    Route::group(['middleware' => ['auth']], function () {
        Route::get('/', [DashboardController::class, 'index'])->middleware(['role:view dashboard|superadmin'])->name('dashboard');
        Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['role:view dashboard|superadmin'])->name('dashboard');
        /**
         * Usuarios Routes
         */
        Route::get('/usuarios', [UserController::class, 'index'])->name('users');
        Route::post('/usuarios/fromModal', [UserController::class, 'storeFromModal'])->name('users.storeFromModal');
        Route::delete('/usuarios/{user}', [UserController::class, 'destroy'])->name('users.destroy');

        /**
         * Administraçao Routes
        */
        Route::get('/administracao', [AdministrationController::class, 'index'])->name('administration');
        Route::put('/administracao/{id}', [AdministrationController::class, 'update'])->name('administration.update');
        Route::put('/administracao/aprove/{id}', [AdministrationController::class, 'aproveAdminUser'])->name('administration.aprove');
        Route::delete('/administracao/{user}', [AdministrationController::class, 'destroy'])->name('administration.destroy');
        Route::post('/administracao/permission/{user}', [AdministrationController::class, 'addPermission'])->name('administration.permission.add');

        Route::get('/transacoes', [TransactionController::class, 'index'])->name('transactions');
        Route::get('/transacoes/{id}', [TransactionController::class, 'show'])->name('transactions.details');
    
        Route::get('/eventos', [EventController::class, 'index'])->name('events.index');
        Route::get('/eventos/{id}', [EventController::class, 'show'])->name('events.show');
        Route::post('/eventos/fromModal', [EventController::class, 'storeFromModal'])->name('events.storeFromModal');
        Route::delete('/eventos/{event}', [EventController::class, 'destroy'])->name('events.destroy');
       
        Route::post('/games/fromModal', [GameController::class, 'storeFromModal'])->name('games.storeFromModal');
        Route::post('/games/finalizate/{game}', [GameController::class, 'finalizate'])->name('games.finalizate');
        Route::post('/games/hot/{game}', [GameController::class, 'hot'])->name('games.hot');
        
        Route::delete('/games/{game}', [GameController::class, 'destroy'])->name('games.destroy');

        Route::get('/apostas', [BetController::class, 'index'])->middleware(['role:view bets|superadmin'])->name('bets');
        
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        // Route::resource('roles', RolesController::class);
        // Route::resource('permissions', PermissionsController::class);
    });
});

require __DIR__ . '/auth.php';
