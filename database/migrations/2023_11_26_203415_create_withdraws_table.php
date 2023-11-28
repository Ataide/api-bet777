<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('withdraws', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('transaction_id');
            $table->enum('status', ['pending', 'aproved', 'canceled'])->default('pending');
            $table->float('amount', 8, 2);
            $table->string('reason')->nullable();
            $table->softDeletes();
            $table->timestamps();
            $table->dateTime('aproved_at')->nullable();

            $table->foreign('user_id')->references('id')->on('users') ->onDelete('cascade');
            $table->foreign('transaction_id')->references('id')->on('transactions') ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('withdraws');
    }
};
