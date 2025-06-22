
import type { DailyPuzzle, WeeklyChallenge } from './types';

export const dailyPuzzles: DailyPuzzle[] = [
    {
        id: 'sci1',
        category: 'Science',
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
        answer: 'H2O',
        reward: 20
    },
    {
        id: 'math1',
        category: 'Math',
        question: 'What is 12 * 12?',
        options: ['144', '124', '156', '132'],
        answer: '144',
        reward: 20
    },
    {
        id: 'hist1',
        category: 'History',
        question: 'Who was the first President of the United States?',
        options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'],
        answer: 'George Washington',
        reward: 20
    },
    {
        id: 'gk1',
        category: 'General Knowledge',
        question: 'What is the capital of Japan?',
        options: ['Beijing', 'Seoul', 'Tokyo', 'Bangkok'],
        answer: 'Tokyo',
        reward: 20
    },
];

export const weeklyChallenge: WeeklyChallenge = {
    id: 'weekly1',
    title: 'The Grand History Challenge',
    question: 'Solve this riddle about a famous historical event.',
    reward: 100,
    isMultiPart: false,
    parts: [
        {
            question: 'I started in 1914 and ended in 1918, redrawing the map of Europe. What am I?',
            options: ['World War II', 'The Cold War', 'The Napoleonic Wars', 'World War I'],
            answer: 'World War I'
        }
    ]
}
