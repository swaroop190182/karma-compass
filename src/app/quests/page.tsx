
"use client";

import { useState, useEffect } from 'react';
import { Brain, Calendar, Award, XCircle } from 'lucide-react';
import { dailyPuzzles, weeklyChallenge, wordSearchPuzzles } from '@/lib/quests';
import { DailyPuzzleCard } from '@/components/quests/daily-puzzle-card';
import { WeeklyChallengeCard } from '@/components/quests/weekly-challenge-card';
import { WordSearchCard } from '@/components/quests/word-search-card';

const ATTEMPTED_DAILY_PUZZLES_KEY = 'attempted-daily-puzzles';
const SOLVED_DAILY_PUZZLES_KEY = 'solved-daily-puzzles';
const ATTEMPTED_WEEKLY_CHALLENGE_KEY = 'attempted-weekly-challenge';
const SOLVED_WEEKLY_CHALLENGE_KEY = 'solved-weekly-challenge';
const SOLVED_WORD_SEARCH_KEY = 'solved-word-search';
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
    const [attemptedDailyPuzzles, setAttemptedDailyPuzzles] = useState<Set<string>>(new Set());
    const [solvedDailyPuzzles, setSolvedDailyPuzzles] = useState<Set<string>>(new Set());
    
    const [isWeeklyChallengeAttempted, setIsWeeklyChallengeAttempted] = useState(false);
    const [isWeeklyChallengeSolved, setIsWeeklyChallengeSolved] = useState(false);
    
    const [solvedWordSearches, setSolvedWordSearches] = useState<Set<string>>(new Set());

    useEffect(() => {
        const today = new Date();
        const todayString = today.toDateString();
        const lastVisit = localStorage.getItem(LAST_VISIT_DATE_KEY);

        // --- Daily Puzzles ---
        if (lastVisit !== todayString) {
            localStorage.removeItem(ATTEMPTED_DAILY_PUZZLES_KEY);
            localStorage.removeItem(SOLVED_DAILY_PUZZLES_KEY);
            setAttemptedDailyPuzzles(new Set());
            setSolvedDailyPuzzles(new Set());
            localStorage.setItem(LAST_VISIT_DATE_KEY, todayString);
        } else {
            const attempted = localStorage.getItem(ATTEMPTED_DAILY_PUZZLES_KEY);
            if (attempted) setAttemptedDailyPuzzles(new Set(JSON.parse(attempted)));
            
            const solved = localStorage.getItem(SOLVED_DAILY_PUZZLES_KEY);
            if (solved) setSolvedDailyPuzzles(new Set(JSON.parse(solved)));
        }
        
        // --- Weekly Challenge ---
        const currentWeek = getWeekNumber(today);
        const lastSolvedWeek = parseInt(localStorage.getItem(LAST_WEEK_KEY) || '0', 10);
        
        if (currentWeek !== lastSolvedWeek) {
             localStorage.removeItem(ATTEMPTED_WEEKLY_CHALLENGE_KEY);
             localStorage.removeItem(SOLVED_WEEKLY_CHALLENGE_KEY);
             setIsWeeklyChallengeAttempted(false);
             setIsWeeklyChallengeSolved(false);
        } else {
             const weeklyAttempted = localStorage.getItem(ATTEMPTED_WEEKLY_CHALLENGE_KEY);
             if (weeklyAttempted === weeklyChallenge.id) setIsWeeklyChallengeAttempted(true);

             const weeklySolved = localStorage.getItem(SOLVED_WEEKLY_CHALLENGE_KEY);
             if (weeklySolved === weeklyChallenge.id) setIsWeeklyChallengeSolved(true);
        }

        // --- Word Search ---
        const solvedWS = localStorage.getItem(SOLVED_WORD_SEARCH_KEY);
        if (solvedWS) setSolvedWordSearches(new Set(JSON.parse(solvedWS)));

    }, []);

    const onDailyPuzzleAttempted = (puzzleId: string, wasCorrect: boolean) => {
        const newAttempted = new Set(attemptedDailyPuzzles).add(puzzleId);
        setAttemptedDailyPuzzles(newAttempted);
        localStorage.setItem(ATTEMPTED_DAILY_PUZZLES_KEY, JSON.stringify(Array.from(newAttempted)));

        if (wasCorrect) {
            const newSolved = new Set(solvedDailyPuzzles).add(puzzleId);
            setSolvedDailyPuzzles(newSolved);
            localStorage.setItem(SOLVED_DAILY_PUZZLES_KEY, JSON.stringify(Array.from(newSolved)));
        }
    };

    const onWeeklyChallengeAttempted = (wasCorrect: boolean) => {
        setIsWeeklyChallengeAttempted(true);
        localStorage.setItem(ATTEMPTED_WEEKLY_CHALLENGE_KEY, weeklyChallenge.id);
        
        if (wasCorrect) {
            setIsWeeklyChallengeSolved(true);
            localStorage.setItem(SOLVED_WEEKLY_CHALLENGE_KEY, weeklyChallenge.id);
        }
        localStorage.setItem(LAST_WEEK_KEY, getWeekNumber(new Date()).toString());
    };
    
    const onWordSearchSolved = (puzzleId: string) => {
        const newSolved = new Set(solvedWordSearches).add(puzzleId);
        setSolvedWordSearches(newSolved);
        localStorage.setItem(SOLVED_WORD_SEARCH_KEY, JSON.stringify(Array.from(newSolved)));
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
                        <Brain className="text-purple-500" /> Word Search Puzzles
                    </h2>
                     {wordSearchPuzzles.map(puzzle => (
                        <WordSearchCard
                            key={puzzle.id}
                            puzzle={puzzle}
                            isSolved={solvedWordSearches.has(puzzle.id)}
                            onSolved={() => onWordSearchSolved(puzzle.id)}
                        />
                    ))}
                </section>
                
                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">
                        <Award className="text-yellow-500" /> Weekly Challenge
                    </h2>
                    <WeeklyChallengeCard 
                        challenge={weeklyChallenge} 
                        isAttempted={isWeeklyChallengeAttempted}
                        isSolved={isWeeklyChallengeSolved} 
                        onAttempted={onWeeklyChallengeAttempted} 
                    />
                </section>

                <section>
                    <h2 className="text-2xl font-semibold flex items-center gap-3 mb-4">
                        <Calendar /> Daily Puzzles
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {dailyPuzzles.map(puzzle => (
                            <DailyPuzzleCard 
                                key={puzzle.id} 
                                puzzle={puzzle} 
                                isAttempted={attemptedDailyPuzzles.has(puzzle.id)}
                                isSolved={solvedDailyPuzzles.has(puzzle.id)}
                                onAttempted={onDailyPuzzleAttempted}
                            />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
}
