<?php

namespace App\Http\Controllers;

use App\Models\Feedback;

class FeedbackController extends Controller {
    public function fetchLanding() {
        $feedbacks = Feedback::with('user:id,name,email,image')
            ->latest()
            ->take(50)
            ->get(['content', 'user_id']);
        return response()->json($feedbacks);
    }
}
