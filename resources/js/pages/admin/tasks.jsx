import React from 'react';
import TasksAnalytics from "@/pages/admin/pages/tasks-analytics"
import AppLayout from "@/layouts/AppLayout"
import {DashboardLayout} from "@/pages/admin/components/dashboard-layout"
import GradualSpacing from "@/components/ui/gradual-spacing"

const Tasks = () => {
    return (
        <DashboardLayout>
            <GradualSpacing
                className="text-center text-4xl font-bold -tracking-widest mb-16 text-black dark:text-white md:text-7xl md:leading-[5rem]"
                text="Tasks Management"/>
            <TasksAnalytics/>
        </DashboardLayout>
    );
};
Tasks.layout = page => <AppLayout children={page}/>
export default Tasks;
