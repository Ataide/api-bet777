<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Profile>
 */
class ProfileFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id'        => User::factory(),
            'cpf'            => '22813495867',
            'phone'          => fake()->phoneNumber(),
            'pix_key'        => fake()->swiftBicNumber(),
            'account_status' => fake()->randomElement(['Ativo' , 'Novo' , 'Inativo']),
        ];
    }
}
