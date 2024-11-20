<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class TaskFilterController extends Controller {
    public static function today() {
        $tasks = Task::query()->where([
            'user_id' => Cache::get('user_')->id ?? auth()->id(),
            'end_date' => now()->format('Y-m-d'),
        ])->with('histories')->get();

        return Inertia::render('app/Tasks', [
            'taskss' => $tasks,
            'tasks_count' => count($tasks),
            'title' => "Today Tasks"
        ]);
    }

    public static function week() {
        $tasks = Task::query()
            ->where('user_id', Cache::get('user_')->id ?? auth()->id())
            ->where('end_date', '<=', now()->addWeek()->format('Y-m-d'))
            ->with('histories')
            ->get();

        return Inertia::render('app/Tasks', [
            'taskss' => $tasks ?? [],
            'tasks_count' => count($tasks),
            'title' => "Weekly Tasks"
        ]);
    }

    public static function month() {
        $tasks = Task::query()
            ->where('user_id', Cache::get('user_')->id ?? auth()->id())
            ->where('end_date', '<=', now()->addMonth()->format('Y-m-d'))
            ->with('histories')
            ->get();

        return Inertia::render('app/Tasks', [
            'taskss' => $tasks ?? [],
            'tasks_count' => count($tasks),
            'title' => "Monthly Tasks"
        ]);
    }
}
