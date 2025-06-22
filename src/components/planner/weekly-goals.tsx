"use client";

import type React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import type { WeeklyGoal } from '@/lib/types';
import { Target } from 'lucide-react';

interface WeeklyGoalsProps {
    goals: WeeklyGoal[];
    setGoals: React.Dispatch<React.SetStateAction<WeeklyGoal[]>>;
}

export function WeeklyGoals({ goals, setGoals }: WeeklyGoalsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Target /> Weekly Academic & Personal Goals</CardTitle>
                <CardDescription>Track your progress towards your bigger objectives.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
                {goals.map(goal => (
                    <div key={goal.id}>
                        <div className="flex justify-between items-baseline mb-1">
                             <h4 className="font-medium">{goal.title}</h4>
                             <span className="text-sm text-muted-foreground font-semibold">{goal.current}/{goal.target} complete</span>
                        </div>
                        <Progress value={(goal.current / goal.target) * 100} className="h-3" />
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
