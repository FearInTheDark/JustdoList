<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function dashboard() {
        return Inertia::render('admin/dashboard');
    }

    public function assign(Request $request) {
        $request->user()->assignRole('admin');
        return redirect()->route('dashboard');
    }

    public function data(string $data) {
        return AdminHelperController::$data();
    }

    public function massDeleteTasks(Request $request) {
        $validate = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);
        Task::destroy($request->ids);
        return response()->json(['message' => 'Tasks deleted successfully']);
    }
}
