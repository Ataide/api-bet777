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
        Schema::create('bet_paper', function (Blueprint $table) {
            $table->id();
            $table->unsignedBiginteger('paper_id');
            $table->unsignedBiginteger('bet_id');
            $table->foreign('paper_id')->references('id') ->on('papers')->onDelete('cascade');
            $table->foreign('bet_id')->references('id') ->on('bets')->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bet_paper');
    }
};
