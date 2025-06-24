
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DayPicker, type DayProps } from 'react-day-picker';
import { useState, useMemo } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, BookOpen, ClipboardList } from 'lucide-react';
import { buttonVariants, Button } from '@/components/ui/button';
import { format, isSameDay, parseISO } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Separator } from '@/components/ui/separator';
import { activities, type Activity } from '@/lib/activities';
import type { DayEntry } from '@/lib/types';
import { Skeleton } from '../ui/skeleton';
import { useJournal } from '@/hooks/use-journal';


const activityMap = new Map<string, Activity>(activities.map(a => [a.name, a]));

function CustomDay({ date, displayMonth, allEntries = {}, allActivities = {}, ...props }: DayProps & { allEntries: Record<string, DayEntry>, allActivities: Record<string, Record<string, boolean>> }) {
    const dateString = format(date, 'yyyy-MM-dd');
    const entry = allEntries[dateString];
    const activitiesForDay = allActivities[dateString];

    const modifiers = props.modifiers || {};
    const buttonProps = props.buttonProps || {};

    const getActivities = (names: Record<string, boolean> | undefined) => {
        if (!names) return [];
        return Object.keys(names).filter(name => names[name]).map(name => activityMap.get(name)).filter(Boolean) as Activity[];
    };
    
    const loggedActs = getActivities(activitiesForDay);
    const iconsToShow = loggedActs.slice(0, 3);
    const moreCount = loggedActs.length > 3 ? loggedActs.length - 3 : 0;
    
    const getBackgroundColorClass = () => {
        if (!entry || (modifiers && modifiers.outside)) return 'bg-stone-50/50 dark:bg-stone-900/10';
        if (entry.score === undefined) return 'bg-stone-50/50 dark:bg-stone-900/10';
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
                modifiers.outside && "opacity-40",
                entry && !modifiers.outside && "cursor-pointer hover:ring-2 hover:ring-primary z-10",
                !entry && !modifiers.outside && "cursor-default"
            )}>
            <div className="flex justify-between items-start">
                <span className="text-xs font-medium">{format(date, 'd')}</span>
                {entry && entry.score !== undefined && (
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
                    !modifiers.outside && (
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

    const handleDayClick = (day: Date) => {
        const dateString = format(day, 'yyyy-MM-dd');
        const entry = allEntries[dateString];
        if (entry) {
            setSelectedDayData({ ...entry, date: dateString });
            setIsDialogOpen(true);
        }
    }
    
    const selectedDayActivities = useMemo(() => {
        if (!selectedDayData?.date) return [];
        const activitiesForDay = allActivities[selectedDayData.date] || {};
        return Object.keys(activitiesForDay)
            .filter(key => activitiesForDay[key])
            .map(name => activityMap.get(name))
            .filter(Boolean) as Activity[];
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
                            Day: (props) => <CustomDay {...props} allEntries={allEntries} allActivities={allActivities} />
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
                            <Separator />
                            <div className="space-y-4 py-2 max-h-[60vh] overflow-y-auto">
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <BookOpen className="w-5 h-5" />
                                        Reflection
                                    </h3>
                                    <p className="text-muted-foreground mt-2 text-sm">
                                        {selectedDayData.reflections || "No reflection logged for this day."}
                                    </p>
                                </div>
                                <Separator />
                                <div>
                                    <h3 className="flex items-center gap-2 text-lg font-semibold">
                                        <ClipboardList className="w-5 h-5" />
                                        Karma Activities (Score: <span className={cn(selectedDayData.score && selectedDayData.score > 0 ? "text-green-600" : "text-red-600")}>{selectedDayData.score && selectedDayData.score > 0 ? `+${selectedDayData.score}` : selectedDayData.score || 'N/A'}</span>)
                                    </h3>
                                    <ul className="list-disc list-inside space-y-1 mt-2 pl-2">
                                        {selectedDayActivities.length > 0 ? selectedDayActivities.map(activity => (
                                            <li key={activity.name} className={cn("text-sm", activity.type === 'Good' ? "text-green-700 dark:text-green-400" : "text-red-700 dark:text-red-400")}>
                                                {activity.name}
                                            </li>
                                        )) : <p className="text-sm text-muted-foreground">No activities logged.</p>}
                                    </ul>
                                </div>
                            </div>
                            <DialogFooter className="sm:justify-between pt-4">
                                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Close</Button>
                            </DialogFooter>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
}
