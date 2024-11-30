<?php

namespace App\Observers;

use App\Models\Task;
use App\Models\TaskHistory;
use App\Models\User;
use Carbon\Carbon;

class TaskObserver {
    /**
     * Handle the Task "created" event.
     */
    public function created(Task $task): void {
        if ($task->completed) {
            $user = User::find($task->user_id);
            $user->increment('finished_tasks');
        }
        $task->withoutEvents(function () use ($task) {
            $task->update([
                'next' => $task->begin_date,
                'completed' => false,
                'end_date' => $task->frequency === 'once' ? $task->begin_date : $task->end_date
            ]);
        });
        TaskHistory::create([
            'task_id' => $task->id,
	        'type' => 'created',
	        'title' => 'Task created',
            'status' => true
        ]);
    }

    public function updating(Task $task): void {
        if ($task->frequency === 'once') {
            $task->end_date = $task->begin_date;
        }
        if (!Carbon::parse($task->next)->between(Carbon::parse($task->begin_date), Carbon::parse($task->end_date))) {
            $task->next = $task->begin_date;
            $task->completed = false;
        }
        if ($task->getDirty()) $task->handleDirties();
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
    }

    /**
     * Handle the Task "deleted" event.
     */
    public function deleted(Task $task): void {
        if ($task->completed) {
            $user = User::find($task->user_id);
            $user->decrement('finished_tasks');
        }
		TaskHistory::create([
			'task_id' => $task->id,
			'type' => 'deleted',
			'title' => 'Task deleted',
			'status' => false
		]);
    }

    /**
     * Handle the Task "restored" event.
     */
    public function restored(Task $task): void {
        if ($task->completed) {
            $user = User::find($task->user_id);
            $user->increment('finished_tasks');
        }
		TaskHistory::create([
			'task_id' => $task->id,
			'type' => 'restored',
			'title' => 'Task restored',
			'status' => true
		]);
    }

    /**
     * Handle the Task "force deleted" event.
     */
    public function forceDeleted(Task $task): void {
        //
    }
}
