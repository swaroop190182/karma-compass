
import type { DailyPuzzle, WeeklyChallenge, WordSearchPuzzle } from './types';

export const dailyPuzzles: DailyPuzzle[] = [
    {
        id: 'sci2',
        category: 'Science',
        question: 'Which of these noble gases is the most abundant in Earth\'s atmosphere?',
        options: ['Helium', 'Neon', 'Argon', 'Krypton'],
        answer: 'Argon',
        reward: 20
    },
    {
        id: 'math2',
        category: 'Math',
        question: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ...?',
        options: ['36', '42', '40', '48'],
        answer: '42',
        reward: 20
    },
    {
        id: 'hist2',
        category: 'History',
        question: 'The ancient city of Rome was built on how many hills?',
        options: ['Five', 'Seven', 'Three', 'Ten'],
        answer: 'Seven',
        reward: 20
    },
    {
        id: 'logic1',
        category: 'Logical Reasoning',
        question: 'If all Zips are Zaps, and some Zaps are Zops, which statement must be true?',
        options: ['All Zips are Zops', 'Some Zips are Zops', 'No Zips are Zops', 'None of the above are certain'],
        answer: 'None of the above are certain',
        reward: 20
    },
    {
        id: 'vocab1',
        category: 'Vocabulary',
        question: 'Which word is a synonym for "ephemeral"?',
        options: ['Everlasting', 'Transparent', 'Fleeting', 'Powerful'],
        answer: 'Fleeting',
        reward: 20
    },
    {
        id: 'logic2',
        category: 'Logical Reasoning',
        question: 'A man points to a portrait and says, "Brothers and sisters I have none, but that man\'s father is my father\'s son." Who is in the portrait?',
        options: ['His son', 'Himself', 'His father', 'His brother'],
        answer: 'His son',
        reward: 20
    },
];

export const weeklyChallenge: WeeklyChallenge = {
    id: 'weekly2',
    title: 'The Scientist\'s Riddle',
    question: 'Solve this riddle about a famous scientist.',
    reward: 100,
    isMultiPart: false,
    parts: [
        {
            question: 'I laid the groundwork for classical mechanics, invented calculus, and my laws describe the motion of objects. My famous work is the "Principia". Who am I?',
            options: ['Galileo Galilei', 'Albert Einstein', 'Isaac Newton', 'Nikola Tesla'],
            answer: 'Isaac Newton'
        }
    ]
};

export const wordSearchPuzzles: WordSearchPuzzle[] = [
    {
        id: 'ws_scientists_1',
        title: 'Find the Scientists',
        reward: 50,
        words: ['NEWTON', 'CURIE', 'DARWIN', 'TESLA', 'EINSTEIN', 'GALILEO', 'HAWKING'],
        grid: [
            ['E', 'N', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'G'],
            ['L', 'I', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'D', 'A'],
            ['W', 'E', 'N', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'A', 'L'],
            ['G', 'W', 'H', 'S', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'R', 'I'],
            ['Q', 'T', 'R', 'S', 'T', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'W', 'L'],
            ['A', 'O', 'B', 'C', 'D', 'E', 'E', 'F', 'G', 'H', 'I', 'J', 'I', 'E'],
            ['K', 'N', 'L', 'M', 'N', 'O', 'P', 'I', 'S', 'A', 'L', 'S', 'N', 'O'],
            ['H', 'A', 'W', 'K', 'I', 'N', 'G', 'N', 'Q', 'R', 'T', 'E', 'V', 'P'],
            ['U', 'V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
            ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'A'],
            ['V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'L'],
            ['I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'S'],
            ['V', 'W', 'X', 'Y', 'Z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'E'],
            ['C', 'U', 'R', 'I', 'E', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'T']
        ],
    }
];
