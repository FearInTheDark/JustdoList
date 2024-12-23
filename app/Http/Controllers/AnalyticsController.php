<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Feedback;
use App\Models\Task;
use App\Models\User;

class AnalyticsController extends Controller {
    public function metric() {
        $totalUsers = User::count();
        $totalTasks = Task::count();
        $totalEvents = Event::count();
        $totalFeedbacks = Feedback::count();
        return response()->json([
            'totalUsers' => $totalUsers,
            'totalTasks' => $totalTasks,
            'totalEvents' => $totalEvents,
            'totalFeedbacks' => $totalFeedbacks,
        ]);
    }
}
