<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppController extends Controller {
    public function index(Request $request) {
        if (!Auth::check()) {
            return Inertia::render('Landing');
        }
        return Inertia::render('app/Home');
    }

    public function theme(Request $request) {
        $request->validate([
            'theme' => 'required|string|in:light,dark',
        ]);
        $theme = $request->input('theme');
        $request->session()->put('theme', $theme);

        return response()->json([
            'theme' => $theme,
        ]);
    }
}
