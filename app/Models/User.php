<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Spatie\Permission\Traits\HasRoles;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable, HasRoles, SoftDeletes;

    const ACTIVE   = 'active';
    const PENDING  = 'pending';
    const INACTIVE = 'inactive';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'status',
        'type',
        'email',
        'password',
        'last_login_at',
        'last_login_ip'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
        'last_login_ip'
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password'          => 'hashed',
    ];
    
    public function profile()
    {
        return $this->hasOne(Profile::class);
    }

    public function transactions()
    {
        return $this->hasMAny(Transaction::class);
    }

    public function bet()
    {
        return $this->hasMany(Bet::class);
    }

    public function wallet()
    {
        return $this->hasOne(Wallet::class);
    }

    public function papers()
    {
        return $this->hasMany(Paper::class);
    }

    public function favorites()
    {
        return $this->belongsToMany(Sport::class);
    }

    public function checkIfHaveFunds($amount)
    {
        return $this->wallet->amount >= $amount;
    }

    public function takeOutWallet($amount)
    {
        $current_value = $this->wallet->amount;

        $this->wallet->update(['amount' => $current_value - $amount]);
    }

    public function updateWalletAmountInBets($amount)
    {
        $current_value = $this->wallet->bet_total;

        $this->wallet->update(['bet_total' => $current_value + $amount]);
    }
    public function createDepositTransaction($amount)
    {
        try {
            $transactions           = new Transaction();
            $transactions->user_id  = $this->id;
            $transactions->type     = 'deposit';
            $transactions->deposit  = $amount;
            $transactions->withdraw = 0;
            $transactions->save();
        } catch (\Throwable $th) {
            throw $th;
        }
    }

    public function createWithdrawTransaction($amount)
    {
        try {
            $transactions           = new Transaction();
            $transactions->user_id  = $this->id;
            $transactions->type     = 'withdraw';
            $transactions->deposit  = 0;
            $transactions->withdraw = $amount;
            $transactions->save();
        } catch (\Throwable $th) {
            throw $th;
        }
    }
    public function activeAccount()
    {
        $this->update(['status' => User::ACTIVE]);
    }
    public function inactiveAccount()
    {
        $this->update(['status' => User::INACTIVE]);
    }
    public function isAdmin()
    {
        return $this->status === ('superadmin');
    }

    public function aproveUserToBeAdmin()
    {
        $this->profile()->update(['account_status' => "Novo"]);

        return $this->update(['status' => User::ACTIVE]);
    }
}
