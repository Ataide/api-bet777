<?php

namespace App\Http\Controllers;

use App\Models\Sport;
use App\Models\Transaction;
use App\Models\User;
use Auth;
use Carbon\Carbon;
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

        $activesWheres   = ['last_login_at', '>=', Carbon::now()->subDays(7)->toDateString()];
        $recentsWheres   = ['created_at', '>=', Carbon::now()->subDays(7)->toDateString()];
        $inactivesWheres = ['last_login_at', '<=', Carbon::now()->subDays(7)->toDateString()];

        $actives = User::whereDate(...$activesWheres)->where('type', 'user')->count();

        $recents = User::whereDate(...$recentsWheres)->where('type', 'user')->count();

        $inactives = User::whereDate(...$inactivesWheres)->where('type', 'user')->count();

        $total = User::where(['type' => 'user'])->count();

        $users = User::query()->where((['type' => 'user']))
            ->when(Request::input('search'), function (Builder $query, $search) {
                $query->where('name', 'like', '%' . $search . '%')
                    ->OrWhere('email', 'like', '%' . $search . '%');
            })
            ->when(Request::input('status'), function (Builder $query, $status) {
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
            ->with('profile')
            ->paginate($per_page);

        $totals_groups = collect(
            ['total_actives' => $actives, 'total_recents' => $recents, 'total_inactives' => $inactives, 'total_users' => $total]
        );
        
        $with_totals = $totals_groups->merge($users);

        $last_users = User::where('type', 'user')->whereBetween('created_at', [now()->subDays(30), now()])
        ->orderBy('created_at')
        ->get()
        ->groupBy(function ($val) {
            return $val->created_at->format('d/m/Y');
        });

        $news_users = User::where('type', 'user')->whereBetween('created_at', [now()->subDays(7), now()])
        ->orderBy('created_at')
        ->get()
        ->groupBy(function ($val) {
            return $val->created_at->format('d/m/Y');
        });

        return Inertia::render('Users', ['users' => $with_totals, 'last_users' => $last_users, 'news_users' => $news_users]);
    }

    public function storeFromModal(Request $request)
    {
        // $request->user()->fill($request->validated());

        // // if ($request->user()->isDirty('email')) {
        // //     $request->user()->email_verified_at = null;
        // // }

        // $request->user()->save();

        Request::validate([
            'user_id' => ['required', 'exists:users,id'],
            'name'    => ['required', 'string', 'max:255'],
            'cpf'     => ['required', 'string', 'max:255'],
            'phone'   => ['required', 'string', 'max:255'],
            'pix_key' => ['required', 'string', 'max:255'],
            'email'   => ['required', 'string'],
        ]);
        
        // $user = Auth::user();

        // $user->update([
        //     'name'  => $request->name,
        //     'email' => $request->email,
        // ]);
        
        // $user->profile()->update([
        //     'cpf'     => $request->cpf,
        //     'phone'   => $request->phone,
        //     'pix_key' => $request->pix_key,
        // ]);
        
        return Redirect::back()->with('success', 'User created.');
    }

    public function favoriteSport(Request $request)
    {
        $sport_name = Request::validate([
            'sport_name' => ['required', 'exists:sports,name'],
        ]);

        $user = Auth::user();

        $sport_exists = $user->favorites()->where('name', $sport_name)->first();
       
        if (!is_null($sport_exists)) {
            $user->favorites()->detach([$sport_exists->id]);

            return response()->json(['message' => 'Sport removed to User favorite sports']);
        }
        $sport = Sport::where('name', $sport_name)->first();

        $user->favorites()->attach([$sport->id]);

        return response()->json(['message' => 'Sport added to User favorite sports']);
    }

    public function transactions(Request $request)
    {
        $user = Auth::user();

        $transactions = Transaction::query()
        ->when(Request::input('type'), function (Builder $query, $type) {
            $query->where('type', $type);
        })
        ->when(Request::input('date'), function (Builder $query, $date) {
            $query->whereDate('created_at', '=', Carbon::parse($date));
        })

        ->where('user_id', $user->id)->orderBy('id', 'desc')
        // ->when(Request::input('status'), function (Builder $query, $status) {
        //     $query->whereRelation('profile', 'account_status', $status);
        // })
        ->get();

        return response()->json($transactions);
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
    public function destroy(User $user)
    {
        $user->delete();

        return Redirect::back()->with('success', 'Usuário removido com sucesso.');
    }
}
