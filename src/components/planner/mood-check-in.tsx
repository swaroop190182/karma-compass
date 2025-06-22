"use client";

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';
import { Laugh, Smile as SmileIcon, Meh, Frown, Angry, Brain } from 'lucide-react';

const feelings = [
  { name: 'Excited', icon: Laugh, colorClass: 'text-yellow-400', hoverClass: 'hover:bg-yellow-400/10 hover:border-yellow-400/50', selectedClass: 'bg-yellow-400/20 border-yellow-500 text-yellow-600 dark:text-yellow-300' },
  { name: 'Happy', icon: SmileIcon, colorClass: 'text-green-500', hoverClass: 'hover:bg-green-500/10 hover:border-green-500/50', selectedClass: 'bg-green-500/20 border-green-600 text-green-600 dark:text-green-400' },
  { name: 'Neutral', icon: Meh, colorClass: 'text-slate-500', hoverClass: 'hover:bg-slate-500/10 hover:border-slate-500/50', selectedClass: 'bg-slate-500/20 border-slate-600 text-slate-600 dark:text-slate-400' },
  { name: 'Sad', icon: Frown, colorClass: 'text-blue-500', hoverClass: 'hover:bg-blue-500/10 hover:border-blue-500/50', selectedClass: 'bg-blue-500/20 border-blue-600 text-blue-600 dark:text-blue-400' },
  { name: 'Stressed', icon: Angry, colorClass: 'text-red-500', hoverClass: 'hover:bg-red-500/10 hover:border-red-500/50', selectedClass: 'bg-red-500/20 border-red-600 text-red-600 dark:text-red-400' },
];

export function MoodCheckIn() {
    const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
    const [motivation, setMotivation] = useState([50]);

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><Brain /> Start Your Day: Mood & Motivation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <label className="text-sm font-medium block mb-4">How are you feeling today?</label>
                    <div className="flex flex-wrap gap-4">
                        {feelings.map(feeling => {
                            const isSelected = selectedFeeling === feeling.name;
                            return (
                                <Button
                                    key={feeling.name}
                                    variant="outline"
                                    onClick={() => setSelectedFeeling(feeling.name)}
                                    className={cn(
                                        "flex-1 sm:flex-auto font-semibold transition-all duration-200 ease-in-out transform hover:scale-105",
                                        !isSelected && feeling.hoverClass,
                                        isSelected ? feeling.selectedClass : 'text-foreground'
                                    )}
                                >
                                    <feeling.icon
                                        className={cn("mr-2 h-5 w-5 transition-colors", !isSelected && feeling.colorClass)}
                                    />
                                    {feeling.name}
                                </Button>
                            )
                        })}
                    </div>
                </div>
                <div>
                    <label htmlFor="motivation-slider" className="text-sm font-medium block mb-2">How motivated do you feel to be productive?</label>
                    <div className="flex items-center gap-4 pt-2">
                        <Slider
                            id="motivation-slider"
                            defaultValue={[50]}
                            max={100}
                            step={1}
                            onValueChange={setMotivation}
                            className="flex-1"
                        />
                         <span className="font-semibold text-lg text-primary w-12 text-center">{motivation}%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
