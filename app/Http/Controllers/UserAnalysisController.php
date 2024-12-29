<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserAnalysisController extends Controller
{
    public function analysis() {
        $data = User::selectRaw('DATE_FORMAT(created_at, "%M") as month, COUNT(*) as users_count, MONTH(created_at) as month_number')
            ->where('created_at', '>=', now()->subYear())
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%M")'), DB::raw('MONTH(created_at)'))
            ->orderBy('month_number')
            ->get();

        $cumulativeUsers = 0;

        $result = $data->map(function ($item) use (&$cumulativeUsers) {
            $cumulativeUsers += $item->users_count;
            return [
                'month' => $item->month,
                'users_count' => $item->users_count,
                'cumulative_users' => $cumulativeUsers
            ];
        });

        return response()->json($result);
    }

    public function overview() {
        $data = User::selectRaw('DATE_FORMAT(created_at, "%M") as month, COUNT(*) as users_count')
            ->where('created_at', '>=', now()->subMonths(5))
            ->groupBy(DB::raw('DATE_FORMAT(created_at, "%M")'))
            ->get();
        return response()->json($data);
    }

    public function table(Request $request) {
        $query = User::query();

        if ($request->filled('searchValue')) {
            $query->where('name', 'like', '%' . $request->get('searchValue') . '%')
                ->orWhere('email', 'like', '%' . $request->get('searchValue') . '%');
        }

        $data = $query
            ->with('roles')
            ->orderBy('id', 'asc')
            ->paginate(20);

        return response()->json($data);
    }

    public function singleDestroy(User $user) {
        $user->delete();
        return response()->json(['message' => 'User deleted successfully']);
    }

    public function massDestroy(Request $request) {
        $validate = $request->validate([
            'ids' => 'required|array',
            'ids.*' => 'required|integer'
        ]);
        User::destroy($request->ids);
        return response()->json(['message' => 'Users deleted successfully']);
    }

    public function assignRole(User $user, string $role) {
        $user->roles()->detach();
        $user->assignRole($role);
        return response()->json(['message' => 'Role assigned successfully']);
    }
}
