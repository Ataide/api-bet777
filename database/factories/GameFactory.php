<?php

namespace Database\Factories;

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
            'home'         => fake()->randomElements(['Flamengo', 'Palmeiras', 'Santos', 'Corinthians'], 1)[0],
            'home_odd'     => fake()->randomFloat(2, 1, 6),
            'home_icon'    => '',
            'visitor'      => fake()->randomElements(['Atletico Mineiro', 'Fortaleza', 'São Paulo', 'Vasco'], 1)[0],
            'visitor_odd'  => fake()->randomFloat(2, 1, 6),
            'visitor_icon' => '',
            'x_odd'        => fake()->randomFloat(2, 1, 6),
            'start_date'   => fake()->dateTimeThisMonth(),
        ];
    }
}
