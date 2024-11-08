<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    public function index(Request $request) {
        return Inertia::render('app/Tasks', [
            'taskss' => $request->user()->load('tasks')->tasks,
            'tasks_count' => $request->user()->loadCount('tasks')->tasks_count,
        ]);
    }
}
