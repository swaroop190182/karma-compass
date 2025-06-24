
"use client";

import { createContext, useContext } from 'react';
import type { DayEntry } from '@/lib/types';

interface JournalContextType {
    allEntries: Record<string, DayEntry>;
    allActivities: Record<string, Record<string, boolean>>;
    updateJournalEntry: (date: string, data: Partial<DayEntry>) => void;
    updateJournalActivities: (date: string, activities: Record<string, boolean>) => void;
    isLoading: boolean;
}

export const JournalContext = createContext<JournalContextType | undefined>(undefined);

export function useJournal() {
    const context = useContext(JournalContext);
    if (context === undefined) {
        throw new Error('useJournal must be used within a JournalProvider');
    }
    return context;
}
