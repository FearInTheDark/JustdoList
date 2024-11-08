<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model {
	/** @use HasFactory<\Database\Factories\TaskFactory> */
	use HasFactory;

	protected $fillable = [
		'title',
		'description',
		'frequency',
		'due_date',
		'completed',
	];

	protected function casts(): array {
		return [
			'due_date' => 'datetime',
		];
	}

	public function user(): BelongsTo {
		return $this->belongsTo(User::class);
	}
}
