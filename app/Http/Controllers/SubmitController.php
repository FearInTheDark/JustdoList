<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Carbon\Carbon;
use Illuminate\Support\Facades\Auth;

class SubmitController extends Controller {
    public function submit(Task $task) {
        $nextDay = Carbon::parse($task->next);

        $nextDay = match ($task->frequency) {
            'daily' => $nextDay->copy()->addDay(),
            'weekly' => $nextDay->copy()->addWeek(),
            'monthly' => $nextDay->copy()->addMonth(),
            'yearly' => $nextDay->copy()->addYear(),
            default => $nextDay,
        };

        if ($task->frequency === 'once') $task->completed = true;
        else if ($nextDay > Carbon::parse($task->end_date)) {
            $nextDay = Carbon::parse($task->end_date);
            $task->completed = true;
        }

        $task->update([
            'next' => $nextDay->format('Y-m-d'),
            'completed' => $task->completed,
        ]);
        return response()->json(['task' => $task->load(['histories'])]);
    }

    public function unsubmit(Task $task) {
        if ($task->frequency === 'once') {
            $task->update(['completed' => false]);
            return response()->json(['task' => $task->load(['histories'])]);
        }

        $nextDay = Carbon::parse($task->next);
        $begin_date = Carbon::parse($task->begin_date);
        $nextDay = match ($task->frequency) {
            'daily' => $nextDay->copy()->subDay(),
            'weekly' => $nextDay->copy()->subWeek(),
            'monthly' => $nextDay->copy()->subMonth(),
            'yearly' => $nextDay->copy()->subYear(),
            default => $nextDay,
        };

        if ($nextDay < $begin_date) $nextDay = $begin_date;

        $task->update([
            'next' => $nextDay->format('Y-m-d'),
            'completed' => false,
        ]);
        return response()->json(['task' => $task->load(['histories'])]);
    }

}
