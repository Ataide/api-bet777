<?php

namespace Database\Factories;

use App\Models\Bet;
use App\Models\Game;
use App\Models\Paper;
use App\Models\User;
use App\Models\Wallet;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name'              => fake()->name(),
            'email'             => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'status'            => fake()->randomElement([User::ACTIVE, User::PENDING]),
            'type'              => fake()->randomElement(['user', 'admin']),
            'password'          => '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', // password
            'remember_token'    => Str::random(10),
            'created_at'        => fake()->dateTimeThisMonth(),
            'last_login_at'     => fake()->dateTimeThisMonth(),
        ];
    }
    
    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterMaking(function (User $user) {
            // ...
        })->afterCreating(function (User $user) {
            Wallet::factory()->for($user)->create();

            // $game = Game::all()->random();
                                
            // $paperForBets = Paper::factory()->for($user)->create();
                            
            // $bets = Bet::factory()->count(5)->for($user)->for($game)->create();

            // $paperForBets->bets()->attach($bets);
            
            // $user->favorites()->attach([1]);

            // ...
        });
    }
}
