import React from 'react';
import {ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart"
import {CartesianGrid, LabelList, Line, LineChart, XAxis} from "recharts"

const chartConfig = {
    Jan: {label: "Jan", color: "#6ba3be"},
    Feb: {label: "Feb", color: "#6ba3be"},
    Mar: {label: "Mar", color: "#6ba3be"},
    Apr: {label: "Apr", color: "#6ba3be"},
    May: {label: "May", color: "#6ba3be"},
    Jun: {label: "Jun", color: "#6ba3be"},
    Jul: {label: "Jul", color: "#6ba3be"},
    Aug: {label: "Aug", color: "#6ba3be"},
    Sep: {label: "Sep", color: "#6ba3be"},
    Oct: {label: "Oct", color: "#6ba3be"},
    Nov: {label: "Nov", color: "#6ba3be"},
    Dec: {label: "Dec", color: "#6ba3be"},

}

const TaskOverview = ({data}) => {
    return (
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
                    dataKey="tasks_count"
                    type="natural"
                    stroke="#6ba3be"
                    strokeWidth={2}
                    dot={{
                        fill: "var(--color-desktop)",
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
    );
};

export default TaskOverview;
