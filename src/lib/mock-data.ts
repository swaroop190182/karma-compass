import type { DayEntry } from '@/lib/types';

export const mockData: DayEntry[] = [
    { date: '2025-06-10', score: 32, loggedActivities: ['Journal', 'Gratitude', 'Meditate', 'Exercise', 'Smile', 'Help Classmate', 'Be Kind' ], reflection: '' },
    { date: '2025-06-18', score: 25, loggedActivities: ['Take Notes', 'Music', 'Meditate', 'Homework'], reflection: 'Felt productive today, especially during the music session. It helped me focus.' },
    { date: '2025-06-19', score: 29, loggedActivities: ['Take Notes', 'Organize', 'Meditate', 'Homework', 'Read Books'], reflection: '' },
    { date: '2025-06-20', score: 40, loggedActivities: ['Classes', 'Homework', 'Test Prep', 'Take Notes', 'Participate'], reflection: 'A very busy but good academic day.' },
    { date: '2025-06-21', score: 10, loggedActivities: ['Exercise', 'Hydrate'], reflection: '' },
    { date: '2025-06-03', score: -12, loggedActivities: ['Skip Class', 'Oversleep'], reflection: 'Felt really bad today. Need to do better tomorrow.' },
];
