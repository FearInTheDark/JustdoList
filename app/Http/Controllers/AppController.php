<?php

namespace App\Http\Controllers;

use App\Models\Feedback;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class AppController extends Controller {
    public function index() {
        if (!Auth::check()) {
            return Inertia::render('Landing');
        }
        return redirect()->route('home');
    }

    public function home() {
        return Inertia::render('app/Home');
    }

    public function calendar() {
        $userTasks = Auth::user()->tasks()->with('histories')->where('completed', false)->get();
        return Inertia::render('app/Calendar', [
            'tasks' => $userTasks,
        ]);
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

    public function requestFeedback(Request $request) {
        $feedback = $request->user()->feedbacks()->where('created_at', '>=', Carbon::now()->startOfDay())->first();
        if ($feedback) {
            return response()->json(['message' => 'Feedback already requested'], 201);
        }
        return response()->json(['message' => "User can provide feedback"]);
    }

    public function sendFeedback(Request $request) {
        // Request contains 'feedback' field is a raw html tag presents. How can I save it to db and display it in the frontend?

        $request->validate([
            'feedback' => 'required|string',
        ]);
        $feedback = Feedback::create([
            'user_id' => $request->user()->id,
            'content' => $request->input('feedback'),
        ]);

        return response()->json(['message' => 'Feedback sent']);
    }


    public function send(Request $request) {
        $request->validate([
            'file' => 'required|file|mimes:jpg,png,jpeg,svg,gif|max:2048',
        ]);

        $newName = strtolower(auth()->user()->name . '-' . auth()->user()->id . "." . $request->file('file')->getClientOriginalExtension());

        $path = $request->file('file')->storeAs('app/avatars', $newName, 'public');

        auth()->user()->image = $newName;
        auth()->user()->save();

        return response()->json(['file' => $path]);
    }

    public function file() {
        return Inertia::render('app/File');
    }
}
