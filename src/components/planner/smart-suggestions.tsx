"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import type { PlannerTask } from '@/lib/types';
import { Lightbulb, PlusCircle } from 'lucide-react';

const suggestions = [
    { text: "You usually revise Math at 10 AM – plan it again?", task: { time: "10:00 - 11:00 AM", task: "Math Revision", priority: "High" } },
    { text: "You didn’t exercise yesterday – add it today?", task: { time: "6:00 - 7:00 AM", task: "Morning Exercise", priority: "Medium" } },
    { text: "Time for some self-study? Try a new topic.", task: { time: "3:00 - 4:00 PM", task: "Self-Study Physics", priority: "Medium" } },
];

interface SmartSuggestionsProps {
    onAddTask: (task: Omit<PlannerTask, 'id' | 'status'>) => void;
}

export function SmartSuggestions({ onAddTask }: SmartSuggestionsProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Lightbulb /> Suggested Productive Tasks</CardTitle>
                <CardDescription>Based on your habits and goals. Click to add to your planner.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                {suggestions.map((suggestion, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                        <p className="text-sm font-medium">{suggestion.text}</p>
                        <Button variant="ghost" size="sm" onClick={() => onAddTask(suggestion.task)}>
                           <PlusCircle className="mr-2 h-4 w-4"/> Add to Planner
                        </Button>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
