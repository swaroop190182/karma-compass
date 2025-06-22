"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';

export function WeeklyRanking() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <Users /> Weekly Karma Ranking
                </CardTitle>
                <CardDescription>See how your karma compares with others this week.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center space-y-4 text-center">
                 <div className="flex items-baseline gap-2">
                    <span className="text-sm text-muted-foreground">Your Weekly Karma Score:</span>
                    <p className="text-4xl font-bold text-primary">119</p>
                 </div>
                 <div className="text-lg">
                    <p>Your Rank: <span className="font-bold text-primary">#572</span> out of <span className="font-bold">1831</span></p>
                    <p className="text-sm text-muted-foreground">Keep building your karma rank!</p>
                 </div>
            </CardContent>
        </Card>
    );
}
