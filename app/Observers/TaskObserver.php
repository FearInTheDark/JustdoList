<?php

namespace App\Observers;

use App\Models\Task;
use App\Models\TaskHistory;
use App\Models\User;

class TaskObserver {
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void {
        if ($task->completed) {
            $user = User::find($task->user_id);
            $user->increment('finished_tasks');
        }
        TaskHistory::create([
            'task_id' => $task->id,
            'content' => 'Task created',
            'status' => true
        ]);
    }

    /**
     * Handle the Task "updated" event.
     */
    public function updated(Task $task): void {
        if ($task->isDirty('completed')) {
            $user = User::find($task->user_id);
            if ($task->completed) {
                $user->increment('finished_tasks');
            } else {
                $user->decrement('finished_tasks');
            }
        }
        TaskHistory::create([
            'task_id' => $task->id,
            'content' => 'Task updated',
            'status' => $task->completed
        ]);
    }

    /**
     * Handle the Task "deleted" event.
     */
    public function deleted(Task $task): void {
        if ($task->completed) {
            $user = User::find($task->user_id);
            $user->decrement('finished_tasks');
        }
    }

    /**
     * Handle the Task "restored" event.
     */
    public function restored(Task $task): void {
        if ($task->completed) {
            $user = User::find($task->user_id);
            $user->increment('finished_tasks');
        }
    }

    /**
     * Handle the Task "force deleted" event.
     */
    public function forceDeleted(Task $task): void {
        //
    }
}
