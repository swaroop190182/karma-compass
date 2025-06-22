"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Leaf, Smile, Trophy, ArrowRight } from 'lucide-react';

const moods = [
    { day: "M", mood: "happy" },
    { day: "T", mood: "happy" },
    { day: "W", mood: "neutral" },
    { day: "T", mood: null },
    { day: "F", mood: null },
    { day: "S", mood: null },
    { day: "S", mood: null },
]

export function GamificationCentral() {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3 text-2xl">
                    <Trophy className="text-yellow-500" /> Gamification Central
                </CardTitle>
                <CardDescription>Track your progress, earn badges, and see your well-being grow.</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-500/10 border-green-500/30">
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg gap-2"><Leaf /> Your Growth Tree</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <Leaf className="w-16 h-16 text-green-600 mx-auto" />
                        <p className="font-bold text-lg mt-2">New Sprout</p>
                        <p className="text-sm text-muted-foreground">2 reflection entries logged.</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg gap-2"><Smile /> Weekly Mood Meter</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex justify-between items-center">
                            {moods.map((m, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <span className="text-xs text-muted-foreground">{m.day}</span>
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${m.mood ? 'bg-primary/20' : 'bg-muted/50'}`}>
                                        {m.mood && <Smile className="w-5 h-5 text-primary" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-semibold mt-4">Moods Tracked This Week: 2 / 7</p>
                        <Progress value={(2/7)*100} className="mt-2 h-2" />
                        <p className="text-xs text-muted-foreground mt-2">Track another 5 day(s) to unlock a reward!</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center text-lg gap-2"><Trophy /> My Badges</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center justify-center">
                        <div className="w-24 h-24 rounded-lg border-2 border-dashed flex items-center justify-center bg-muted/20">
                            <span className="text-4xl font-bold">0</span>
                        </div>
                        <Button variant="outline" size="sm" className="mt-4">
                            View All Badges <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}
