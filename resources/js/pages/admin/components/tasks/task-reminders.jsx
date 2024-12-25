"use client"

import * as React from "react"
import {TrendingUp} from "lucide-react"
import {Label, Pie, PieChart} from "recharts"

import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from "@/components/ui/card"
import {ChartContainer, ChartTooltip, ChartTooltipContent,} from "@/components/ui/chart"

const chartConfig = {
    with: {
        label: "With",
        color: "#d0dc29",
    },
    without: {
        label: "Without",
        color: "#41aec7",
    }
}

const TaskReminders = ({data}) => {
    const tasks = data.map(e => ({...e, fill: chartConfig[e?.reminder_status].color}))
    return (
        <Card className="flex flex-col dark:bg-[#1a1a1a]">
            <CardHeader className="items-center pb-0">
                <CardTitle>Tasks by Reminders</CardTitle>
                <CardDescription>January - December 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={chartConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel/>}
                        />
                        <Pie
                            data={tasks}
                            dataKey="count"
                            nameKey="reminder_status"
                            innerRadius={55}
                            strokeWidth={5}
                        >
                            <Label
                                content={({viewBox}) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-foreground text-3xl font-bold"
                                                >
                                                    {data?.reduce((acc, item) => acc + item.count, 0) || 0}
                                                </tspan>
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={(viewBox.cy || 0) + 24}
                                                    className="fill-muted-foreground"
                                                >
                                                    Tasks
                                                </tspan>
                                            </text>
                                        )
                                    }
                                }}
                            />
                        </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col gap-2 text-sm">
                <div className="flex items-center gap-2 font-medium leading-none">
                    {/*Trending up by 5.2% this month <TrendingUp className="h-4 w-4"/>*/}
                </div>
                <div className="leading-none text-muted-foreground">
                    Showing total tasks for the last year
                </div>
            </CardFooter>
        </Card>
    )
}

export default TaskReminders
