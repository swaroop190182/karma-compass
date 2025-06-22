
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DayPicker, type DayProps, type DayModifiers } from 'react-day-picker';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { format, isSameDay, parseISO } from 'date-fns';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { activities, type Activity } from '@/lib/activities';

const activityMap = new Map<string, Activity>(activities.map(a => [a.name, a]));

interface DayEntry {
    date: string;
    score: number;
    loggedActivities: string[];
}

const mockData: DayEntry[] = [
    { date: '2025-06-10', score: 32, loggedActivities: ['Take Notes', 'Organize', 'Hobby', 'Wake Early', 'Hydrate', 'Journal', 'No Screen', 'Gratitude', 'Help Classmate', 'Be Kind' ] },
    { date: '2025-06-18', score: 25, loggedActivities: ['Take Notes', 'Music', 'Meditate', 'Homework'] },
    { date: '2025-06-19', score: 29, loggedActivities: ['Take Notes', 'Organize', 'Meditate', 'Homework', 'Read Books'] },
    { date: '2025-06-20', score: 40, loggedActivities: ['Classes', 'Homework', 'Test Prep', 'Take Notes', 'Participate'] },
    { date: '2025-06-21', score: 10, loggedActivities: ['Exercise', 'Hydrate'] },
    { date: '2025-06-03', score: -12, loggedActivities: ['Skip Class', 'Oversleep'] },
];

function CustomDay(props: DayProps) {
    const { date, displayMonth, modifiers } = props;
    const entry = mockData.find(d => isSameDay(parseISO(d.date), date));
    const isOutside = date.getMonth() !== displayMonth.getMonth();

    const getActivities = (names: string[] | undefined) => {
        if (!names) return [];
        return names.map(name => activityMap.get(name)).filter(Boolean) as Activity[];
    };
    
    const loggedActs = getActivities(entry?.loggedActivities);
    const iconsToShow = loggedActs.slice(0, 3);
    const moreCount = loggedActs.length > 3 ? loggedActs.length - 3 : 0;

    return (
        <div className={cn(
            "flex flex-col h-full p-1.5", 
            isOutside && "opacity-40",
            modifiers && !modifiers.empty && "cursor-pointer hover:bg-accent/80 transition-colors"
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
                    <div className="flex items-center justify-center w-full h-full -mt-4">
                        <span className="text-[10px] text-muted-foreground/80">No entries</span>
                    </div>
                )}
            </div>
        </div>
    )
}

export function KarmaCalendar() {
    const defaultMonth = new Date('2025-05-28');
    const [month, setMonth] = useState<Date>(defaultMonth);
    const [selectedDayData, setSelectedDayData] = useState<DayEntry | null>(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const scoreModifiers = mockData.reduce((acc, entry) => {
        const key = `score_modifier_${entry.date}`;
        acc[key] = [parseISO(entry.date)];
        return acc;
    }, {} as Record<string, Date[]>);

    const scoreModifierClassNames = mockData.reduce((acc, entry) => {
        const key = `score_modifier_${entry.date}`;
        if (entry.score >= 40) acc[key] = 'bg-green-300/60 dark:bg-green-800/40';
        else if (entry.score >= 30) acc[key] = 'bg-green-200/60 dark:bg-green-800/30';
        else if (entry.score >= 20) acc[key] = 'bg-yellow-200/60 dark:bg-yellow-800/30';
        else if (entry.score > 0) acc[key] = 'bg-yellow-100/60 dark:bg-yellow-800/20';
        else acc[key] = 'bg-red-200/60 dark:bg-red-800/20';
        return acc;
    }, {} as Record<string, string>);
    
    const handleDayClick = (day: Date, modifiers: DayModifiers) => {
        if (modifiers?.empty || modifiers?.disabled) return;
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
                            cell: 'w-[calc(100%/7)] h-28 lg:h-32 text-left align-top relative border border-border/80 has-[[aria-selected]]:bg-accent',
                            day_today: 'ring-2 ring-primary ring-offset-2',
                            day_outside: 'text-muted-foreground/50',
                            day_selected: '',
                        }}
                        components={{
                            IconLeft: () => <ChevronLeft className="h-5 w-5" />,
                            IconRight: () => <ChevronRight className="h-5 w-5" />,
                            Day: CustomDay
                        }}
                        modifiers={{
                            ...scoreModifiers,
                            saturdays: { dayOfWeek: [6] },
                            sundays: { dayOfWeek: [0] },
                            empty: (date) => !mockData.some(d => isSameDay(parseISO(d.date), date))
                        }}
                        modifiersClassNames={{
                            ...scoreModifierClassNames,
                            saturdays: 'bg-purple-50/50 dark:bg-purple-900/10',
                            sundays: 'bg-pink-50/50 dark:bg-pink-900/10',
                            empty: 'bg-stone-50/50 dark:bg-stone-900/10'
                        }}
                    />
                </CardContent>
            </Card>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    {selectedDayData && (
                        <>
                            <DialogHeader>
                                <DialogTitle>Reflection for {format(parseISO(selectedDayData.date), 'PPP')}</DialogTitle>
                                <DialogDescription className="pt-2">
                                    <span className={cn(
                                        "font-bold text-lg",
                                        selectedDayData.score > 0 ? "text-green-600" : "text-red-600"
                                    )}>
                                        Karma Score: {selectedDayData.score > 0 ? `+${selectedDayData.score}` : selectedDayData.score}
                                    </span>
                                </DialogDescription>
                            </DialogHeader>
                            <div className="space-y-3 py-2">
                                <h4 className="font-semibold text-foreground">Activities Logged:</h4>
                                <div className="space-y-2 max-h-60 overflow-y-auto pr-3">
                                    {selectedDayData.loggedActivities.length > 0 ?
                                     selectedDayData.loggedActivities.map(name => {
                                        const activity = activityMap.get(name);
                                        if (!activity) return null;
                                        return (
                                            <div key={name} className={cn("flex items-center gap-2 text-sm p-2 rounded-md", activity.type === 'Good' ? "bg-green-500/10 text-green-800 dark:text-green-300" : "bg-red-500/10 text-red-800 dark:text-red-300")}>
                                                <activity.icon className="w-4 h-4 flex-shrink-0" />
                                                <span>{activity.name}</span>
                                            </div>
                                        );
                                    }) : <p className="text-muted-foreground text-sm">No activities were logged this day.</p>}
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </TooltipProvider>
    );
}
