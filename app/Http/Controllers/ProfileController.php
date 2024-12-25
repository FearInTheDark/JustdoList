<?php

namespace App\Http\Controllers;

use App\Models\TaskHistory;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller {
    public function summarizeLastWeek() {
        $lastSevenDays = collect(range(0, 6))->map(function ($daysAgo) {
            $date = Carbon::today()->subDays($daysAgo);
            return [
                'date' => $date->format('Y-m-d'),
                'order_number' => $daysAgo + 1,
            ];
        });

        $taskCounts = TaskHistory::query()
            ->join('tasks', 'task_histories.task_id', '=', 'tasks.id')
            ->where('tasks.user_id', Auth::id())
            ->where('task_histories.created_at', '>=', Carbon::today()->subDays(6))
            ->selectRaw("
            DATE(task_histories.created_at) as submission_date,
            SUM(CASE
                WHEN (task_histories.type = 'updated' AND task_histories.title = 'Task submitted')
                     OR task_histories.type = 'finished'
                THEN 1
                ELSE 0
            END) -
            SUM(CASE
                WHEN task_histories.type = 'missed'
                THEN 1
                ELSE 0
            END) as task_count
        ")
            ->groupByRaw('DATE(task_histories.created_at)')
            ->pluck('task_count', 'submission_date');

        return $lastSevenDays->map(function ($day) use ($taskCounts) {
            return [
                'day_of_week' => Carbon::parse($day['date'])->format('D'),
                'task_count' => $taskCounts[$day['date']] ?? 0,
                'order_number' => $day['order_number'],
            ];
        });
    }
}
