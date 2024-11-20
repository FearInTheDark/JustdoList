<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;

class AuthController extends Controller {
    public function login() {}

    public function logout() {
        Auth::logout();
        Cache::forget('user_');
        return redirect()->route("index");
    }
}
