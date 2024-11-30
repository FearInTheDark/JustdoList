<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\EventController;
use App\Http\Controllers\LanguageController;
use App\Http\Controllers\SubmitController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifiedUserController;
use App\Http\Controllers\VerifyController;
use App\Models\Event;
use Illuminate\Foundation\Auth\EmailVerificationRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::get('/', [AppController::class, 'index'])->name('index');
Route::get('/login', fn() => Inertia::render('Login'))->name('loginForm');
Route::get('/register', fn() => Inertia::render('Register'))->name('register');
Route::get('/forgot', fn() => null)->name('forgot');

Route::post('/login', [VerifiedUserController::class, 'login'])->name('login');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::post('/theme', [AppController::class, 'theme'])->name('theme');

Route::resource('users', UserController::class);


Route::prefix('/language')->group(function () {
    Route::get('/{lang}', [LanguageController::class, 'language'])->name('language');
});

Route::middleware(['auth'])->group(function () {
    Route::get('/email/verify', function () {
        return Inertia::render("Auth/VerificationNotice");
    })->middleware('redirect.id.verified')->name('verification.notice');                                                            // Email verification notice view

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
    Route::fallback(fn() =>  redirect()->route('home'));

    Route::patch('/submit/{task}', [SubmitController::class, 'submit'])->name('submit');
    Route::patch('/unsubmit/{task}', [SubmitController::class, 'unsubmit'])->name('unsubmit');

    Route::patch('/events/{event}/join/{user}', [EventController::class, 'join'])->name('events.join');
    Route::patch('/events/{event}/leave/{user}', [EventController::class, 'leave'])->name('events.leave');

    Route::get('/file', [AppController::class, 'file'])->name('file');
    Route::post('/file', [AppController::class, 'send'])->name('post_file');

    Route::get('/task-list', [TaskController::class, 'list'])->name('task-list');


    Route::get('/posts', [EventController::class, 'posts'])->name('posts');

    Route::get('/assign', [AdminController::class, 'assign'])->name('assign');

    Route::middleware(['role:admin'])->group(function () {
        Route::resource('events', EventController::class)
            ->only(['store', 'update', 'destroy']);
        Route::get('/data/{data}', [AdminController::class, 'data'])
            ->where('data', 'contributors|tasks|events')
            ->name('data');
        Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');


    });
});


