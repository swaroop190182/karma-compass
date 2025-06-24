

"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DayPicker, type DayProps, type DayModifiers } from 'react-day-picker';
import { useState, useMemo, useCallback } from 'react';
import { cn } from '@/lib/utils';
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  ClipboardList,
  Heart,
  Smile as SmileIcon,
  Laugh,
  Meh,
  Frown,
  Angry,
  type LucideIcon,
} from 'lucide-react';
import { buttonVariants, Button } from '@/components/ui/button';
import { format, parseISO } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { activities, type Activity } from '@/lib/activities';
import type { DayEntry } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { useJournal } from '@/hooks/use-journal';
import React from 'react';


const activityMap = new Map<string, Activity>(activities.map(a => [a.name, a]));

interface CustomDayProps extends DayProps {
    allEntries: Record<string, DayEntry>;
    allActivities: Record<string, Record<string, boolean>>;
    onDayClick: (day: Date, modifiers: DayModifiers) => void;
    feelingMap: Record<string, { icon: LucideIcon; colorClass: string }>;
}


function CustomDay({ date, displayMonth, allEntries, allActivities, onDayClick, modifiers, feelingMap, ...props }: CustomDayProps) {
    const safeModifiers = modifiers || {};
    const dateString = format(date, 'yyyy-MM-dd');
    const entry = allEntries[dateString];

    const getActivities = (names: Record<string, boolean> | undefined) => {
        if (!names) return [];
        return Object.keys(names).filter(name => names[name]).map(name => activityMap.get(name)).filter(Boolean) as Activity[];
    };
    
    const loggedActs = getActivities(allActivities[dateString]);
    const iconsToShow = loggedActs.slice(0, 3);
    const moreCount = loggedActs.length > 3 ? loggedActs.length - 3 : 0;
    
    const getBackgroundColorClass = () => {
        if (!entry || safeModifiers.outside) return 'bg-stone-50/50 dark:bg-stone-900/10';
        if (entry.score === undefined) return 'bg-stone-50/50 dark:bg-stone-900/10';
        if (entry.score >= 40) return 'bg-green-300/60 dark:bg-green-800/40';
        if (entry.score >= 30) return 'bg-green-200/60 dark:bg-green-800/30';
        if (entry.score >= 20) return 'bg-yellow-200/60 dark:bg-yellow-800/30';
        if (entry.score > 0) return 'bg-yellow-100/60 dark:bg-yellow-800/20';
        return 'bg-red-200/60 dark:bg-red-800/20';
    };

    const isClickable = !!entry && !safeModifiers.outside;

    return (
        <button
            type="button"
            onClick={() => isClickable && onDayClick(date, safeModifiers)}
            className={cn(
                "flex flex-col h-full w-full p-1.5 text-left relative focus:z-10",
                getBackgroundColorClass(),
                safeModifiers.outside && "opacity-40",
                isClickable && "cursor-pointer hover:ring-2 hover:ring-primary",
                !isClickable && !safeModifiers.outside && "cursor-default"
            )}>
            <div className="flex justify-between items-start">
                <span className="text-xs font-medium">{format(date, 'd')}</span>
                <div className="flex items-center gap-1.5">
                    {entry?.feeling && feelingMap[entry.feeling] && (
                         <Tooltip delayDuration={100}>
                            <TooltipTrigger asChild>
                                {React.createElement(feelingMap[entry.feeling].icon, {
                                    className: cn('w-4 h-4', feelingMap[entry.feeling].colorClass),
                                })}
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>{entry.feeling}</p>
                            </TooltipContent>
                        </Tooltip>
                    )}
                    {entry && entry.score !== undefined && (
                        <span className={cn(
                            "font-bold text-xs",
                            entry.score > 0 ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400"
                        )}>
                            {entry.score > 0 ? `+${entry.score}` : entry.score}
                        </span>
                    )}
                </div>
            </div>
            <div className="flex-grow flex items-end w-full">
                {entry ? (
                     <div className="flex items-end gap-1.5 flex-wrap">
                        {iconsToShow.map((activity, i) => (
                            <Tooltip key={i} delayDuration={100}>
                                <TooltipTrigger asChild>
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
                    !safeModifiers.outside && (
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
    const defaultMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
    const [month, setMonth] = useState<Date>(defaultMonth);
    const [selectedDayData, setSelectedDayData] = useState<DayEntry | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    
    const { allEntries, allActivities, isLoading } = useJournal();

    const feelingMap: Record<string, { icon: LucideIcon; colorClass: string }> = {
        'Radiant': { icon: Laugh, colorClass: 'text-yellow-400' },
        'Happy': { icon: SmileIcon, colorClass: 'text-green-500' },
        'Neutral': { icon: Meh, colorClass: 'text-slate-500' },
        'Sad': { icon: Frown, colorClass: 'text-blue-500' },
        'Stressed': { icon: Angry, colorClass: 'text-red-500' },
    };

    const handleDayClick = useCallback((day: Date, modifiers: DayModifiers) => {
        if (modifiers.outside) {
            return;
        }
        const dateString = format(day, 'yyyy-MM-dd');
        const entry = allEntries[dateString];
        if (entry) {
            setSelectedDayData({ ...entry, date: dateString });
            setIsDialogOpen(true);
        }
    }, [allEntries]);
    
    const { goodActivities, badActivities } = useMemo(() => {
        if (!selectedDayData?.date) return { goodActivities: [], badActivities: [] };
        
        const activitiesForDay = allActivities[selectedDayData.date] || {};
        const loggedActivitiesList = Object.keys(activitiesForDay)
            .filter(key => activitiesForDay[key])
            .map(name => activityMap.get(name))
            .filter(Boolean) as Activity[];
            
        const good = loggedActivitiesList.filter(a => a.type === 'Good');
        const bad = loggedActivitiesList.filter(a => a.type === 'Bad');

        return { goodActivities: good, badActivities: bad };
    }, [selectedDayData, allActivities]);


    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <Skeleton className="h-8 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-[500px] w-full" />
                </CardContent>
            </Card>
        );
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
                            cell: 'w-[calc(100%/7)] h-28 lg:h-32 text-left align-top relative border border-border/80 p-0', // Remove padding from cell
                            day_today: 'ring-2 ring-primary ring-offset-2',
                            day_outside: 'text-muted-foreground/50',
                        }}
                        components={{
                            IconLeft: () => <ChevronLeft className="h-5 w-5" />,
                            IconRight: () => <ChevronRight className="h-5 w-5" />,
                            Day: (props) => (
                                <CustomDay 
                                    {...props} 
                                    allEntries={allEntries} 
                                    allActivities={allActivities}
                                    onDayClick={handleDayClick} 
                                    feelingMap={feelingMap}
                                />
                            )
                        }}
                    />
                </CardContent>
            </Card>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-lg">
                    {selectedDayData && (
                        <>
                            <DialogHeader>
                                <DialogTitle className="text-2xl font-bold">Daily Summary: {format(parseISO(selectedDayData.date!), 'MMMM d, yyyy')}</DialogTitle>
                                <DialogDescription>
                                    A recap of your activities, goals, and reflections for this day.
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
                                {selectedDayData.feeling && (
                                     <div>
                                        <h3 className="flex items-center gap-2 text-lg font-semibold">
                                            <Heart className="w-5 h-5 text-pink-500"/>
                                            Mood
                                        </h3>
                                        <div className="flex items-center gap-2 mt-2 pl-1">
                                            {feelingMap[selectedDayData.feeling] && React.createElement(feelingMap[selectedDayData.feeling].icon, {
                                                className: cn("w-6 h-6", feelingMap[selectedDayData.feeling].colorClass)
                                            })}
                                            <p className="font-semibold text-foreground">{selectedDayData.feeling}</p>
                                        </div>
                                    </div>
                                )}
                                {selectedDayData.reflections && (
                                    <>
                                        <Separator />
                                        <div>
                                            <h3 className="flex items-center gap-2 text-lg font-semibold">
                                                <BookOpen className="w-5 h-5" />
                                                Reflection
                                            </h3>
                                            <blockquote className="text-muted-foreground mt-2 text-sm italic border-l-2 pl-4">
                                                {selectedDayData.reflections}
                                            </blockquote>
                                        </div>
                                    </>
                                )}
                                <Separator />
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <ClipboardList className="w-5 h-5" />
                                        Karma Breakdown (Total Score: <span className={cn('font-bold', selectedDayData.score && selectedDayData.score >= 0 ? "text-green-600" : "text-red-600")}>{selectedDayData.score && selectedDayData.score >= 0 ? `+${selectedDayData.score}` : selectedDayData.score ?? 'N/A'}</span>)
                                    </h3>
                                    
                                    {goodActivities.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="font-medium text-green-700 dark:text-green-400">Positive Activities</h4>
                                            <ul className="list-disc list-inside space-y-1 mt-1 pl-2">
                                                {goodActivities.map(activity => (
                                                    <li key={activity.name} className="text-sm text-muted-foreground">
                                                        {activity.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                    
                                    {badActivities.length > 0 && (
                                        <div className="mt-4">
                                            <h4 className="font-medium text-red-700 dark:text-red-400">Activities to Reconsider</h4>
                                            <ul className="list-disc list-inside space-y-1 mt-1 pl-2">
                                                {badActivities.map(activity => (
                                                    <li key={activity.name} className="text-sm text-muted-foreground">
                                                        {activity.name}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}

                                    {(goodActivities.length === 0 && badActivities.length === 0) && (
                                        <p className="text-sm text-muted-foreground mt-4">No activities were logged for this day.</p>
                                    )}
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-end pt-4 border-t">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
}
