import {Bar, BarChart, LabelList, XAxis, YAxis} from "recharts"
import {useEffect, useState} from "react";
import axios from "axios";
import {route} from "ziggy-js";
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

const chartData = [
    {browser: "chrome", visitors: 275, fill: "var(--color-chrome)"},
    {browser: "safari", visitors: 200, fill: "var(--color-safari)"},
    {browser: "firefox", visitors: 187, fill: "var(--color-firefox)"},
    {browser: "edge", visitors: 173, fill: "var(--color-edge)"},
    {browser: "other", visitors: 90, fill: "var(--color-other)"},
]

const chartConfig = {
    Jan: {label: "Jan", color: "#3d8fb7"},
    Feb: {label: "Feb", color: "#15506c"},
    Mar: {label: "Mar", color: "#6b8693"},
    Apr: {label: "Apr", color: "#0c89c5"},
    May: {label: "May", color: "#073c56"},
    Jun: {label: "Jun", color: "#42b2e8"},
    Jul: {label: "Jul", color: "#183542"},
    Aug: {label: "Aug", color: "#2dafee"},
    Sep: {label: "Sep", color: "#0d2c3b"},
    Oct: {label: "Oct", color: "#8fcfee"},
    Nov: {label: "Nov", color: "#034f73"},
    Dec: {label: "Dec", color: "#9cd0e8"},
}

export default function OverviewChart() {
    const [data, setData] = useState()
    useEffect(() => {
        const odata = async () => {
            const res = await axios.get(route('analytics-task.overview'));
            setData(res?.data.map(item => {
                return {
                    month: item.month,
                    tasks_count: item.tasks_count,
                    fill: chartConfig[item.month].color,
                }
            }))
        }
        odata().then()
    }, []);
    return (
        <ChartContainer config={chartConfig}>
            <BarChart
                accessibilityLayer
                data={data}
                layout="horizontal"
                margin={{
                    top:10,
                    bottom: 0,
                }}
            >
                <XAxis
                    dataKey="month"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    tickFormatter={(value) =>
                        chartConfig[value]?.label
                    }
                />
                <YAxis dataKey="tasks_count" type="number" hide/>
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent hideLabel/>}
                />
                <Bar dataKey="tasks_count" layout="vertical" radius={5}>
                    <LabelList
                        position="top"
                        offset={12}
                        className="fill-foreground"
                        fontSize={12}
                    />
                </Bar>
            </BarChart>
        </ChartContainer>
    )
}

