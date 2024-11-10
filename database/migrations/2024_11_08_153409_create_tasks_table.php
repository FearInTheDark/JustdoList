<?php

use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(User::class)->constrained()->cascadeOnUpdate()->cascadeOnDelete();
            $table->string('title')->default('Untitled');
            $table->text('description')->nullable();
            $table->enum('frequency', ['once','daily', 'weekly', 'monthly', 'yearly'])->default('once');
            $table->enum('priority', ['low', 'medium', 'high', 'extreme'])->default('medium');
            $table->time('time')->nullable();
            $table->date('end_date')->nullable();
            $table->boolean('completed')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
