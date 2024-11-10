<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model {
    /** @use HasFactory<\Database\Factories\TaskFactory> */
    use HasFactory;

    protected $guarded = ['id', 'user_id', 'created_at'];

    protected $casts = [
        'completed' => 'boolean',
        'end_date' => 'date:Y-m-d',
    ];

    protected $hidden = [
        'user_id', 'created_at', 'updated_at'
    ];

    public function user(): BelongsTo {
        return $this->belongsTo(User::class);
    }
}
