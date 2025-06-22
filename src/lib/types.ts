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
