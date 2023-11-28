<?php

namespace App\Http\Controllers;

use App\Models\User;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Request;
use Inertia\Inertia;
use Redirect;
use Spatie\Permission\Models\Role;

class AdministrationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $per_page = Request::input('per_page') ?? 5;

        $superuser = User::where('type', 'superadmin')->first();
        
        $activesWheres   = ['last_login_at', '>=', Carbon::now()->subDays(7)->toDateString()];
        $recentsWheres   = ['created_at', '>=', Carbon::now()->subDays(7)->toDateString()];
        $inactivesWheres = ['last_login_at', '<=', Carbon::now()->subDays(7)->toDateString()];

        $actives = User::whereDate(...$activesWheres)->where(['status' => User::ACTIVE, 'type' => 'admin'])->count();

        $recents = User::whereDate(...$recentsWheres)->where(['status' => User::ACTIVE, 'type' => 'admin'])->count();

        $inactives = User::whereDate(...$inactivesWheres)->where(['status' => User::ACTIVE, 'type' => 'admin'])->count();

        // get all admin users where account status is pending.
        $pendings = User::where(['status' => User::PENDING, 'type' => 'admin'])->with('profile')->get();

        $total = User::where(['status' => User::ACTIVE, 'type' => 'admin'])->count();

        $users = User::query()->where(['type' => 'admin', 'status' => User::ACTIVE])
            ->when(Request::input('search'), function (Builder $query, string $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->OrWhere('email', 'like', '%' . $search . '%');
            })->when(Request::input('status'), function (Builder $query, $status) {
                $activesWheres   = ['last_login_at', '>=', Carbon::now()->subDays(7)->toDateString()];
                $recentsWheres   = ['created_at', '>=', Carbon::now()->subDays(7)->toDateString()];
                $inactivesWheres = ['last_login_at', '<=', Carbon::now()->subDays(7)->toDateString()];

                if ($status === 'Ativo') {
                    $query->whereDate(...$activesWheres);
                }
                if ($status === 'Novo') {
                    $query->whereDate(...$recentsWheres);
                }
                if ($status === 'Inativo') {
                    $query->whereDate(...$inactivesWheres);
                }
            })
            ->with(['profile', 'roles'])
            ->paginate($per_page);

        $totals_groups = collect(
            ['total_actives' => $actives, 'total_recents' => $recents, 'total_inactives' => $inactives, 'total_users' => $total]
        );
        
        $with_totals = $totals_groups->merge($users);
            
        return Inertia::render('Administration', [
            'admins'    => $with_totals,
            'superuser' => $superuser,
            'pendings'  => $pendings
        ]);
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
        
        return Redirect::back()->with('success', 'Usuário atualizado.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::back()->with('success', 'Usuário removido com sucesso.');
    }

    public function aproveAdminUser(string $id)
    {
        $user = User::find($id);

        $user->aproveUserToBeAdmin();

        return Redirect::back()->with('success', 'Usuário aprovado.');
    }

    public function addPermission(Request $request, User $user)
    {
        $roles = Request::input('roles');
        $user->syncRoles([]);

        if (isset($roles)) {
            foreach ($roles as $roleName) {
                $role = Role::findByName($roleName);
                $user->assignRole($role);
            }
        }

        return Redirect::back()->with('success', 'Usuário aprovado.');
    }
}
