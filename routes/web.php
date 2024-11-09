<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VerifiedUserController;
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


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('tasks', TaskController::class)
        ->only('create', 'store', 'destroy', 'index');
    Route::get('/app', fn() => Inertia::render('app/Home'));

});

Route::get('/sessions', fn() => response()->json(session()));
