<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Event::factory()->count(3)->sequence(
            ['sport' => 'Futebol', 'sport_id' => 1],
            ['sport' => 'Vôlei', 'sport_id' => 2],
            ['sport' => 'Basquete', 'sport_id' => 3],
        )->create();
    }
}
