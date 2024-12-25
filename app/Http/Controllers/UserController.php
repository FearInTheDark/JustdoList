<?php

namespace App\Http\Controllers;

use App\Http\Requests\DeleteUserRequest;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Validation\Rules\Password;
use function Symfony\Component\String\u;

class UserController extends Controller {
    /**
     * Display a listing of the resource.
     */
    public function index() {
        return redirect('/');
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
        $remember = $request->has('remember-me');
        $user = User::query()->create($validate);
        auth()->login($user, $remember);
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
        $validate = $request->validate([
            'name' => ['string'],
            'email' => ['email', 'max:254'],
            'email_verified_at' => ['nullable', 'date'],
            'password' => ['nullable', 'min:2', 'confirmed', Password::min(2)->letters()],
            'birthday' => ['nullable', 'date:Y-m-d'],
            'finished_tasks' => ['integer'],
            'image' => ['nullable'],
        ]);

        if ($request->filled('verified')) {
            $validate['email_verified_at'] = $request->input('verified') ? now() : null;
        }

        $user->update($validate);

        return response()->json(['user' => $user]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(DeleteUserRequest $request, User $user) {
        if ($user->id !== $request->user()->id) {
            abort(403, 'Unauthorized action.');
        }

        $user->delete();
        return response()->json(['message' => 'User deleted']);
    }
}
