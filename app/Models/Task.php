<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model {
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;
    use SoftDeletes;

    protected $guarded = ['created_at'];

    protected $casts = [
        'completed' => 'boolean',
        'begin_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
        'next' => 'date:Y-m-d',
        'time' => 'datetime:H:i',
    ];

    protected $hidden = [
        'user_id', 'created_at', 'updated_at'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function histories(): HasMany {
        return $this->hasMany(TaskHistory::class);
    }

    public function handleDirties(): void {
        $data = [];

        foreach (array_keys($this->getDirty()) as $field) {
            if ($field === 'reminder') continue;
            if ($field === 'next') {
                $originalNext = Carbon::parse($this->getOriginal('next'))->startOfDay();
                $dirtyNext = Carbon::parse($this->getAttribute('next'))->startOfDay();

                if ($dirtyNext < $originalNext) {
                    $data[] = [
                        'task_id' => $this->id,
                        'type' => 'updated',
                        'title' => 'Task unsubmitted',
                        'content' => "Task was unsubmitted.",
                        'status' => false,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                } elseif ($dirtyNext > $originalNext) {
                    $data[] = [
                        'task_id' => $this->id,
                        'type' => 'updated',
                        'title' => 'Task submitted',
                        'content' => "Task was submitted.",
                        'status' => true,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ];
                }
                continue;
            }
            if ($field === 'completed') {
                $data[] = [
                    'task_id' => $this->id,
                    'type' => $this->getAttribute($field) ? 'finished' : 'missed',
                    'title' => $this->getAttribute($field) ? 'Task completed' : 'Task uncompleted',
                    'content' => $this->getAttribute($field) ? 'Task was completed.' : 'Task was uncompleted.',
                    'status' => $this->getAttribute($field),
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
            else {
                $data[] = [
                    'task_id' => $this->id,
                    'type' => 'updated',
                    'title' => 'Task Updated',
                    'content' => "The field $field was updated to {$this->getAttribute($field)}.",
                    'status' => true,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }
        }

        if (!empty($data)) {
            TaskHistory::query()->insert($data);
        }
    }


}
