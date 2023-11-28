<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Withdraw extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'user_id',
        'transaction_id',
        'status',
        'amount',
        'reason',
        'aproved_at'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function transaction()
    {
        return $this->belongsTo(Transaction::class);
    }

    public function aproveWithdrawTransaction()
    {
        $transaction = $this->transaction;

        $transaction->aprove();
    }

    public function cancelWithdrawTransaction()
    {
        $transaction = $this->transaction;

        $transaction->cancel();
    }
}
