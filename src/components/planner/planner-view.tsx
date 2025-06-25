
"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import type { PlannerTask } from "@/lib/types";
import { cn } from "@/lib/utils";

// Parses "9:00 AM" into total minutes from midnight. Returns null on failure.
const parseTime = (timeStr: string): number | null => {
    const match = timeStr.match(/(\d{1,2}):?(\d{2})?\s*(am|pm)/i);
    if (!match) return null;
    
    let [_, hours, minutes, meridiem] = match;
    let h = parseInt(hours, 10);
    const m = minutes ? parseInt(minutes, 10) : 0;
    
    if (isNaN(h) || isNaN(m)) return null;
    
    if (meridiem.toLowerCase() === 'pm' && h < 12) h += 12;
    if (meridiem.toLowerCase() === 'am' && h === 12) h = 0; // 12 AM is 00:00
    
    return h * 60 + m;
};

// Parses "9:00 AM - 10:30 AM" into start and end minutes.
const parseRange = (rangeStr: string): { start: number; end: number } | null => {
    const parts = rangeStr.split('-').map(s => s.trim());
    if (parts.length !== 2) return null;

    const endStr = parts[1];
    let startStr = parts[0];

    const endMeridiemMatch = endStr.match(/am|pm/i);
    if (!endMeridiemMatch) return null; // End time must have AM/PM
    const endMeridiem = endMeridiemMatch[0];

    // If start time has no AM/PM, infer from end time.
    if (!/am|pm/i.test(startStr)) {
        startStr += ` ${endMeridiem}`;
    }

    const start = parseTime(startStr);
    const end = parseTime(endStr);
    
    if (start === null || end === null || start >= end) {
        return null;
    }

    return { start, end };
};


interface PlannerViewProps {
    tasks: PlannerTask[];
    onSelectTask: (task: PlannerTask) => void;
}

export function PlannerView({ tasks, onSelectTask }: PlannerViewProps) {
    const hours = Array.from({ length: 18 }, (_, i) => i + 6); // 6 AM to 11 PM

    const hourHeight = 60; // 60px per hour
    const calendarStartMinutes = 6 * 60;

    const priorityColors = {
        High: 'bg-red-500/20 border-l-4 border-red-500 text-red-900 dark:text-red-200',
        Medium: 'bg-blue-500/20 border-l-4 border-blue-500 text-blue-900 dark:text-blue-200',
        Low: 'bg-yellow-500/20 border-l-4 border-yellow-500 text-yellow-900 dark:text-yellow-200',
    }

    return (
        <ScrollArea className="flex-1">
            <div className="flex p-4">
                {/* Time gutter */}
                <div className="w-16 text-right pr-4">
                    {hours.map(hour => (
                        <div key={hour} className="h-[60px] text-xs text-muted-foreground relative -top-2">
                            {hour === 12 ? '12 PM' : hour > 12 ? `${hour - 12} PM` : `${hour} AM`}
                        </div>
                    ))}
                </div>
                {/* Grid */}
                <div className="flex-1 relative">
                    {/* Horizontal lines */}
                    {hours.map(hour => (
                        <div key={hour} className="h-[60px] border-t border-border"></div>
                    ))}
                    {/* Tasks */}
                    {tasks.map(task => {
                        const range = parseRange(task.time);
                        if (!range) return null;

                        const top = ((range.start - calendarStartMinutes) / 60) * hourHeight;
                        const height = ((range.end - range.start) / 60) * hourHeight - 2; // -2 for small gap
                        
                        if (top < 0 || (top + height) > (hours.length * hourHeight)) return null;

                        return (
                            <div
                                key={task.id}
                                className={cn(
                                    "absolute left-2 right-2 p-2 rounded-md cursor-pointer transition-all hover:ring-2 hover:ring-primary/50",
                                    priorityColors[task.priority]
                                )}
                                style={{ top: `${top}px`, height: `${height}px` }}
                                onClick={() => onSelectTask(task)}
                            >
                                <p className="font-semibold text-sm truncate">{task.task}</p>
                                <p className="text-xs opacity-80">{task.time}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </ScrollArea>
    );
}

