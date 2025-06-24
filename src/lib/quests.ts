
import type { DailyPuzzle, WeeklyChallenge, WordSearchPuzzle } from './types';

export const allDailyPuzzles: DailyPuzzle[] = [
    {
        id: 'sci1',
        category: 'Science',
        question: 'What is the chemical symbol for water?',
        options: ['O2', 'H2O', 'CO2', 'NaCl'],
        answer: 'H2O',
        reward: 10
    },
    {
        id: 'sci2',
        category: 'Science',
        question: 'Which planet is known as the Red Planet?',
        options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
        answer: 'Mars',
        reward: 10
    },
    {
        id: 'sci3',
        category: 'Science',
        question: 'What force pulls objects towards the center of the Earth?',
        options: ['Magnetism', 'Friction', 'Gravity', 'Tension'],
        answer: 'Gravity',
        reward: 10
    },
     {
        id: 'sci4',
        category: 'Science',
        question: 'Which of these noble gases is the most abundant in Earth\'s atmosphere?',
        options: ['Helium', 'Neon', 'Argon', 'Krypton'],
        answer: 'Argon',
        reward: 20
    },
    {
        id: 'math1',
        category: 'Math',
        question: 'What is 15 multiplied by 3?',
        options: ['45', '55', '35', '60'],
        answer: '45',
        reward: 10
    },
    {
        id: 'math2',
        category: 'Math',
        question: 'What is the value of Pi to two decimal places?',
        options: ['3.12', '3.14', '3.16', '3.18'],
        answer: '3.14',
        reward: 10
    },
    {
        id: 'math3',
        category: 'Math',
        question: 'How many sides does a hexagon have?',
        options: ['5', '6', '7', '8'],
        answer: '6',
        reward: 10
    },
    {
        id: 'math4',
        category: 'Math',
        question: 'What is the next number in the sequence: 2, 6, 12, 20, 30, ...?',
        options: ['36', '42', '40', '48'],
        answer: '42',
        reward: 20
    },
    {
        id: 'hist1',
        category: 'History',
        question: 'In which year did World War II end?',
        options: ['1942', '1945', '1950', '1939'],
        answer: '1945',
        reward: 15
    },
    {
        id: 'hist2',
        category: 'History',
        question: 'Who was the first President of the United States?',
        options: ['Abraham Lincoln', 'Thomas Jefferson', 'George Washington', 'John Adams'],
        answer: 'George Washington',
        reward: 15
    },
    {
        id: 'hist3',
        category: 'History',
        question: 'The ancient city of Rome was built on how many hills?',
        options: ['Five', 'Seven', 'Three', 'Ten'],
        answer: 'Seven',
        reward: 20
    },
    {
        id: 'logic1',
        category: 'Logical Reasoning',
        question: 'What comes next in the pattern: J, F, M, A, M, ...?',
        options: ['J', 'A', 'S', 'O'],
        answer: 'J', // Months of the year
        reward: 15
    },
    {
        id: 'logic2',
        category: 'Logical Reasoning',
        question: 'I have cities, but no houses. I have mountains, but no trees. I have water, but no fish. What am I?',
        options: ['A dream', 'A photograph', 'A map', 'A storybook'],
        answer: 'A map',
        reward: 15
    },
     {
        id: 'logic3',
        category: 'Logical Reasoning',
        question: 'If all Zips are Zaps, and some Zaps are Zops, which statement must be true?',
        options: ['All Zips are Zops', 'Some Zips are Zops', 'No Zips are Zops', 'None of the above are certain'],
        answer: 'None of the above are certain',
        reward: 20
    },
    {
        id: 'vocab1',
        category: 'Vocabulary',
        question: 'Which word is an antonym for "benevolent"?',
        options: ['Kind', 'Generous', 'Malevolent', 'Friendly'],
        answer: 'Malevolent',
        reward: 10
    },
    {
        id: 'vocab2',
        category: 'Vocabulary',
        question: 'What does the word "verbose" mean?',
        options: ['Using few words', 'Using too many words', 'Speaking loudly', 'Speaking softly'],
        answer: 'Using too many words',
        reward: 10
    },
    {
        id: 'vocab3',
        category: 'Vocabulary',
        question: 'Which word is a synonym for "ephemeral"?',
        options: ['Everlasting', 'Transparent', 'Fleeting', 'Powerful'],
        answer: 'Fleeting',
        reward: 20
    },
    {
        id: 'logic4',
        category: 'Logical Reasoning',
        question: 'A man points to a portrait and says, "Brothers and sisters I have none, but that man\'s father is my father\'s son." Who is in the portrait?',
        options: ['His son', 'Himself', 'His father', 'His brother'],
        answer: 'His son',
        reward: 20
    },
];

const getPuzzlesForDay = (date: Date): DailyPuzzle[] => {
    const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
    // Select 6 puzzles per day
    const puzzlesForDay: DailyPuzzle[] = [];
    const numPuzzles = 6;
    for (let i = 0; i < numPuzzles; i++) {
        // Use a stride to better shuffle puzzles across consecutive days
        const index = (dayOfYear + i * 7) % allDailyPuzzles.length; 
        puzzlesForDay.push(allDailyPuzzles[index]);
    }
    return puzzlesForDay;
};

export const dailyPuzzles: DailyPuzzle[] = getPuzzlesForDay(new Date());


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
