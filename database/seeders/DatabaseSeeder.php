<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Game;
use App\Models\Profile;
use App\Models\Transaction;
use App\Models\User;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(15)
        //     ->has(Profile::factory())
        //     ->has(Transaction::factory(rand(10, 20)))->create();

        if (!User::where('email', '=', 'test@example.com')->first()) {
            $testUser = User::factory()
                            ->has(Profile::factory())
                            ->has(Transaction::factory(1))->create([
                                'name'  => 'Test User',
                                'email' => 'test@example.com',
                            ]);
        }

        // \App\Models\Event::factory(1)->has(Game::factory(5)->hasBet(3))->create();
    }
}
