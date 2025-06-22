"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import type { PlannerTask } from '@/lib/types';
import { CheckSquare, Moon } from 'lucide-react';
import { useMemo } from 'react';

interface EveningReflectionProps {
    tasks: PlannerTask[];
}

export function EveningReflection({ tasks }: EveningReflectionProps) {

    const completionStats = useMemo(() => {
        const totalTasks = tasks.length;
        if (totalTasks === 0) return { percent: 0, done: 0 };
        const doneTasks = tasks.filter(t => t.status === 'Done').length;
        return {
            percent: Math.round((doneTasks / totalTasks) * 100),
            done: doneTasks
        };
    }, [tasks]);

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Moon /> Reflect on Your Day</CardTitle>
                    <CardDescription>Review what you accomplished and what you can improve.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <h4 className="font-semibold text-lg mb-2">Task Completion</h4>
                        <div className="flex items-center gap-4 p-4 bg-muted/50 rounded-lg">
                             <div className="flex-shrink-0">
                                <span className="text-4xl font-bold text-primary">{completionStats.percent}%</span>
                            </div>
                            <p className="text-muted-foreground">You completed <span className="font-bold text-foreground">{completionStats.done}</span> of <span className="font-bold text-foreground">{tasks.length}</span> planned tasks today.
                            </p>
                        </div>
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-2">What worked well today?</label>
                        <Textarea placeholder="e.g., I focused well during my math revision..." rows={3} />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-2">What was distracting?</label>
                        <Textarea placeholder="e.g., I spent too much time on social media..." rows={3} />
                    </div>
                </CardContent>
            </Card>

             <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><CheckSquare /> Karma Score Breakdown</CardTitle>
                    <CardDescription>How today's actions affected your score.</CardDescription>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-2 text-sm">
                        <li className="flex justify-between items-center text-green-600"><span>Completed 4 study sessions</span> <span>+5</span></li>
                        <li className="flex justify-between items-center text-green-600"><span>No distractions during focus time</span> <span>+3</span></li>
                         <li className="flex justify-between items-center text-red-600"><span>Skipped 1 planned session</span> <span>-2</span></li>
                         <li className="border-t my-2 pt-2 flex justify-between items-center font-bold text-base"><span>Today's Total</span> <span>+6</span></li>
                    </ul>
                </CardContent>
            </Card>
        </div>
    );
}
