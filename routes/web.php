<?php

use App\Http\Controllers\AdministrationController;
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

Route::get('/', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('/usuarios', [UserController::class, 'index'])->name('users');
    Route::post('/usuarios/fromModal', [UserController::class, 'storeFromModal'])->name('users.storeFromModal');

    Route::get('/administracao', [AdministrationController::class, 'index'])->name('administration');
    #TODO: Create a route for modal actions.

    Route::get('/transacoes', [TransactionController::class, 'index'])->name('transactions');

    Route::get('/eventos', function () {
        return Inertia::render('Events');
    })->name('events');

    Route::get('/apostas', function () {
        return Inertia::render('Bets');
    })->name('bets');
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
