<?php

use App\Http\Controllers\AppController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [AppController::class, 'index']);
Route::inertia('/register', 'Register');
Route::resource('users', UserController::class);

Route::get('/a', fn() => Inertia::render('Home'));

Route::get('/sessions', fn() => response()->json(session()));
