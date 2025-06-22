"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Lightbulb, BrainCircuit, Sparkles, Heart, Bike } from 'lucide-react';

const wellnessData = [
    { name: "Focus Fuel", value: 80, color: "bg-purple-500", description: "Completing academic tasks", icon: BrainCircuit },
    { name: "Positivity Pulse", value: 65, color: "bg-green-500", description: "Social & emotional well-being", icon: Sparkles },
    { name: "Connection Compass", value: 50, color: "bg-pink-500", description: "Positive social interactions", icon: Heart },
    { name: "Energy Engine", value: 75, color: "bg-orange-500", description: "Physical activities & self-care", icon: Bike },
]

export function WellnessDashboard() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <BrainCircuit /> Wellness Dashboard
                </CardTitle>
                <CardDescription>Track your "Happy Chemical" levels for today based on your activities.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {wellnessData.map(item => (
                        <Card key={item.name} className="p-4">
                            <div className="flex items-start justify-between">
                                <div className="space-y-1">
                                    <h3 className="flex items-center gap-2 font-semibold"><item.icon className="w-5 h-5" /> {item.name}</h3>
                                    <p className="text-xs text-muted-foreground">{item.description}</p>
                                </div>
                                <span className="font-bold text-lg">{item.value}/100</span>
                            </div>
                            <Progress value={item.value} className="mt-3 h-2" indicatorClassName={item.color} />
                        </Card>
                    ))}
                </div>
                 <Alert className="bg-accent/70 border-yellow-500/30">
                    <Lightbulb className="h-4 w-4" />
                    <AlertTitle>Quick Tip</AlertTitle>
                    <AlertDescription>
                        Feeling low on Connection? Try writing a thank-you note or calling a loved one today. Low on Focus? Complete a small task for a quick sense of achievement!
                    </AlertDescription>
                </Alert>
            </CardContent>
        </Card>
    );
}
