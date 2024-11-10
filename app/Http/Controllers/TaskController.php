<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller {
    public function index(Request $request) {
        return Inertia::render('app/Tasks', [
            'taskss' => $request->user()->load('tasks')->tasks,
            'tasks_count' => $request->user()->loadCount('tasks')->tasks_count,
        ]);
    }

    public function update(Request $request, Task $task) {
        $validate = $request->validate([
            'title' => 'required|string|min:4',
            'description' => 'nullable|string',
            'time' => 'required|string|date_format:H:i:s',
            'end_date' => 'required|date_format:Y-m-d',
            'frequency' => 'nullable|string|in:once,daily,weekly,monthly,yearly',
            'priority' => 'nullable|string|in:low,medium,high,extreme',
            'completed' => 'nullable|boolean',
        ]);
        $task->update($validate);
        return Inertia::render('app/Tasks', [
            'task' => $task
        ]);
    }

    public function store(Request $request) {
        $user = ['user_id' => $request->user()->id];
        $validate = $request->validate([
            'title' => 'required|string|min:4',
            'description' => 'nullable|string',
            'time' => 'required|string|date_format:H:i',
            'end_date' => 'required|date_format:Y-m-d',
            'frequency' => 'nullable|string|in:once,daily,weekly,monthly,yearly',
            'priority' => 'nullable|string|in:low,medium,high,extreme',
        ]);
        $validate['priority'] = $validate['priority'] ?? 'medium';
        $validate['frequency'] = $validate['frequency'] ?? 'once';

        $task = Task::create(array_merge($user, $validate));

        return Inertia::render('app/Tasks', [
            'task' => $task
        ]);
    }
}
