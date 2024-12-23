import {DashboardLayout} from "@/pages/admin/components/dashboard-layout"
import HomeDock from "@/components/HomeDock"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {TopContributors} from "@/pages/admin/components/top-contributors"
import AppLayout from "@/layouts/AppLayout"
import OverviewChart from "@/pages/admin/components/overview-chart"
import TasksAnalytics from "@/pages/admin/pages/tasks-analytics"
import {MetricCards} from "@/pages/admin/components/metric-cards"

const  Dashboard = () => {
    return (
        <DashboardLayout>
            <HomeDock/>
            <div className="flex-1 space-y-4 p-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center space-x-2">
                    </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="tasks">Tasks</TabsTrigger>
                        <TabsTrigger value="feedbacks">Feedbacks</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <MetricCards/>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-5 dark:bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <OverviewChart />
                                </CardContent>
                            </Card>
                            <Card className="col-span-4 md:col-span-2 dark:bg-[#1a1a1a]">
                                <CardHeader>
                                    <CardTitle>Most Attributes</CardTitle>
                                    <CardDescription>
                                        Top 5 most attributes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <TopContributors />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="tasks">
                        <TasksAnalytics/>
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}

Dashboard.layout = page => <AppLayout children={page}/>

export default Dashboard
