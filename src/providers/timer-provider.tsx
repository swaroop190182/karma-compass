
"use client";

import { useState, useEffect, type ReactNode, useMemo } from 'react';
import { TimerContext } from '@/hooks/use-timer';
import { TimeUpOverlay } from '@/components/time-up-overlay';

const SESSION_END_TIME_KEY = 'karma-session-end-time';
const SESSION_DATE_KEY = 'karma-session-date';
const SESSION_DURATION = 15 * 60 * 1000; // 15 minutes in milliseconds

export function TimerProvider({ children }: { children: ReactNode }) {
    const [remainingTime, setRemainingTime] = useState(SESSION_DURATION / 1000);
    const [isSessionActive, setIsSessionActive] = useState(true);

    useEffect(() => {
        const todayString = new Date().toDateString();
        const storedDate = localStorage.getItem(SESSION_DATE_KEY);
        let sessionEndTime = localStorage.getItem(SESSION_END_TIME_KEY);
        let endTime: number;

        // If it's a new day, reset the timer
        if (storedDate !== todayString) {
            localStorage.setItem(SESSION_DATE_KEY, todayString);
            sessionEndTime = null; // Force reset
        }

        if (sessionEndTime) {
            endTime = parseInt(sessionEndTime, 10);
        } else {
            endTime = Date.now() + SESSION_DURATION;
            localStorage.setItem(SESSION_END_TIME_KEY, String(endTime));
        }

        const intervalId = setInterval(() => {
            const now = Date.now();
            const timeLeft = Math.round((endTime - now) / 1000);

            if (timeLeft <= 0) {
                setRemainingTime(0);
                setIsSessionActive(false);
                clearInterval(intervalId);
            } else {
                setRemainingTime(timeLeft);
                setIsSessionActive(true);
            }
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const value = useMemo(() => ({ remainingTime }), [remainingTime]);

    return (
        <TimerContext.Provider value={value}>
            {isSessionActive ? children : <TimeUpOverlay />}
        </TimerContext.Provider>
    );
}
