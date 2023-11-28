<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;

use Config;
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

    public function checkIfHaveFundsToDraw($amount)
    {
        return $this->wallet->draw_total >= $amount;
    }

    public function withdraw()
    {
        return $this->hasMany(Withdraw::class);
    }
    
    public function takeOutWallet($amount_to_draw)
    {
        $rate                  = Config::get("services.gateway.draw_rate");
        $value_to_gateway      = $amount_to_draw * $rate;
        $updated_wallet_amount = $this->wallet->amount  - $amount_to_draw;
        $updated_draw_total    = $updated_wallet_amount - $value_to_gateway;

        $this->wallet->update([
            'amount'     => $updated_wallet_amount,
            'draw_total' => $updated_draw_total
        ]);
    }
    public function takeOutPaperAmountFromWallet($amount_to_draw)
    {
        $rate                  = Config::get("services.gateway.draw_rate");
        $updated_wallet_amount = $this->wallet->amount - $amount_to_draw;
        $value_to_gateway      = $updated_wallet_amount * $rate;
        $updated_draw_total    = $updated_wallet_amount - $value_to_gateway;

        $this->wallet->update([
            'amount'     => $updated_wallet_amount,
            'draw_total' => $updated_draw_total
        ]);
    }
    /**
     * [Adiciona um valor a carteria do usuario.]
     *
     * @param float $amount
     *
     * @return void
     *
     */
    public function addToWallet(float $amount): void
    {
        $rate          = Config::get("services.gateway.draw_rate");
        $current_value = $this->wallet->amount;
        $value_total   = $current_value + $amount;

        $this->wallet->update(
            [
                'amount'     => $current_value + $amount,
                'draw_total' => $value_total - ($value_total * $rate)
            ]
        );
    }

    public function updateWalletAmountInBets($amount)
    {
        $current_value = $this->wallet->bet_total;

        $this->wallet->update(['bet_total' => $current_value + $amount]);
    }
    /**
     * [Cria uma transação de depósito para o usuario]
     *
     * @param mixed $amount
     *
     * @return Transaction
     *
     */
    public function createDepositTransaction($amount): Transaction
    {
        try {
            $transactions           = new Transaction();
            $transactions->user_id  = $this->id;
            $transactions->type     = 'deposit';
            $transactions->deposit  = $amount;
            $transactions->withdraw = 0;
            $transactions->save();

            return $transactions;
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

            $withdraw = new Withdraw();

            $withdraw->user_id        = $this->id;
            $withdraw->transaction_id = $transactions->id;
            $withdraw->amount         = $amount;
            $withdraw->save();
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
