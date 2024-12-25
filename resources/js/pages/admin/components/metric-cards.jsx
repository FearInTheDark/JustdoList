import {Earth, MessageSquareText, Notebook, Users2} from 'lucide-react'
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card"
import NumberTicker from "@/components/ui/number-ticker";
import {useQuery} from "@tanstack/react-query";

export function MetricCards() {
    const {data} = useQuery({
        queryKey: ['metricCards'],
        queryFn: async () => {
            const {data} = await axios.get(route('analytics.metric'));
            return data
        },
        initialData: () => ({
            totalUsers: 0,
            totalTasks: 0,
            totalEvents: 0,
            totalFeedbacks: 0
        })
    })
    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 z-10">
            <Card className="dark:bg-[#1a1a1a] z-10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                    <Users2 className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        +<NumberTicker value={data.totalUsers}/>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        +20.1% from last month
                    </p>
                </CardContent>
            </Card>
            <Card className="dark:bg-[#1a1a1a] z-10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Tasks</CardTitle>
                    <Notebook className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        +<NumberTicker value={data.totalTasks}/>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        +180.1% from last month
                    </p>
                </CardContent>
            </Card>
            <Card className="dark:bg-[#1a1a1a] z-10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Events</CardTitle>
                    <Earth className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        +<NumberTicker value={data.totalEvents}/>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        +19% from last month
                    </p>
                </CardContent>
            </Card>
            <Card className="dark:bg-[#1a1a1a] z-10">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Feedbacks</CardTitle>
                    <MessageSquareText className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">
                        +<NumberTicker value={data.totalFeedbacks}/>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        +201 since last hour
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}

