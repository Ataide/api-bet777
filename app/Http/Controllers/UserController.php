<?php

namespace App\Http\Controllers;

use App\Models\User;
use Auth;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $per_page = Request::input('per_page') ?? 5;

        $actives = User::whereRelation('profile', 'account_status', 'Ativo')->count();

        $recents = User::whereRelation('profile', 'account_status', 'Novo')->count();

        $inactives = User::whereRelation('profile', 'account_status', 'Inativo')->count();

        $total = User::count();

        $users = User::query()
            ->when(Request::input('search'), function (Builder $query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->OrWhere('email', 'like', '%' . $search . '%');
            })
            ->when(Request::input('status'), function (Builder $query, $status) {
                $query->whereRelation('profile', 'account_status', $status);
            })
            ->with('profile')
            ->paginate($per_page);

        $totals_groups = collect(
            ['total_actives' => $actives, 'total_recents' => $recents, 'total_inactives' => $inactives, 'total_users' => $total]
        );
        
        $with_totals = $totals_groups->merge($users);
            
        return Inertia::render('Users', ['users' => $with_totals]);
    }

    public function storeFromModal(Request $request)
    {
        Request::validate([
            'name' => ['required', 'max:100'],
            
        ]);

        return Redirect::back()->with('success', 'User created.');
    }

    public function favoriteSport(Request $request)
    {
        $sport_id = Request::validate([
            'sport_id' => ['required', 'exists:sports,id'],
        ]);

        $user = Auth::user();

        $sport_exists = $user->sports()->where('sport_id', $sport_id)->count();
        
        if ($sport_exists > 0) {
            $user->sports()->detach([$sport_id]);

            return response()->json(['message' => 'Sport removed to User favorite sports']);
        }

        $user->sports()->attach([$sport_id]);

        return response()->json(['message' => 'Sport added to User favorite sports']);
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
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
