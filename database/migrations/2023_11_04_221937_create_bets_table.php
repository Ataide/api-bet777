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
        Schema::create('bets', function (Blueprint $table) {
            $table->id();

            $table->unsignedBigInteger('user_id');
            $table->unsignedBigInteger('game_id');
           
            $table->integer('bet_choice'); //1 is home, 0 is draw, -1 is away
            $table->integer('quantity')->default(1);
            $table->float('rate', 5, 2);
            $table->float('profit', 8, 2)->default(0.0);

            $table->foreign('user_id')->references('id')->on('users') ->onDelete('cascade');
            $table->foreign('game_id')->references('id')->on('games') ->onDelete('cascade');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bets');
    }
};
