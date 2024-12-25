<?php

namespace App\Http\Controllers;

use App\Enums\Frequency;
use App\Models\Task;
use App\Models\TaskHistory;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Inertia\Inertia;

class TaskFilterController extends Controller {
    public static function today() {
        $tasks = Task::query()->where([
            'user_id' => auth()->id(),
        ])
            ->where('next', '<=', now()->endOfDay()->format('Y-m-d'))
            ->where('next', '>=', now()->startOfDay()->format('Y-m-d'))
            ->with('histories')->get();

        return Inertia::render('app/Tasks', [
            'taskss' => $tasks,
            'tasks_count' => count($tasks),
            'title' => "Today Tasks",
            'type' => 'daily',
            'overdue' => TaskFilterController::overdue(Frequency::Daily),
        ]);
    }

    public static function overdue(Frequency $frequency = null) {
        return Task::query()
            ->where('user_id', Auth::id())
            ->where('next', '<', now()->format('Y-m-d'))
            ->where('completed', false)
            ->when($frequency, function ($query, $frequency) {
                $query->where('frequency', $frequency);
            })
            ->with('histories')
            ->paginate(10, ['*'], 'overdue');
    }

    public static function week() {
        $tasks = Task::query()
            ->where('user_id', auth()->id())
            ->where('next', '<=', now()->addWeek()->endOfDay()->format('Y-m-d'))
            ->where('next', '>=', now()->startOfDay()->format('Y-m-d'))
            ->with('histories')
            ->get();

        return Inertia::render('app/Tasks', [
            'taskss' => $tasks ?? [],
            'tasks_count' => count($tasks),
            'title' => "This Week Tasks",
            'overdue' => TaskFilterController::overdue(Frequency::Weekly),
        ]);
    }

    public static function month() {
        $tasks = Task::query()
            ->where('user_id', auth()->id())
            ->where('next', '<=', now()->addMonth()->endOfDay()->format('Y-m-d'))
            ->where('next', '>=', now()->startOfDay()->format('Y-m-d'))
            ->with('histories')->get();

        return Inertia::render('app/Tasks', [
            'taskss' => $tasks ?? [],
            'tasks_count' => count($tasks),
            'title' => "In next Month Tasks",
            'overdue' => TaskFilterController::overdue(Frequency::Monthly),
        ]);
    }

    private static function calculateNextDate(Carbon $currentDate, string $frequency): Carbon {
        return match ($frequency) {
            'daily' => $currentDate->addDay(),
            'weekly' => $currentDate->addWeek(),
            'monthly' => $currentDate->addMonth(),
            'yearly' => $currentDate->addYear(),
            default => $currentDate,
        };
    }

}
