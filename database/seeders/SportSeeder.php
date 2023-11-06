<?php

namespace Database\Seeders;

use App\Models\Sport;
use Illuminate\Database\Seeder;

class SportSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Sport::factory()->count(7)->sequence(
            ['name' => 'Futebol'],
            ['name' => 'Vôlei'],
            ['name' => 'Basquete'],
            ['name' => 'Baisebol'],
            ['name' => 'Boxe'],
            ['name' => 'Fut. Americano'],
            ['name' => 'Tênis'],
        )->create();
    }
}
