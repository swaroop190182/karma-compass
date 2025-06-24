
"use client";

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { JournalContext } from '@/hooks/use-journal';
import type { DayEntry } from '@/lib/types';

const JOURNAL_ENTRIES_KEY = 'journal-entries';
const JOURNAL_ACTIVITIES_KEY = 'journal-activities';

export function JournalProvider({ children }: { children: ReactNode }) {
    const [allEntries, setAllEntries] = useState<Record<string, DayEntry>>({});
    const [allActivities, setAllActivities] = useState<Record<string, Record<string, boolean>>>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            const storedEntries = localStorage.getItem(JOURNAL_ENTRIES_KEY);
            if (storedEntries) setAllEntries(JSON.parse(storedEntries));

            const storedActivities = localStorage.getItem(JOURNAL_ACTIVITIES_KEY);
            if (storedActivities) setAllActivities(JSON.parse(storedActivities));
        } catch (error) {
            console.error("Failed to read journal data from localStorage", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const updateJournalEntry = useCallback((date: string, data: Partial<DayEntry>) => {
        setAllEntries(prevAllEntries => {
            const updatedEntry = { ...(prevAllEntries[date] || {}), ...data, date };
            const updatedAllEntries = { ...prevAllEntries, [date]: updatedEntry };
            try {
                localStorage.setItem(JOURNAL_ENTRIES_KEY, JSON.stringify(updatedAllEntries));
            } catch (e) {
                console.error("Failed to save journal entries:", e);
            }
            return updatedAllEntries;
        });
    }, []);
    
    const updateJournalActivities = useCallback((date: string, activities: Record<string, boolean>) => {
        setAllActivities(prevAllActivities => {
            const newAllActivities = { ...prevAllActivities, [date]: activities };
            try {
                localStorage.setItem(JOURNAL_ACTIVITIES_KEY, JSON.stringify(newAllActivities));
            } catch(e) {
                console.error("Failed to save journal activities:", e);
            }
            return newAllActivities;
        });
    }, []);


    const value = { allEntries, allActivities, updateJournalEntry, updateJournalActivities, isLoading };

    return (
        <JournalContext.Provider value={value}>
            {children}
        </JournalContext.Provider>
    );
}
