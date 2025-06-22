
"use client";

import { useState, useEffect } from 'react';
import { Brain, Calendar, Award } from 'lucide-react';
import { dailyPuzzles, weeklyChallenge } from '@/lib/quests';
import { DailyPuzzleCard } from '@/components/quests/daily-puzzle-card';
import { WeeklyChallengeCard } from '@/components/quests/weekly-challenge-card';

const SOLVED_DAILY_PUZZLES_KEY = 'solved-daily-puzzles';
const SOLVED_WEEKLY_CHALLENGE_KEY = 'solved-weekly-challenge';
const LAST_VISIT_DATE_KEY = 'quests-last-visit';
const LAST_WEEK_KEY = 'quests-last-week';

// Helper to get the week number
const getWeekNumber = (d: Date) => {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    const weekNo = Math.ceil(( ( (d.valueOf() - yearStart.valueOf()) / 86400000) + 1)/7);
    return weekNo;
}

export default function QuestsPage() {
    const [solvedDailyPuzzles, setSolvedDailyPuzzles] = useState<Set<string>>(new Set());
    const [isWeeklyChallengeSolved, setIsWeeklyChallengeSolved] = useState(false);

    useEffect(() => {
        const today = new Date();
        const todayString = today.toDateString();
        const lastVisit = localStorage.getItem(LAST_VISIT_DATE_KEY);

        if (lastVisit !== todayString) {
            // It's a new day, reset daily puzzles
            localStorage.removeItem(SOLVED_DAILY_PUZZLES_KEY);
            setSolvedDailyPuzzles(new Set());
            localStorage.setItem(LAST_VISIT_DATE_KEY, todayString);
        } else {
            const solved = localStorage.getItem(SOLVED_DAILY_PUZZLES_KEY);
            if (solved) {
                setSolvedDailyPuzzles(new Set(JSON.parse(solved)));
            }
        }
        
        const currentWeek = getWeekNumber(today);
        const lastSolvedWeek = parseInt(localStorage.getItem(LAST_WEEK_KEY) || '0', 10);
        
        if (currentWeek !== lastSolvedWeek) {
             // It's a new week, reset weekly challenge
             localStorage.removeItem(SOLVED_WEEKLY_CHALLENGE_KEY);
             setIsWeeklyChallengeSolved(false);
        } else {
             const weeklySolved = localStorage.getItem(SOLVED_WEEKLY_CHALLENGE_KEY);
             if (weeklySolved === weeklyChallenge.id) {
                 setIsWeeklyChallengeSolved(true);
             }
        }
    }, []);

    const onDailyPuzzleSolved = (puzzleId: string) => {
        const newSolved = new Set(solvedDailyPuzzles).add(puzzleId);
        setSolvedDailyPuzzles(newSolved);
        localStorage.setItem(SOLVED_DAILY_PUZZLES_KEY, JSON.stringify(Array.from(newSolved)));
    };

    const onWeeklyChallengeSolved = () => {
        setIsWeeklyChallengeSolved(true);
        localStorage.setItem(SOLVED_WEEKLY_CHALLENGE_KEY, weeklyChallenge.id);
        localStorage.setItem(LAST_WEEK_KEY, getWeekNumber(new Date()).toString());
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
                    <Brain /> Quests & Puzzles
                </h1>
                <p className="text-muted-foreground">Challenge your mind, earn rewards, and learn something new every day.</p>
            </header>
            
            <div className="space-y-12">
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">
                        <Award className="text-yellow-500" /> Weekly Challenge
                    </h2>
                    <WeeklyChallengeCard 
                        challenge={weeklyChallenge} 
                        isSolved={isWeeklyChallengeSolved} 
                        onSolved={onWeeklyChallengeSolved} 
                    />
                </section>

                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">
                        <Calendar /> Daily Puzzles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {dailyPuzzles.map(puzzle => (
                            <DailyPuzzleCard 
                                key={puzzle.id} 
                                puzzle={puzzle} 
                                isSolved={solvedDailyPuzzles.has(puzzle.id)}
                                onSolved={() => onDailyPuzzleSolved(puzzle.id)}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
