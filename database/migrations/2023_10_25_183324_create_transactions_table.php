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
        Schema::create('transactions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id');
            $table->string('type')->nullable();
            $table->string('payment_id')->nullable();
            $table->enum('status', ['pending', 'aproved', 'canceled'])->default('pending');
            $table->float('deposit', 8, 2)->nullable();
            $table->float('withdraw', 8, 2)->nullable();

            $table->timestamps();

            $table->foreign('user_id')->references('id')->on('users') ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
