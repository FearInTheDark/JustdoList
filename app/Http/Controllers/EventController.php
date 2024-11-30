<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\User;
use Inertia\Inertia;

class EventController extends Controller {
    public function index() {
        return Inertia::render('app/Events');
    }

    public function store() {}

    public function update() {}

    public function destroy() {}

    public function posts()
    {
        $events = Event::with(['author' => fn($query) => $query->select('id', 'name', 'image')])
            ->with(['participants' => fn($query) => $query->select('users.id', 'users.name')])
            ->paginate(8);
        return response()->json(['events' => $events]);
    }


    public function join(Event $event, User $user) {
        if ($event->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Already joined!', 'status' => 'joined'], 400);
        }
        $event->participants()->attach($user);
        return response()->json(['event' => $event]);
    }

    public function leave(Event $event, User $user) {
        if (!$event->participants()->where('user_id', $user->id)->exists()) {
            return response()->json(['message' => 'Not joined!'], 400);
        }
        $event->participants()->detach($user);
        return response()->json(['event' => $event]);
    }
}
