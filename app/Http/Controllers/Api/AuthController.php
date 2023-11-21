<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\Profile;
use App\Models\User;
use App\Models\Wallet;
use Auth;
use Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules;

class AuthController extends Controller
{
    public function login(LoginRequest $request): JsonResponse
    {
        $request->authenticate();

        $user = $request->user();

        $user->tokens()->delete();

        $token = $user->createToken('api-bet-token');

        return response()->json([
            'user'  => $user,
            'token' => $token->plainTextToken,
        ]);
    }

    public function register(Request $request): JsonResponse
    {
        try {
            //code...
            $request->validate([
                'first_name' => ['required', 'string', 'max:255'],
                'last_name'  => ['required', 'string', 'max:255'],
                'cpf'        => ['required', 'string', 'max:255'],
                'phone'      => ['required', 'string', 'max:255'],
                'birthday'   => ['required', 'string', 'max:255'],
                'pix_key'    => ['required', 'string', 'max:255'],
                'email'      => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
                'password'   => ['required', 'confirmed', Rules\Password::defaults()],
            ]);

            $user = User::create([
                'name'     => $request->first_name . ' ' . $request->last_name,
                'email'    => $request->email,
                'password' => Hash::make($request->password),
            ]);

            $profile = Profile::create([
                'user_id'        => $user->id,
                'cpf'            => $request->cpf,
                'phone'          => $request->phone,
                'pix_key'        => $request->pix_key,
                'birthday'       => $request->birthday,
                'account_status' => "Ativo"
            ]);

            $wallet = Wallet::create([
                'user_id'    => $user->id,
                'amount'     => 0,
                'bet_total'  => 0 ,
                'draw_total' => 0
            ]);

            $token = $user->createToken('api-takker-token');
            
            Auth::login($user);

            return response()->json([
                'user'  => $user,
                'token' => $token->plainTextToken,
            ], 201);
        } catch (\Throwable $th) {
            $user->delete();

            return response()->json([
                'message' => $th->getMessage(),
            ], 500);
        }
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $user = $request->user();

        $user->tokens()->delete();

        return response()->noContent();
    }

    public function updateProfile(Request $request)
    {
        $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'cpf'      => ['required', 'string', 'max:255'],
            'birthday' => ['required', 'string', 'max:255'],
            'phone'    => ['required', 'string', 'max:255'],
            'pix_key'  => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string'],
        ]);
        
        $user = Auth::user();

        $user->update([
            'name'  => $request->name,
            'email' => $request->email,
        ]);
        
        $user->profile()->update([
            'cpf'     => $request->cpf,
            'phone'   => $request->phone,
            'pix_key' => $request->pix_key,
            'birthday' => $request->birthday,
        ]);

        return response()->json([
            'message' => 'Atualizado com sucesso',
        ], 200);
    }
}
