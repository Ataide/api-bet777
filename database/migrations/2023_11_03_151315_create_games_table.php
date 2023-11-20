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
        Schema::create('games', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('event_id');

            $table->string('home_name');
            $table->string('away_name');
            $table->float('home_rate', 5, 2);
            $table->float('draw_rate', 5, 2);
            $table->float('away_rate', 5, 2);
            $table->integer('home_score')->nullable();
            $table->integer('away_score')->nullable();
            $table->dateTime('time_close_bet');
            $table->dateTime('time_start')->nullable();
            $table->dateTime('time_end')->nullable();
            $table->integer('done')->default(0);
            $table->boolean('hot')->default(0); //check if that game will be show in hotest games.
            $table->integer('result')->nullable();
            
            $table->timestamps();
            $table->softDeletes();

            $table->foreign('event_id')->references('id')->on('events')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('games');
    }
};
