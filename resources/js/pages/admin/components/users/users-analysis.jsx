"use client"

import {CartesianGrid, LabelList, Line, LineChart, XAxis} from "recharts"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"
import {useQuery} from "@tanstack/react-query"

const chartConfig = {
    cumulative_users: {
        label: "Cumulative Users",
        color: "hsl(var(--chart-2))",
    }
}

const UsersAnalysis = () => {
    const {data} = useQuery({
        queryKey: ['users-analysis-chart1'],
        queryFn: async () => {
            const {data} = await axios.get(route('analysis-user'))
            return data
        },
        refetchOnWindowFocus: false
    })
    return (
        <Card className="backdrop-blur">
            <CardHeader>
                <CardTitle>Line Chart - Total Users last 6 months</CardTitle>
                <CardDescription>January - December 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig}>
                    <LineChart
                        accessibilityLayer
                        data={data}
                        margin={{
                            top: 20,
                            left: 12,
                            right: 12,
                        }}
                    >
                        <CartesianGrid vertical={false}/>
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            tickMargin={8}
                            tickFormatter={(value) => value.slice(0, 3)}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent indicator="line"/>}
                        />
                        <Line
                            dataKey="cumulative_users"
                            type="natural"
                            stroke="var(--color-cumulative_users)"
                            strokeWidth={2}
                            dot={{
                                fill: "var(--color-cumulative_users)",
                            }}
                            activeDot={{
                                r: 6,
                            }}
                        >
                            <LabelList
                                position="top"
                                offset={12}
                                className="fill-foreground"
                                fontSize={12}
                            />
                        </Line>
                    </LineChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <div className="flex gap-2 font-medium leading-none">
                </div>
                <div className="w-full leading-none text-muted-foreground flex items-center justify-between flex-wrap">
                    <span>Showing total users by month for the last year</span>
                    <span className="tracking-tight font-semibold">
                        Total: {data?.[data.length - 1]?.cumulative_users || 0}
                    </span>
                </div>
            </CardFooter>
        </Card>
    )
}

export default UsersAnalysis
