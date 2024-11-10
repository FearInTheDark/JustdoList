<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Random\RandomException;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * @throws RandomException
     */
    public function definition(): array
    {
        return [
            'user_id' => User::query()->inRandomOrder()->value('id') ?? User::factory(),
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(random_int(min: 2, max: 4)),
            'frequency' => $this->faker->randomElement(['once', 'daily', 'weekly', 'monthly', 'yearly']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high', 'extreme']),
            'time' => $this->faker->time(),
            'end_date' => $this->faker->dateTimeBetween('now', '+3 year'),
            'completed' => $this->faker->boolean(),
        ];
    }
}
