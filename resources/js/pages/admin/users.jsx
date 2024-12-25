import React, {useState} from 'react';
import AppLayout from "@/layouts/AppLayout"
import {DashboardLayout} from "@/pages/admin/components/dashboard-layout"
import GradualSpacing from "@/components/ui/gradual-spacing"
import GridPattern from "@/components/ui/grid-pattern"
import UsersOverview from "@/pages/admin/components/users/users-overview"
import UsersAnalysis from "@/pages/admin/components/users/users-analysis"
import UsersTable from "@/pages/admin/components/users/users-table"

const Users = () => {
    const [loading, setLoading] = useState(false)

    return (
        <DashboardLayout>
            <GridPattern
                width={20} height={20}
                x={-1} y={-1}
                strokeDasharray={"4 2"}
                className="fixed [mask-image:radial-gradient(900px_circle_at_center,white,transparent)] z-0 size-full"/>
            <GradualSpacing
                className="text-center text-4xl font-bold -tracking-widest mb-16 text-black dark:text-white md:text-7xl md:leading-[5rem]"
                text="Users Management"/>
            {loading ?
                <div className="min-h-full max-w-6xl mx-auto my-auto grid place-items-center">
                    <img src="/storage/app/illustrations/undraw1.svg" alt="Free" className="[margin:0_auto] filter drop-shadow-custom-blue"/>
                </div> :
                <>
                    <div className="flex flex-col gap-4">
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <div className="lg:col-span-4 ">
                                <UsersAnalysis/>
                            </div>
                            <div className="lg:col-span-3 ">
                                <UsersOverview/>
                            </div>
                        </div>
                        <div className="flex dark:bg-[#1a1a1a] p-3 rounded z-10">
                            <UsersTable/>
                        </div>
                        <div className="flex mx-auto">
                            <img src="/storage/app/illustrations/well-done.svg" alt="Well Done" className="filter drop-shadow-custom-blue "/>
                        </div>
                    </div>
                </>
            }
        </DashboardLayout>
    );
};

Users.layout = page => <AppLayout children={page}/>
export default Users;
