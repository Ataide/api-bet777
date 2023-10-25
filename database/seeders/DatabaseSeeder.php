<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        \App\Models\User::factory(15)->has(\App\Models\Profile::factory())->has(\App\Models\Transaction::factory(rand(10, 20)))->create();

        if (!\App\Models\User::where('email', '=', 'test@example.com')->first()) {
            \App\Models\User::factory()
            ->has(\App\Models\Profile::factory())
            ->has(\App\Models\Transaction::factory(10))->create([
                'name'  => 'Test User',
                'email' => 'test@example.com',
            ]);
        }
    }
}
