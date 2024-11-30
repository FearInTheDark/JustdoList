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
            'user_id' => Cache::get('user_')->id ?? auth()->id(),
            'end_date' => now()->format('Y-m-d'),
        ])->with('histories')->get();

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
            ->where('user_id', Cache::get('user_')->id ?? auth()->id())
            ->where('end_date', '<=', now()->addWeek()->format('Y-m-d'))
            ->with('histories')
            ->get();

        return Inertia::render('app/Tasks', [
            'taskss' => $tasks ?? [],
            'tasks_count' => count($tasks),
            'title' => "Weekly Tasks",
            'overdue' => TaskFilterController::overdue(Frequency::Weekly),
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
            'title' => "Monthly Tasks",
            'overdue' => TaskFilterController::overdue(Frequency::Monthly),
        ]);
    }

    public static function fetch() {
        $userId = Cache::get('user_')->id ?? auth()->id();


        Task::query()
            ->where('user_id', $userId)
            ->where('completed', false)
            ->chunkById(100, function ($tasks) {
                $missedHistories = [];
                $completedTasks = [];
                $updatedTasks = [];
                $currentDate = now()->startOfDay();
                foreach ($tasks as $task) {
                    $nextDate = Carbon::parse($task->next)->startOfDay();
                    $endDate = $task->end_date ? Carbon::parse($task->end_date)->startOfDay() : null;

                    while ($nextDate < $currentDate) {
                        $missedHistories[] = [
                            'task_id' => $task->id,
                            'type' => 'missed',
                            'title' => 'Task missed',
                            'content' => 'Task missed on ' . $nextDate->format('Y-m-d'),
                            'status' => false,
                        ];

                        // Advance the next date
                        $nextDate = self::calculateNextDate($nextDate, $task->frequency);

                        // Handle task completion if past end date
                        if ($endDate && $nextDate > $endDate) {
                            $task->next = $endDate->format('Y-m-d');
                            $task->completed = true;
                            $completedTasks[] = [
                                'task_id' => $task->id,
                                'type' => 'finished',
                                'title' => 'Task completed',
                                'content' => 'Task completed on ' . $endDate->format('Y-m-d'),
                                'status' => true,
                            ];
                            break;
                        }
                    }

                    // Update the task's next date if not completed
                    if (!$task->completed) {
                        $updatedTasks[] = [
                            'id' => $task->id,
                            'next' => $nextDate->format('Y-m-d'),
                        ];
                    }
                }

                // Bulk insert missed histories
                if (!empty($missedHistories)) {
                    TaskHistory::query()->insert($missedHistories);
                }

                // Bulk insert completed histories
                if (!empty($completedTasks)) {
                    TaskHistory::query()->insert($completedTasks);
                }

                // Bulk update tasks
                foreach ($updatedTasks as $updatedTask) {
                    Task::query()->where('id', $updatedTask['id'])->update(['next' => $updatedTask['next']]);
                }
            });
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
