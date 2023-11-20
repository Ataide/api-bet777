<?php

namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Game>
 */
class GameFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'event_id'       => Event::factory(),
            'home_name'      => fake()->randomElement(['Flamengo', 'Palmeiras', 'Santos', 'Corinthians']),
            'away_name'      => fake()->randomElements(['Atletico Mineiro', 'Fortaleza', 'São Paulo', 'Vasco'], 1)[0],
            'home_rate'      => fake()->randomFloat(2, 1, 6),
            'draw_rate'      => fake()->randomFloat(2, 1, 6),
            'away_rate'      => fake()->randomFloat(2, 1, 6),
            'time_close_bet' => fake()->dateTimeThisMonth(),
            'time_start'     => fake()->dateTimeThisMonth(),
            'time_end'       => null,
            'done'           => 0,
            'hot'            => rand(0, 1)
            
        ];
    }

    /**
     * Indicate that the model's done should be updated
     */
    public function done(): static
    {
        return $this->state(fn (array $attributes) => [
            'done'       => 1,
            'home_score' => 1,
            'away_score' => 0
        ]);
    }
}
