import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import {BorderBeam} from "@/components/ui/border-beam";

const data = [
    { name: "Jan", total: 1500 },
    { name: "Feb", total: 2800 },
    { name: "Mar", total: 1100 },
    { name: "Apr", total: 900 },
    { name: "May", total: 1000 },
    { name: "Jun", total: 1400 },
    { name: "Jul", total: 900 },
    { name: "Aug", total: 2300 },
]

export function OverviewChart() {
    return (
        <ResponsiveContainer width="100%" height={350}>
            <BarChart data={data}>
                <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                />
                <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                />
                <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                />
            </BarChart>
        </ResponsiveContainer>
    )
}

