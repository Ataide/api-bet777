<?php

use App\Http\Controllers\AdministrationController;
use App\Http\Controllers\BetController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\GameController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\WithdrawController;
use ErlandMuchasaj\LaravelFileUploader\FileUploader;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Storage;

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
    Route::get('/redirect-to-frontend', function () {
        return redirect()->intended(env('FRONTEND_URL'));
    })->name('redirect-to-frontend');
    Route::group(['middleware' => ['auth']], function () {
        /**
        * Home Routes
        */
        Route::get('/', [DashboardController::class, 'index'])->middleware(['role:view dashboard|superadmin'])->name('dashboard');
        Route::get('/dashboard', [DashboardController::class, 'index'])->middleware(['role:view dashboard|superadmin'])->name('dashboard');
       
        /**
         * Rotas de usuarios. Algumas rotas são boqueadas por middlewares.
         */
        Route::get('/usuarios', [UserController::class, 'index'])->name('users');
        Route::post('/usuarios/fromModal', [UserController::class, 'storeFromModal'])->middleware(['role:edit users|superadmin'])->name('users.storeFromModal');
        Route::delete('/usuarios/{user}', [UserController::class, 'destroy'])->middleware(['role:delete users|superadmin'])->name('users.destroy');
        
        /**
         * Administraçao Routes
        */
        Route::get('/administracao', [AdministrationController::class, 'index'])->name('administration');
        Route::put('/administracao/{id}', [AdministrationController::class, 'update'])->middleware(['role:edit admins|superadmin'])->name('administration.update');
        Route::put('/administracao/aprove/{id}', [AdministrationController::class, 'aproveAdminUser'])->middleware(['role:aprove admins|superadmin'])->name('administration.aprove');
        Route::delete('/administracao/{user}', [AdministrationController::class, 'destroy'])->middleware(['role:delete admins|superadmin'])->name('administration.destroy');
        Route::post('/administracao/permission/{user}', [AdministrationController::class, 'addPermission'])->name('administration.permission.add');

        /**
         * Rotas de Transações.
        */
        Route::get('/transacoes', [TransactionController::class, 'index'])->name('transactions');
        Route::get('/transacoes/{id}', [TransactionController::class, 'show'])->name('transactions.details');
    
        /**
         * Rotas de Eventos.
        */
        Route::get('/eventos', [EventController::class, 'index'])->name('events.index');
        Route::get('/eventos/{id}', [EventController::class, 'show'])->name('events.show');
        Route::post('/eventos/fromModal', [EventController::class, 'storeFromModal'])->name('events.storeFromModal');
        Route::delete('/eventos/{event}', [EventController::class, 'destroy'])->name('events.destroy');
       
        /**
         * Rotas de Jogos.
         */
        Route::post('/games/fromModal', [GameController::class, 'storeFromModal'])->name('games.storeFromModal');
        Route::post('/games/finalizate/{game}', [GameController::class, 'finalizate'])->name('games.finalizate');
        Route::post('/games/hot/{game}', [GameController::class, 'hot'])->name('games.hot');
        Route::delete('/games/{game}', [GameController::class, 'destroy'])->name('games.destroy');

        /**
         * Rotas de Apostas.
        */
        Route::get('/apostas', [BetController::class, 'index'])->middleware(['role:view bets|superadmin'])->name('bets');
        
        /**
         * Rotas de solicitação de apostas.
        */
        Route::get('/saques', [WithdrawController::class, 'index'])->middleware(['role:view bets|superadmin'])->name('withdraws');
        Route::put('/saques/{withdraw}', [WithdrawController::class, 'update'])->middleware(['role:view bets|superadmin'])->name('withdraws.update');

        /**
         * Rotas de Profile.
        */
        Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
        Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
        Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

        Route::post('/files', function (Illuminate\Http\Request $request) {
            $max_size = (int)ini_get('upload_max_filesize') * 1000;
        
            $extensions = implode(',', FileUploader::images());
        
            $request->validate([
                'file' => [
                    'required',
                    'file',
                    'image',
                    'mimes:' . $extensions,
                    'max:' . $max_size,
                ]
            ]);

            $path = "image_" . time() . '.' . $request->file->extension();
            Storage::disk('public')->put($path, $request->file->get());
        
            return redirect()
                    ->back()
                    ->with('message', 'Imagem carregada com sucesso.')
                    ->with('file', Storage::url($path));
        })->name('files.store');
    });
});

require __DIR__ . '/auth.php';
