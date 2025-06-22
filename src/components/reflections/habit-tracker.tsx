"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { CheckSquare } from 'lucide-react';

const habits = [
  { id: 'habit1', label: 'Woke up on time' },
  { id: 'habit2', label: 'Completed all homework' },
  { id: 'habit3', label: 'Limited screen time' },
  { id: 'habit4', label: 'Exercised for 30 mins' },
  { id: 'habit5', label: 'Read a book chapter' },
];

export function HabitTracker() {
    return (
        <Card className="h-full">
            <CardHeader>
                <CardTitle className="flex items-center gap-3">
                    <CheckSquare /> Habit Tracker
                </CardTitle>
                <CardDescription>Select habits to track for the week.</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {habits.map(habit => (
                        <div key={habit.id} className="flex items-center space-x-3">
                            <Checkbox id={habit.id} />
                            <Label htmlFor={habit.id} className="text-sm font-medium leading-none">
                                {habit.label}
                            </Label>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
