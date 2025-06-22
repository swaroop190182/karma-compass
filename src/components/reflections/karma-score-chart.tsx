"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const chartData = [
  { date: 'Jun 10', score: 25 },
  { date: 'Jun 11', score: 28 },
  { date: 'Jun 12', score: 22 },
  { date: 'Jun 13', score: 35 },
  { date: 'Jun 14', score: 40 },
  { date: 'Jun 15', score: 38 },
  { date: 'Jun 16', score: 45 },
];

export function KarmaScoreChart() {
    return (
        <Card>
            <CardHeader className="flex flex-row justify-between items-center">
                <div>
                    <CardTitle className="text-2xl">Karma Score Dashboard</CardTitle>
                    <CardDescription>View your karma score over time to track your progress.</CardDescription>
                </div>
                <Select defaultValue="7">
                    <SelectTrigger className="w-[180px]">
                        <SelectValue placeholder="Select period" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="7">Last 7 Days</SelectItem>
                        <SelectItem value="30">Last 30 Days</SelectItem>
                        <SelectItem value="90">Last 90 Days</SelectItem>
                    </SelectContent>
                </Select>
            </CardHeader>
            <CardContent>
                <ChartContainer config={{}} className="h-[300px] w-full">
                    <ResponsiveContainer>
                        <LineChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border) / 0.5)" />
                            <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" tick={{fontSize: 12}} />
                            <YAxis stroke="hsl(var(--muted-foreground))" tick={{fontSize: 12}} />
                            <Tooltip
                                content={<ChartTooltipContent indicator="dot" />}
                                cursor={{ stroke: "hsl(var(--primary))", strokeWidth: 2, strokeDasharray: "3 3" }}
                            />
                            <Line type="monotone" dataKey="score" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 5, fill: "hsl(var(--primary))" }} />
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    );
}
