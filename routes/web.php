<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\FeedbackController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SubmitController;
use App\Http\Controllers\TaskAnalyticsController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserAnalysisController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifiedUserController;
use App\Http\Controllers\VerifyController;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [AppController::class, 'index'])->name('index');


Route::middleware(['redirect.if.verified', 'guest'])->group(function () {
    Route::get('/login', fn() => Inertia::render('Login'))->name('loginForm');
    Route::get('/register', fn() => Inertia::render('Register'))->name('register');
    Route::post('/login', [VerifiedUserController::class, 'login'])->name('login');

    Route::get('/forgot-password', fn() => Inertia::render('Auth/forgot-password'))->name('password.request');
    Route::post('/forgot-password', [AuthController::class, 'forgot'])->name('password.email');
    Route::get('/reset-password/{token}', function (string $token) {
        $email = request()->get('email');
        return Inertia::render('Auth/forgot-password', ['token' => $token, 'email' => $email]);
    })->name('password.reset');
    Route::post('/reset-password', [AuthController::class, 'reset'])->name('password.update');
});

Route::get('/feedback-landing', [FeedbackController::class, 'fetchLanding'])->name('feedback-landing');

Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/theme', [AppController::class, 'theme'])->name('theme');

Route::resource('users', UserController::class)->only(['store']);


Route::prefix('/language')->group(function () {
    Route::get('/{lang}', [LanguageController::class, 'language'])->name('language');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/email/verify', function () {
        return Inertia::render("Auth/VerificationNotice");
    })->middleware('redirect.if.verified')->name('verification.notice');                                                            // Email verification notice view

    Route::post('/verify', [VerifyController::class, 'sendEmail'])->name('email-send');     // Request email verification
    Route::post('/otp/', [VerifyController::class, 'verifyOTP'])->name('otp-verify');       // Verify OTP

    Route::get('/email/verify/{id}/{hash}', function (EmailVerificationRequest $request) {      // Verify email
        $request->fulfill();
        return redirect('/home');
    })->middleware(['signed'])->name('verification.verify');

    Route::post('/email/verification-notification', function (Request $request) {           // Resend email verification
        $request->user()->sendEmailVerificationNotification();
        return back()->with('message', 'Verification link sent!');
    })->middleware(['throttle:6,1'])->name('verification.send');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('users', UserController::class)->except(['store']);

    // Pages routes
    Route::get('/home', [AppController::class, 'home'])->name('home');
    Route::resource('tasks', TaskController::class)
        ->only('index', 'store', 'destroy', 'update');
    Route::get('/tasks/{time}', [TaskController::class, 'showTasks'])
        ->where('time', 'today|week|month|year')
        ->name('tasks.time');
    Route::get('/inbox', fn() => Inertia::render('app/Inbox'))->name('inbox');
    Route::resource('events', EventController::class)
        ->only(['index', 'show']);
    Route::get('/calendar', [AppController::class, 'calendar'])->name('calendar');
    Route::fallback(fn() => redirect()->route('home'));

    Route::patch('/submit/{task}', [SubmitController::class, 'submit'])->name('submit');
    Route::patch('/unsubmit/{task}', [SubmitController::class, 'unsubmit'])->name('unsubmit');

    // Event routes
    Route::patch('/events/{event}/join/{user}', [EventController::class, 'join'])->name('events.join');
    Route::patch('/events/{event}/leave/{user}', [EventController::class, 'leave'])->name('events.leave');

    // File routes
    Route::get('/file', [AppController::class, 'file'])->name('file');
    Route::post('/file', [AppController::class, 'send'])->name('post_file');

    Route::get('/task-list', [TaskController::class, 'list'])->name('task-list');

    // Retrieve routes
    Route::prefix('/api')->group(function () {
        Route::get('/profile-data', [ProfileController::class, 'summarizeLastWeek'])->name('summarize-last-week');
        Route::get('/calendar-tasks', [TaskController::class, 'listCalendars'])->name('list-calendars');
        Route::get('/reminders', [TaskController::class, 'listReminders'])->name('list-reminders');
        Route::get('/posts', [EventController::class, 'posts'])->name('posts');
    });

    Route::get('/feedback-request', [AppController::class, 'requestFeedback'])->name('feedback.request');
    Route::post('/feedback-request', [AppController::class, 'sendFeedback'])->name('feedback.send');

    Route::get('/assign', [AdminController::class, 'assign'])->name('assign');

    Route::middleware(['role:admin'])->group(function () {
        Route::resource('events', EventController::class)
            ->only(['store', 'update', 'destroy']);
        Route::get('/data/{data}', [AdminController::class, 'data'])
            ->where('data', 'contributors|tasks|events')
            ->name('data');
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
        Route::prefix('/admin')->group(function () {
            Route::get('users', fn() => Inertia::render('admin/users'))->name('admin.users');
            Route::get('tasks', fn() => Inertia::render('admin/tasks'))->name('admin.tasks');
            Route::get('events', fn() => Inertia::render('admin/events'))->name('admin.events');
            Route::get('feedbacks', fn() => Inertia::render('admin/feedbacks'))->name('admin.feedbacks');
        });
        Route::prefix('/analytics')->group(function () {
            Route::get('/metric-overview', [AnalyticsController::class, 'metric'])->name('analytics.metric');
            Route::prefix('/tasks')->group(function () {
                Route::get('/analysis', [TaskAnalyticsController::class, 'analysis'])->name('task-analytics');
                Route::get('/overview', [TaskAnalyticsController::class, 'overview'])->name('analytics-task.overview');
                Route::get('/table', [TaskAnalyticsController::class, 'table'])->name('analytics-task.table');
            });
            Route::prefix('/users')->group(function () {
                Route::get('/analysis', [UserAnalysisController::class, 'analysis'])->name('analysis-user');
                Route::get('/overview', [UserAnalysisController::class, 'overview'])->name('overview-user');
                Route::get('/table', [UserAnalysisController::class, 'table'])->name('table-user');

                Route::delete('/destroy/{user}', [UserAnalysisController::class, 'singleDestroy'])->name('single-destroy');
                Route::delete('/mass-destroy/', [UserAnalysisController::class, 'massDestroy'])->name('mass-destroy');

                Route::post('/assign/{user}/{role}', [UserAnalysisController::class, 'assignRole'])->name('assign.role');
            });
            Route::prefix('/feedbacks')->group(function () {});
        });

        Route::delete('/mass-delete-tasks', [AdminController::class, 'massDeleteTasks'])->name('admin.mass-delete-tasks');
    });
});


