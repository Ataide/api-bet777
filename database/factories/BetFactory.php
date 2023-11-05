<?php

namespace Database\Factories;

use App\Models\Game;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Bet>
 */
class BetFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'    => User::factory(),
            'game_id'    => Game::factory(),
            'bet_choice' => fake()->randomElements([-1, 0, 1], 1)[0],
            'quantity'   => 1,
            'rate'       => 1.00,
            'profit'     => fake()->randomFloat(2, 10, 100)
        ];
    }
}
