<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Transaction>
 */
class TransactionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $typeSelected = fake()->randomElement(['deposit', 'withdraw']);

        return [
            'user_id'    => User::pluck('id')->random(),
            'type'       => $typeSelected,
            'deposit'    => $typeSelected === 'deposit' ? fake()->randomFloat(2, 100, 7000) : 0,
            'withdraw'   => $typeSelected === 'withdraw' ? fake()->randomFloat(2, 100, 3000) : 0,
            'created_at' => fake()->dateTimeThisYear()
        ];
    }
}
