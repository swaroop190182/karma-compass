
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DayPicker, type DayProps } from 'react-day-picker';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, BookOpen, ClipboardList } from 'lucide-react';
import { buttonVariants, Button } from '@/components/ui/button';
import { format, isSameDay, parseISO } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { activities, type Activity } from '@/lib/activities';

const activityMap = new Map<string, Activity>(activities.map(a => [a.name, a]));

interface DayEntry {
    date: string;
    score: number;
    loggedActivities: string[];
    reflection?: string;
}

const mockData: DayEntry[] = [
    { date: '2025-06-10', score: 32, loggedActivities: ['Journal', 'Gratitude', 'Meditate', 'Exercise', 'Smile', 'Help Classmate', 'Be Kind' ], reflection: '' },
    { date: '2025-06-18', score: 25, loggedActivities: ['Take Notes', 'Music', 'Meditate', 'Homework'], reflection: 'Felt productive today, especially during the music session. It helped me focus.' },
    { date: '2025-06-19', score: 29, loggedActivities: ['Take Notes', 'Organize', 'Meditate', 'Homework', 'Read Books'], reflection: '' },
    { date: '2025-06-20', score: 40, loggedActivities: ['Classes', 'Homework', 'Test Prep', 'Take Notes', 'Participate'], reflection: 'A very busy but good academic day.' },
    { date: '2025-06-21', score: 10, loggedActivities: ['Exercise', 'Hydrate'], reflection: '' },
    { date: '2025-06-03', score: -12, loggedActivities: ['Skip Class', 'Oversleep'], reflection: 'Felt really bad today. Need to do better tomorrow.' },
];

function CustomDay({ date, modifiers, buttonProps }: DayProps) {
    const entry = mockData.find(d => isSameDay(parseISO(d.date), date));

    const getActivities = (names: string[] | undefined) => {
        if (!names) return [];
        return names.map(name => activityMap.get(name)).filter(Boolean) as Activity[];
    };
    
    const loggedActs = getActivities(entry?.loggedActivities);
    const iconsToShow = loggedActs.slice(0, 3);
    const moreCount = loggedActs.length > 3 ? loggedActs.length - 3 : 0;
    
    const getBackgroundColorClass = () => {
        if (!entry || (modifiers && modifiers.outside)) return 'bg-stone-50/50 dark:bg-stone-900/10';
        if (entry.score >= 40) return 'bg-green-300/60 dark:bg-green-800/40';
        if (entry.score >= 30) return 'bg-green-200/60 dark:bg-green-800/30';
        if (entry.score >= 20) return 'bg-yellow-200/60 dark:bg-yellow-800/30';
        if (entry.score > 0) return 'bg-yellow-100/60 dark:bg-yellow-800/20';
        return 'bg-red-200/60 dark:bg-red-800/20';
    };

    return (
        <button
            {...buttonProps}
            type="button"
            className={cn(
                "flex flex-col h-full w-full p-1.5 text-left relative",
                getBackgroundColorClass(), 
                modifiers?.outside && "opacity-40",
                !modifiers?.disabled && "cursor-pointer hover:ring-2 hover:ring-primary z-10",
                modifiers?.disabled && !modifiers?.outside && "cursor-default"
            )}>
            <div className="flex justify-between items-start">
                <span className="text-xs font-medium">{format(date, 'd')}</span>
                {entry && (
                    <span className={cn(
                        "font-bold text-xs",
                        entry.score > 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                    )}>
                        {entry.score > 0 ? `+${entry.score}` : entry.score}
                    </span>
                )}
            </div>
            <div className="flex-grow flex items-end w-full">
                {entry ? (
                     <div className="flex items-end gap-1.5 flex-wrap">
                        {iconsToShow.map((activity, i) => (
                            <Tooltip key={i} delayDuration={100}>
                                <TooltipTrigger>
                                    <activity.icon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>{activity.name}</p>
                                </TooltipContent>
                            </Tooltip>
                        ))}
                        {moreCount > 0 && (
                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">+{moreCount}</span>
                        )}
                    </div>
                ) : (
                    !modifiers?.outside && (
                        <div className="flex items-center justify-center w-full h-full -mt-4">
                            <span className="text-[10px] text-muted-foreground/80">No entries</span>
                        </div>
                    )
                )}
            </div>
        </button>
    )
}

export function KarmaCalendar() {
    const defaultMonth = new Date('2025-06-01');
    const [month, setMonth] = useState<Date>(defaultMonth);
    const [selectedDayData, setSelectedDayData] = useState<DayEntry | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const handleDayClick = (day: Date) => {
        const entry = mockData.find(d => isSameDay(parseISO(d.date), day));
        if (entry) {
            setSelectedDayData(entry);
            setIsDialogOpen(true);
        }
    }

    return (
        <TooltipProvider>
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Daily Reflections Calendar</CardTitle>
                    <CardDescription>Visualize your journey. Click a day to see details. Days are shaded by Karma score.</CardDescription>
                </CardHeader>
                <CardContent>
                    <DayPicker
                        month={month}
                        onMonthChange={setMonth}
                        onDayClick={handleDayClick}
                        showOutsideDays
                        fixedWeeks
                        classNames={{
                            root: 'w-full',
                            caption: 'flex justify-center items-center h-12 relative mb-2',
                            caption_label: 'text-xl font-bold',
                            nav: 'flex items-center',
                            nav_button: cn(buttonVariants({ variant: 'outline', size: 'icon' }), 'h-9 w-9'),
                            nav_button_previous: 'absolute left-0',
                            nav_button_next: 'absolute right-0',
                            table: 'w-full border-collapse',
                            head_row: 'flex',
                            head_cell: 'w-[calc(100%/7)] pb-2 text-sm font-semibold text-muted-foreground text-center',
                            row: 'flex w-full',
                            cell: 'w-[calc(100%/7)] h-28 lg:h-32 text-left align-top relative border border-border/80',
                            day_today: 'ring-2 ring-primary ring-offset-2',
                            day_outside: 'text-muted-foreground/50',
                        }}
                        components={{
                            IconLeft: () => <ChevronLeft className="h-5 w-5" />,
                            IconRight: () => <ChevronRight className="h-5 w-5" />,
                            Day: CustomDay
                        }}
                        modifiers={{
                           disabled: (date) => !mockData.some(d => isSameDay(parseISO(d.date), date))
                        }}
                    />
                </CardContent>
            </Card>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    {selectedDayData && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">Daily Summary: {format(parseISO(selectedDayData.date), 'MMMM d, yyyy')}</DialogTitle>
                                <DialogDescription>
                                    A recap of your activities, goals, and reflections for this day.
                                </DialogDescription>
                            </DialogHeader>
                            <Separator />
                            <div className="space-y-4 py-2">
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <BookOpen className="w-5 h-5" />
                                        Reflection
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-sm">
                                        {selectedDayData.reflection || "No reflection logged for this day."}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <ClipboardList className="w-5 h-5" />
                                        Karma Activities (Score: <span className={cn(selectedDayData.score > 0 ? "text-green-600" : "text-red-600")}>{selectedDayData.score > 0 ? `+${selectedDayData.score}` : selectedDayData.score}</span>)
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 mt-2 pl-2">
                                        {selectedDayData.loggedActivities.map(name => {
                                            const activity = activityMap.get(name);
                                            if (!activity) return null;
                                            return (
                                                <li key={name} className={cn("text-sm", activity.type === 'Good' ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400")}>
                                                    {activity.name}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-between pt-4">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                                <Button>Edit/Add Reflection Text</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
}
