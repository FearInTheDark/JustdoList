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
Route::post('/login', [VerifiedUserController::class, 'login'])->name('login');
Route::get('/register', fn() => Inertia::render('Register'))->name('register');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
Route::get('/forgot', fn() => null)->name('forgot');

Route::post('/theme', [AppController::class, 'theme'])->name('theme');

Route::resource('users', UserController::class);
Route::resource('tasks', TaskController::class)
    ->only('create', 'store', 'destroy', 'index')
    ->middleware(['auth', 'verified']);

Route::get('/app', fn() => Inertia::render('app/Home'))
    ->middleware(['auth', 'verified']);

Route::get('/sessions', fn() => response()->json(session()));
