<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Feedback>
 */
class FeedbackFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->value('id') ?? User::factory(),
            'content' => $this->faker->text(),
            'handled' => $this->faker->boolean(),
            'created_at' => $this->faker->dateTimeBetween('-1 year', '-4 month'),
            'updated_at' => $this->faker->dateTimeBetween('-4 month', 'now'),
        ];
    }
}
