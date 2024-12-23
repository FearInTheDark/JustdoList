<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
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

    private function defaultLayout() {
        return session('defaultLayout', 'grid');
    }

    public function update(Request $request, Task $task) {
        $validate = $request->validate([
            'title' => 'nullable|string|min:4',
            'description' => 'nullable|string',
            'time' => 'nullable|string|date_format:H:i',
            'begin_date' => 'nullable|date_format:Y-m-d',
            'end_date' => 'nullable|date_format:Y-m-d',
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
            'reminder' => 'nullable|boolean',
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

    /**
     * List all current user **reminded** tasks
     * */
    public function listReminders(Request $request) {
        $tasks = $request->user()->load('tasks')->tasks->filter(function ($task) {
            return $task->reminder && !$task->completed && Carbon::parse($task->next)->addHour()->isAfter(now()->startOfDay());
        })->values()->toArray();
        return response()->json(['tasks' => $tasks, '' => '']);
    }

    /**
     *  List all current user **calendar** tasks
     * @param Request $request
     * @return JsonResponse
     * */
    public function listCalendars(Request $request) : JsonResponse {
        $userTasks = $request->user()->tasks()->with('histories')->where('completed', false)->get();
        return response()->json(['tasks' => $userTasks]);
    }

}
