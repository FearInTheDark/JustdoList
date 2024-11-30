<?php

namespace App\Providers;

use App\Models\Event;
use App\Models\Task;
use App\Models\User;
use App\Observers\TaskObserver;
use App\Observers\UserObserver;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider {
    /**
     * Register any application services.
     */
    public function register(): void {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void {
        User::preventLazyLoading();
        Task::preventLazyLoading();
        Event::preventLazyLoading();
        User::observe(UserObserver::class);
        Task::observe(TaskObserver::class);
    }
}
