<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class AdminHelperController extends Controller
{
    public static function contributors() {
        $contributors = User::query()
            ->select(['id', 'name', 'email', 'image', 'finished_tasks'])
            ->where('finished_tasks', '>', 0)
            ->orderBy('finished_tasks', 'desc')
            ->limit(10)
            ->get();
        return response()->json(['contributors' => $contributors]);
    }
}
