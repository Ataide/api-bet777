<?php

namespace Database\Seeders;

use App\Models\Event;
use App\Models\Game;
use Illuminate\Database\Seeder;

class GameSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $event = Event::all()->random();
        Game::factory(6)->for($event)->create();
    }
}
