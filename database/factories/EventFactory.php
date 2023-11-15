<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Event>
 */
class EventFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title'    => fake()->randomElement(['Campeonato A', 'Campeonato B', 'Campeonato C', 'Campeonato D', 'Campeonato E', 'Campeonato F', 'Campeonato G']),
            'sport'    => fake()->randomElement(['Futebol', 'Vôlei', 'Boxe', 'Basquete', 'Tenis', 'Beisebol', 'Futebol Americano']),
            'sport_id' => rand(1, 4),
            'end_date' => fake()->dateTimeThisMonth()

        ];
    }
}
