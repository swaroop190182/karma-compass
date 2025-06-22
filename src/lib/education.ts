import { Book, FlaskConical, Globe, Languages, Calculator, Dna, Atom, Code, Laptop } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export const boards = ['CBSE', 'ICSE', 'State (General)'] as const;
export type Board = typeof boards[number];

export const grades = ['Grade 6', 'Grade 7', 'Grade 8', 'Grade 9', 'Grade 10', 'Grade 11', 'Grade 12'] as const;
export type Grade = typeof grades[number];

export interface Subject {
    name: string;
    icon: LucideIcon;
}

export const subjectsByBoardAndGrade: Record<Board, Record<Grade, Subject[]>> = {
    'CBSE': {
        'Grade 6': [{ name: 'Mathematics', icon: Calculator }, { name: 'Science', icon: FlaskConical }, { name: 'Social Science', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 7': [{ name: 'Mathematics', icon: Calculator }, { name: 'Science', icon: FlaskConical }, { name: 'Social Science', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 8': [{ name: 'Mathematics', icon: Calculator }, { name: 'Science', icon: FlaskConical }, { name: 'Social Science', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 9': [{ name: 'Mathematics', icon: Calculator }, { name: 'Science', icon: FlaskConical }, { name: 'Social Science', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 10': [{ name: 'Mathematics', icon: Calculator }, { name: 'Science', icon: FlaskConical }, { name: 'Social Science', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 11': [{ name: 'Physics', icon: Atom }, { name: 'Chemistry', icon: FlaskConical }, { name: 'Biology', icon: Dna }, { name: 'Mathematics', icon: Calculator }, { name: 'English', icon: Languages }, { name: 'Computer Science', icon: Code }],
        'Grade 12': [{ name: 'Physics', icon: Atom }, { name: 'Chemistry', icon: FlaskConical }, { name: 'Biology', icon: Dna }, { name: 'Mathematics', icon: Calculator }, { name: 'English', icon: Languages }, { name: 'Computer Science', icon: Code }],
    },
    'ICSE': {
        'Grade 6': [{ name: 'Mathematics', icon: Calculator }, { name: 'Science', icon: FlaskConical }, { name: 'History & Civics', icon: Globe }, { name: 'Geography', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 7': [{ name: 'Mathematics', icon: Calculator }, { name: 'Science', icon: FlaskConical }, { name: 'History & Civics', icon: Globe }, { name: 'Geography', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 8': [{ name: 'Mathematics', icon: Calculator }, { name: 'Science', icon: FlaskConical }, { name: 'History & Civics', icon: Globe }, { name: 'Geography', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 9': [{ name: 'Mathematics', icon: Calculator }, { name: 'Physics', icon: Atom }, { name: 'Chemistry', icon: FlaskConical }, { name: 'Biology', icon: Dna }, { name: 'History & Civics', icon: Globe }, { name: 'Geography', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 10': [{ name: 'Mathematics', icon: Calculator }, { name: 'Physics', icon: Atom }, { name: 'Chemistry', icon: FlaskConical }, { name: 'Biology', icon: Dna }, { name: 'History & Civics', icon: Globe }, { name: 'Geography', icon: Globe }, { name: 'English', icon: Languages }, { name: 'Computer Applications', icon: Code }],
        'Grade 11': [{ name: 'Physics', icon: Atom }, { name: 'Chemistry', icon: FlaskConical }, { name: 'Biology', icon: Dna }, { name: 'Mathematics', icon: Calculator }, { name: 'English', icon: Languages }, { name: 'Computer Science', icon: Laptop }],
        'Grade 12': [{ name: 'Physics', icon: Atom }, { name: 'Chemistry', icon: FlaskConical }, { name: 'Biology', icon: Dna }, { name: 'Mathematics', icon: Calculator }, { name: 'English', icon: Languages }, { name: 'Computer Science', icon: Laptop }],
    },
    'State (General)': {
        'Grade 6': [{ name: 'Mathematics', icon: Calculator }, { name: 'General Science', icon: FlaskConical }, { name: 'Social Studies', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 7': [{ name: 'Mathematics', icon: Calculator }, { name: 'General Science', icon: FlaskConical }, { name: 'Social Studies', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 8': [{ name: 'Mathematics', icon: Calculator }, { name: 'General Science', icon: FlaskConical }, { name: 'Social Studies', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 9': [{ name: 'Mathematics', icon: Calculator }, { name: 'Physical Science', icon: Atom }, { name: 'Biological Science', icon: Dna }, { name: 'Social Studies', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 10': [{ name: 'Mathematics', icon: Calculator }, { name: 'Physical Science', icon: Atom }, { name: 'Biological Science', icon: Dna }, { name: 'Social Studies', icon: Globe }, { name: 'English', icon: Languages }],
        'Grade 11': [{ name: 'Physics', icon: Atom }, { name: 'Chemistry', icon: FlaskConical }, { name: 'Botany', icon: Dna }, { name: 'Zoology', icon: Dna }, { name: 'Mathematics', icon: Calculator }, { name: 'English', icon: Languages }],
        'Grade 12': [{ name: 'Physics', icon: Atom }, { name: 'Chemistry', icon: FlaskConical }, { name: 'Botany', icon: Dna }, { name: 'Zoology', icon: Dna }, { name: 'Mathematics', icon: Calculator }, { name: 'English', icon: Languages }],
    }
};
