<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class TaskController extends Controller {
    public function index(Request $request) {
        $tasks = $request->user()->load(['tasks.histories'])->tasks;

        return Inertia::render('app/Tasks', [
            'taskss' => $tasks,
            'overdue' => TaskFilterController::overdue(),
            'defaultLayout' => $this->defaultLayout(),
        ]);
    }

    public function update(Request $request, Task $task) {
        $validate = $request->validate([
            'title' => 'string|min:4',
            'description' => 'nullable|string',
            'time' => 'string|date_format:H:i',
            'begin_date' => 'date_format:Y-m-d',
            'end_date' => 'date_format:Y-m-d',
            'frequency' => 'nullable|string|in:once,daily,weekly,monthly,yearly',
            'priority' => 'nullable|string|in:low,medium,high,extreme',
            'reminder' => 'nullable|boolean',
            'completed' => 'nullable|boolean',
        ]);
        $task->update($validate);
        return response()->json(['task' => $task->load('histories')]);
    }

    public function store(Request $request) {
        sleep(1);
        $user = ['user_id' => $request->user()->id];
        $validate = $request->validate([
            'title' => 'required|string|min:4',
            'description' => 'nullable|string',
            'time' => 'required|string|date_format:H:i',
            'begin_date' => 'required|date_format:Y-m-d',
            'end_date' => 'required|date_format:Y-m-d',
            'frequency' => 'nullable|string|in:once,daily,weekly,monthly,yearly',
            'priority' => 'nullable|string|in:low,medium,high,extreme',
            'completed' => 'nullable|boolean',
        ]);
        $validate['priority'] ??= 'medium';
        $validate['frequency'] ??= 'once';

        $task = Task::query()->create(array_merge($user, $validate));
        return response()->json(['task' => $task->load('histories')]);
    }

    public function destroy(Task $task) {
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }

    public function showTasks(string $time) {
        return TaskFilterController::$time();
    }

    /**
     * List all current user tasks
     * */
    public function list() {
        return response()->json(['tasks' => \request()->user()->load(['tasks.histories'])->tasks]);
    }

    private function defaultLayout() {
        return session('defaultLayout', 'grid');
    }

}
