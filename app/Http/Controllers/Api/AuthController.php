<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
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
        $request->validate([
            'name'     => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string', 'email', 'max:255', 'unique:' . User::class],
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
        ]);

        $user = User::create([
            'name'     => $request->name,
            'email'    => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // $this->initialize($user);

        Auth::login($user);
        
        $token = $user->createToken('api-takker-token');

        // $user->notify((new Register));

        return response()->json([
            'user'  => $user,
            'token' => $token->plainTextToken,
        ], 201);
    }

    public function logout(Request $request)
    {
        Auth::guard('web')->logout();

        $user = $request->user();

        $user->tokens()->delete();

        return response()->noContent();
    }
}
