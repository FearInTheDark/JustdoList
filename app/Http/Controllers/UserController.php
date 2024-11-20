<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;

class UserController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request) {
        sleep(1);
        $validate = $request->validate([
            'email' => ['email', 'required']
        ]);
        if (User::query()->where('email', $validate['email'])->first()) {
            return back()->withErrors(['email' => 'Email is already taken']);
        }
        if (!$request['password'])
            return back()->with(['success' => 'Email is valid']);

        $validate = array_merge($validate, $request->validate([
            'password' => ['required', 'min:2', 'confirmed', Password::min(2)->letters()]
        ]));
        $user = User::query()->create($validate);
        auth()->login($user);
        return redirect('/')->with(['success' => 'User created']);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create() {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id) {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id) {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user) {
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user) {
        $user->delete();
        return redirect('/')->with(['success' => 'User deleted']);
    }
}
