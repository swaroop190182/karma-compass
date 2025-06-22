
import type { LucideIcon } from 'lucide-react';

export interface Activity {
  name: string;
  score: number;
  category: string;
  icon: LucideIcon;
  type: 'Good' | 'Bad';
}

export interface PlannerTask {
    id: string;
    time: string;
    task: string;
    priority: 'High' | 'Medium' | 'Low';
    status: 'Done' | 'Not Done' | 'Skipped';
}

export interface WeeklyGoal {
    id: string;
    title: string;
    current: number;
    target: number;
}

export interface DayEntry {
    date: string;
    score: number;
    loggedActivities: string[];
    reflection?: string;
}

export interface DailyPuzzle {
    id: string;
    category: 'Science' | 'Math' | 'History' | 'Logical Reasoning' | 'Vocabulary';
    question: string;
    options: string[];
    answer: string;
    reward: number;
}

export interface WeeklyChallenge {
    id: string;
    title: string;
    question: string;
    reward: number;
    isMultiPart: boolean;
    parts?: {
        question: string;
        options: string[];
        answer: string;
    }[];
}

export interface WordSearchPuzzle {
    id: string;
    title: string;
    grid: string[][];
    words: string[];
    reward: number;
}
