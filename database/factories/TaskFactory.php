<?php

namespace Database\Factories;

use App\Models\Task;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Random\RandomException;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory {
    protected $model = Task::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     * @throws RandomException
     */
    public function definition(): array {
        return [
            'user_id' => User::query()->inRandomOrder()->value('id') ?? User::factory(),
            'title' => $this->faker->sentence(3),
            'description' => $this->faker->paragraph(2),
            'frequency' => $this->faker->randomElement(['once', 'daily', 'weekly', 'monthly', 'yearly']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high', 'extreme']),
            'time' => $this->faker->time(),
            'begin_date' => $this->faker->dateTimeBetween('-1 year', ),
            'end_date' => $this->faker->dateTimeBetween('now', '+3 week'),
            'reminder' => $this->faker->boolean(),
        ];
    }
}
