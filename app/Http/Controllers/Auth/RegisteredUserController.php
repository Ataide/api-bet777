<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Providers\RouteServiceProvider;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        try {
            //code...
            $request->validate([
                'user_name'  => 'required|string|max:255',
                'email'      => 'required|string|email|max:255|unique:' . User::class,
                'password'   => ['required', 'confirmed', Rules\Password::defaults()],
                'first_name' => ['required', 'string'],
                'birthday'   => ['required', 'string'],
                'last_name'  => ['required', 'string'],
                'phone'      => ['required', 'string'],
            ]);

            $user = User::create([
                'name'     => $request->user_name,
                'email'    => $request->email,
                'status'   => User::PENDING,
                'type'     => 'admin',
                'password' => Hash::make($request->password),
            ]);

            $user->profile()->create([
                'phone' => $request->phone,
            ]);
    
            event(new Registered($user));
            
            return redirect(RouteServiceProvider::LOGIN);
        } catch (\Throwable $th) {
            $user->delete();

            return redirect(RouteServiceProvider::LOGIN);
        }
       
        // Auth::login($user);
    }
}
