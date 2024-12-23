<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Support\Facades\DB;

class TaskAnalyticsController extends Controller {

    public function analysis() {
        $overview = $this->overview()->original;
        $frequency = $this->frequency()->original;
        $priority = $this->priority()->original;
        $reminder = $this->reminder()->original;
        $data = [
            'overview' => $overview,
            'frequency' => $frequency,
            'priority' => $priority,
            'reminder' => $reminder
        ];
        return response()->json($data);
    }


    public function overview() {
        $data = Task::selectRaw('DATE_FORMAT(begin_date, "%b") as month, COUNT(*) as tasks_count')
            ->where('begin_date', '>=', now()->subYear())
            ->groupBy(DB::raw('DATE_FORMAT(begin_date, "%b")'))
            ->get();
        return response()->json($data);
    }

    public function frequency() {
        $data = Task::selectRaw('frequency, count(*) as count')
            ->groupBy('frequency')
            ->get();
        return response()->json($data);
    }

    public function priority() {
        $data = Task::selectRaw('priority, count(*) as count')
            ->groupBy('priority')
            ->get();
        return response()->json($data);
    }

    public function reminder() {
        $data = Task::selectRaw("
            CASE
                WHEN reminder = 1 THEN 'with'
                ELSE 'without'
            END AS reminder_status,
            COUNT(*) AS count
        ")->groupBy('reminder_status')
            ->get();
        return response()->json($data);
    }

}
