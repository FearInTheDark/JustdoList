<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

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
        if ($request['password']) {
            $validate = array_merge($validate, $request->validate([
                'password' => ['required', 'min:2', 'confirmed']
            ]));
        } else {
            return back()->with(['success' => 'Email is valid']);
        }
//        dd($validate);
        $user = User::create($validate);
//        login to $user
        auth()->login($user);
        return redirect('/');

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
    public function update(Request $request, string $id) {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id) {
        //
    }
}
