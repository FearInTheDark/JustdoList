<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Auth;

class Event extends Model {
    /** @use HasFactory<\Database\Factories\EventFactory> */
    use HasFactory;

    protected $guarded = ['author_id'];

    protected static function boot(): void {
        parent::boot(); // TODO: Change the autogenerated stub
        static::creating(function ($model) {
            if (Auth::check()) {
                $model->author_id = Auth::id();
            }
        });
    }

    public function author(): BelongsTo {
        return $this->belongsTo(User::class, 'author_id');
    }

    public function participants(): BelongsToMany {
        return $this->belongsToMany(User::class, 'events_users')
            ->withTimestamps();
    }

    public function tasks(): HasMany {
        return $this->hasMany(Task::class);
    }
}