
"use client";

import { useTimer } from "@/hooks/use-timer";
import { cn } from "@/lib/utils";
import { Timer as TimerIcon } from "lucide-react";

export function AppUsageTimer() {
    const { remainingTime } = useTimer();

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    const isRunningLow = remainingTime <= 5 * 60; // Less than 5 minutes

    return (
        <div 
            id="app-usage-timer"
            className={cn(
                "flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold border border-border transition-colors",
                isRunningLow && "bg-destructive/20 text-destructive border-destructive/30"
            )}
        >
            <TimerIcon className="h-5 w-5" />
            <span>
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
        </div>
    );
}
