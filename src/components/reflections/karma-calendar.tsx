
"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DayPicker, type DayProps } from 'react-day-picker';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, NotebookText, Palette, Music, BrainCircuit, Dumbbell, Package } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import { format, isSameDay, parseISO } from 'date-fns';
import type { LucideIcon } from 'lucide-react';

interface DayEntry {
    date: string;
    score: number;
    icons: LucideIcon[];
    moreCount: number;
}

const mockData: DayEntry[] = [
    { date: '2025-06-10', score: 32, icons: [NotebookText, Package, Palette], moreCount: 11 },
    { date: '2025-06-18', score: 25, icons: [NotebookText, Music, BrainCircuit], moreCount: 4 },
    { date: '2025-06-19', score: 29, icons: [NotebookText, Package, BrainCircuit], moreCount: 4 },
    { date: '2025-06-20', score: 40, icons: [], moreCount: 0 },
    { date: '2025-06-21', score: 10, icons: [Dumbbell], moreCount: 0 },
    { date: '2025-06-03', score: -12, icons: [Dumbbell], moreCount: 0 },
];

function CustomDay(props: DayProps) {
    const { date, displayMonth } = props;
    const entry = mockData.find(d => isSameDay(parseISO(d.date), date));
    const isOutside = date.getMonth() !== displayMonth.getMonth();

    return (
        <div className={cn("flex flex-col h-full p-1.5", isOutside && "opacity-40")}>
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
                        {entry.icons.map((Icon, i) => <Icon key={i} className="w-4 h-4 text-gray-700 dark:text-gray-300" />)}
                        {entry.moreCount > 0 && (
                            <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400">+{entry.moreCount}</span>
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
    const defaultMonth = new Date('2025-05-28'); // Start a bit earlier to show June 2025
    const [month, setMonth] = useState<Date>(defaultMonth);

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

    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-2xl">Daily Reflections Calendar</CardTitle>
                <CardDescription>Visualize your journey. Days are shaded based on your Karma score.</CardDescription>
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
    );
}
