"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar } from '@/components/ui/calendar';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { BrainCircuit, Sparkles, Heart, Bike } from 'lucide-react';

const legendItems = [
    { label: "Focus", color: "bg-purple-200", icon: BrainCircuit },
    { label: "Positivity", color: "bg-green-200", icon: Sparkles },
    { label: "Connection", color: "bg-pink-200", icon: Heart },
    { label: "Energy", color: "bg-orange-200", icon: Bike },
]

export function KarmaCalendar() {
    const [date, setDate] = useState<Date | undefined>(new Date());
    
    // Mock data for calendar days
    const moodDays = {
        '2024-07-10': 'bg-green-200',
        '2024-07-15': 'bg-purple-200',
        '2024-07-16': 'bg-purple-200',
        '2024-07-17': 'bg-pink-200',
        '2024-07-22': 'bg-orange-200',
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Daily Reflections Calendar</CardTitle>
                <CardDescription>Visualize your journey. Days are shaded by the predominant "Karma Chemical" from logged activities.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
                 <div className="flex flex-wrap gap-4 items-center justify-center mb-4 p-2 rounded-md bg-muted/50">
                    <span className="text-sm font-semibold">Calendar Legend:</span>
                    {legendItems.map(item => (
                        <div key={item.label} className="flex items-center gap-1.5">
                            <div className={cn("w-3 h-3 rounded-full", item.color)}></div>
                            <span className="text-xs">{item.label}</span>
                        </div>
                    ))}
                </div>
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    className="rounded-md border p-0"
                    modifiers={moodDays}
                    modifiersClassNames={{...Object.fromEntries(
                        Object.entries(moodDays).map(([day, className]) => [day, cn("bg-opacity-50", className)])
                    )}}
                />
            </CardContent>
        </Card>
    );
}
