<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard() {
        return Inertia::render('admin/dashboard');
    }

    public function assign(Request $request) {
        $request->user()->assignRole('admin');
        return redirect()->route('dashboard');
    }

    public function data(string $data) {
        return AdminHelperController::$data();
    }
}
