import React from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import TaskOverview from "@/pages/admin/components/tasks/task-overview"
import TaskFrequencies from "@/pages/admin/components/tasks/task-frequencies"
import TasksPriority from "@/pages/admin/components/tasks/tasks-priority"
import TasksTable from "@/pages/admin/components/tasks/tasks-table"
import TaskReminders from "@/pages/admin/components/tasks/task-reminders"
import {useQuery} from "@tanstack/react-query"
import {Skeleton} from "@/components/ui/skeleton"
import TaskOfTable from "@/pages/admin/components/tasks/taskOfTable"

const TasksAnalytics = () => {
    const {data, isLoading} = useQuery({
        queryKey: ['tasksAnalytics'],
        queryFn: async () => {
            const {data} = await axios.get(route('task-analytics'));
            return data;
        }
    })
    return (
        isLoading ? <Skeleton className="w-full h-[200px] rounded-xl"/> :
                <>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 z-10">
                            <Card className="col-span-5 dark:bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle>Number of Tasks Month by Month</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <TaskOverview data={data.overview}/>
                                </CardContent>
                            </Card>
                        </div>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8 mb-10">
                            <div className="lg:col-span-2 dark:bg-[#1a1a1a]">
                                <TaskFrequencies data={data.frequency}/>
                            </div>
                            <div className="lg:col-span-2 dark:bg-[#1a1a1a]">
                                <TasksPriority data={data.priority}/>
                            </div>
                            <div className="lg:col-span-2 dark:bg-[#1a1a1a]">
                                <TaskReminders data={data.reminder}/>
                            </div>
                            <div className="lg:col-span-2 dark:bg-[#1a1a1a]">
                                <TaskFrequencies data={data.frequency}/>
                            </div>
                        </div>
                        <div className="flex dark:bg-[#1a1a1a] p-3 rounded">
                            <TaskOfTable/>
                        </div>
                        <div className="flex mx-auto">
                            <img src="/storage/app/illustrations/office.svg" alt="Well Done" className="filter drop-shadow-custom-blue "/>
                        </div>
                    </div>
                </>
    );
};

export default TasksAnalytics;
