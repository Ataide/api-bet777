<?php

namespace App\Http\Controllers;

use App\Models\User;
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

        $users = User::query()
            ->when(Request::input('search'), function (Builder $query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->OrWhere('email', 'like', '%' . $search . '%');
            })
            ->when(Request::input('status'), function (Builder $query, $status) {
                $query->whereRelation('profile', 'account_status', $status);
            })
            ->with('profile')->paginate($per_page);

        return Inertia::render('Users', ['users' => $users]);
    }

    public function storeFromModal(Request $request)
    {
        Request::validate([
            'name' => ['required', 'max:100'],
            
        ]);

        return Redirect::back()->with('success', 'User created.');
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
