<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class TaskController extends Controller {
    public function index(Request $request) {
        return Inertia::render('app/Tasks', [
            'taskss' => $request->user()->load(['tasks.histories'])->tasks,
            'tasks_count' => $request->user()->loadCount('tasks')->tasks_count,
            'overdue' => $this->overdue(),
            'defaultLayout' => $this->defaultLayout(),
        ]);
    }

    public function update(Request $request, Task $task) {
        $validate = $request->validate([
            'title' => 'required|string|min:4',
            'description' => 'nullable|string',
            'time' => 'required|string|date_format:H:i',
            'end_date' => 'required|date_format:Y-m-d',
            'frequency' => 'nullable|string|in:once,daily,weekly,monthly,yearly',
            'priority' => 'nullable|string|in:low,medium,high,extreme',
            'completed' => 'nullable|boolean',
        ]);
        $oldTask = $task->toArray();
        $task->update($validate);
        // Add records to TaskHistory based on the difference between the old and new tasks
        $task->addHistory($oldTask, $task->toArray());
        return Inertia::render('app/Tasks', [
            'task' => $task
        ]);
    }

    public function store(Request $request) {
        sleep(1);
        $user = ['user_id' => (Cache::get('user_')->id ?? $request->user()->id)];
        $validate = $request->validate([
            'title' => 'required|string|min:4',
            'description' => 'nullable|string',
            'time' => 'required|string|date_format:H:i',
            'end_date' => 'required|date_format:Y-m-d',
            'frequency' => 'nullable|string|in:once,daily,weekly,monthly,yearly',
            'priority' => 'nullable|string|in:low,medium,high,extreme',
            'completed' => 'nullable|boolean',
        ]);
        $validate['priority'] = $validate['priority'] ?? 'medium';
        $validate['frequency'] = $validate['frequency'] ?? 'once';

        $task = Task::query()->create(array_merge($user, $validate));
        return Inertia::render('app/Tasks', [
            'task' => $task->load('histories')
        ]);
    }

    public function destroy(Task $task) {
        $task->delete();
        return response()->json(['message' => 'Task deleted']);
    }

    public function showTasks(string $time) {
        return TaskFilterController::$time();
    }

    private function overdue() {
        return Task::query()
            ->where('user_id', Auth::id())
            ->where('end_date', '<', now()->format('Y-m-d'))
            ->where('completed', false)
            ->paginate(10, ['*'], 'overdue');
    }

    private function defaultLayout() {
        return session('defaultLayout', 'grid');
    }

}
