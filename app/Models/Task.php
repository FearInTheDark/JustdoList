<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Task extends Model {
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $guarded = ['created_at'];

    protected $casts = [
        'completed' => 'boolean',
        'begin_date' => 'date:Y-m-d',
        'end_date' => 'date:Y-m-d',
    ];

    protected $hidden = [
        'user_id', 'created_at', 'updated_at'
    ];

    public function reformatDate(string $value): void {
        $this->attributes['begin_date'] = Carbon::createFromDate($value)->format('Y-m-d');
        $this->attributes['end_date'] = Carbon::createFromDate($value)->format('Y-m-d');
    }

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }

    public function histories(): HasMany {
        return $this->hasMany(TaskHistory::class);
    }

    public function addHistory(array $oldTask, array $toArray) {

    }
}
