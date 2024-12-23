<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Validation\ValidationException;

class VerifiedUserController extends Controller {
    public function login(Request $request) {
        sleep(3);
        if (Auth::check()) return redirect('/');

        $validate = $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:3'
        ]);
        $remember = $request->has('remember');

        if (!Auth::attempt($validate, $remember)) {
            throw ValidationException::withMessages([
                'email' => 'Sorry, those credentials do not match!'
            ]);
        }

        $request->session()->regenerate();
        return redirect('/');
    }
}
