"use client"

import { TrendingUp } from "lucide-react"
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {useQuery} from "@tanstack/react-query"
const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 305 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 273 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

const chartConfig = {
    users_count: {
        label: "Users Count",
        color: "hsl(var(--chart-2))",
    }
}

const UsersOverview = () => {
    const {data} = useQuery({
        queryKey: ['users-overview'],
        queryFn: async () => {
            const {data} = await axios.get(route('overview-user'))
            return data
        },
        refetchOnWindowFocus: false
    })
    console.log(data)
    return (
        <Card className="backdrop-blur-sm">
            <CardHeader className="items-center">
                <CardTitle>Number of Users per Month</CardTitle>
                <CardDescription>
                    Showing total users for the last 6 months
                </CardDescription>
            </CardHeader>
            <CardContent className="pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect- max-h-]"
                >
                    <RadarChart data={data}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="month" />
                        <PolarGrid />
                        <Radar
                            dataKey="users_count"
                            fill="var(--color-users_count)"
                            fillOpacity={0.6}
                            dot={{
                                r: 4,
                                fillOpacity: 1,
                            }}
                        />
                    </RadarChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                </div>
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                    January - June 2024
                </div>
            </CardFooter>
        </Card>
    )
}

export default UsersOverview
