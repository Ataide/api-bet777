<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Redirect;

class AdministrationController extends Controller
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
            
        return Inertia::render('Administration', ['users' => $with_totals]);
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
    public function update(\Illuminate\Http\Request $request, string $id)
    {
        $validated = $request->validate([
            'id'       => ['required', 'integer', 'exists:users,id'],
            'name'     => ['required', 'string', 'max:255'],
            'birthday' => ['required', 'string', 'max:255'],
            'cpf'      => ['required', 'string', 'max:255'],
            'phone'    => ['required', 'string', 'max:255'],
            'pix_key'  => ['required', 'string', 'max:255'],
            'email'    => ['required', 'string'],
        ]);
        
        $user = User::find($id);

        $user->update([
            'name'  => $validated['name'],
            'email' => $validated['email'],
        ]);
        
        $user->profile()->update([
            'cpf'      => $validated['cpf'],
            'phone'    => $validated['phone'],
            'birthday' => $validated['birthday'],
            'pix_key'  => $validated['pix_key'],
        ]);
        
        return Redirect::back()->with('success', 'User created.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
