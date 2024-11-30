import {DashboardLayout} from "@/pages/admin/components/dashboard-layout"
import HomeDock from "@/components/HomeDock"
import {Button} from "@/components/ui/button"
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs"
import {MetricCards} from "@/pages/admin/components/metric-cards"
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {OverviewChart} from "@/pages/admin/components/overview-chart"
import {RecentSales} from "@/pages/admin/components/recent-sales"
import AppLayout from "@/layouts/AppLayout"
import {BorderBeam} from "@/components/ui/border-beam"

const  Dashboard = () => {
    return (
        <DashboardLayout>
            <HomeDock/>
            <div className="flex-1 space-y-4 p-4 pt-6">
                <div className="flex items-center justify-between space-y-2">
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center space-x-2">
                        {/*<Button>Download</Button>*/}
                    </div>
                </div>
                <Tabs defaultValue="overview" className="space-y-4">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="analytics">Tasks</TabsTrigger>
                        <TabsTrigger value="reports">Feedbacks</TabsTrigger>
                        <TabsTrigger value="notifications">Notifications</TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview" className="space-y-4">
                        <MetricCards />
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                            <Card className="col-span-4">
                                <CardHeader>
                                    <CardTitle>Overview</CardTitle>
                                </CardHeader>
                                <CardContent className="pl-2">
                                    <OverviewChart />
                                </CardContent>
                            </Card>
                            <Card className="col-span-3">
                                <CardHeader>
                                    <CardTitle>Most Attributes</CardTitle>
                                    <CardDescription>
                                        Top 5 most attributes
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <RecentSales />
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                    <TabsContent value="analytics">
                        BIG DICK
                    </TabsContent>
                </Tabs>
            </div>
        </DashboardLayout>
    )
}

Dashboard.layout = page => <AppLayout children={page}/>

export default Dashboard
