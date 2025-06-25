
"use client";

import { createContext, useContext } from 'react';

interface TimerContextType {
    remainingTime: number;
}

export const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function useTimer() {
    const context = useContext(TimerContext);
    if (context === undefined) {
        throw new Error('useTimer must be used within a TimerProvider');
    }
    return context;
}
