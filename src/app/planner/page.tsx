
"use client";

import { useState, useEffect } from 'react';
import { Calendar, Target, Moon, Bot } from 'lucide-react';

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import { MoodCheckIn } from '@/components/planner/mood-check-in';
import { DailyPlanner } from '@/components/planner/daily-planner';
import { SmartSuggestions } from '@/components/planner/smart-suggestions';
import { WeeklyGoals } from '@/components/planner/weekly-goals';
import { EveningReflection } from '@/components/planner/evening-reflection';
import { useToast } from '@/hooks/use-toast';
import { AiCoach } from '@/components/planner/ai-coach';

import type { PlannerTask, WeeklyGoal, DayEntry } from '@/lib/types';
import { mockData } from '@/lib/mock-data';

export default function PlannerPage() {
    const [tasks, setTasks] = useState<PlannerTask[]>([]);
    const [goals, setGoals] = useState<WeeklyGoal[]>([
        { id: '1', title: 'Revise 3 chapters of Science', current: 1, target: 3 },
        { id: '2', title: 'Complete 5 math practice sets', current: 2, target: 5 },
        { id: '3', title: 'Avoid social media during study time (days)', current: 0, target: 5 },
    ]);
    const { toast } = useToast();

    // Using mockData to simulate a journal history.
    // In a real app, this would be fetched from a database.
    const [journalHistory, setJournalHistory] = useState<DayEntry[]>(mockData);

    useEffect(() => {
        const newTasksRaw = localStorage.getItem('newPlannerTasks');
        if (newTasksRaw) {
            try {
                const newTasks = JSON.parse(newTasksRaw);
                if (Array.isArray(newTasks) && newTasks.length > 0) {
                    const tasksToAdd = newTasks.map((task: Omit<PlannerTask, 'id' | 'status'>) => ({
                        ...task,
                        id: crypto.randomUUID(),
                        status: 'Not Done' as const,
                    }));
                    setTasks(prev => [...prev, ...tasksToAdd]);
                    toast({
                        title: "Tasks Added",
                        description: `Added ${tasksToAdd.length} new tasks from your journal intentions.`,
                    });
                }
            } catch (error) {
                console.error("Failed to parse or add new tasks from localStorage", error);
            } finally {
                localStorage.removeItem('newPlannerTasks');
            }
        }
    }, [toast]);

    const addTask = (task: Omit<PlannerTask, 'id' | 'status'>) => {
        setTasks(prev => [...prev, { ...task, id: crypto.randomUUID(), status: 'Not Done' }]);
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
             <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Daily Planner
                </h1>
                <p className="text-muted-foreground">Organize your day for success and well-being.</p>
            </header>

            <Tabs defaultValue="plan" className="w-full">
                <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto gap-1 mb-6">
                    <TabsTrigger value="plan"><Calendar className="mr-2"/> Plan Day</TabsTrigger>
                    <TabsTrigger value="goals"><Target className="mr-2"/> Track Goals</TabsTrigger>
                    <TabsTrigger value="reflect"><Moon className="mr-2"/> Evening Review</TabsTrigger>
                    <TabsTrigger value="coach"><Bot className="mr-2"/> Aura Coach</TabsTrigger>
                </TabsList>
                
                <TabsContent value="plan" className="space-y-6">
                   <MoodCheckIn />
                   <DailyPlanner tasks={tasks} setTasks={setTasks} />
                   <SmartSuggestions onAddTask={addTask}/>
                </TabsContent>
                
                <TabsContent value="goals">
                    <WeeklyGoals goals={goals} setGoals={setGoals} />
                </TabsContent>

                <TabsContent value="reflect">
                    <EveningReflection tasks={tasks} />
                </TabsContent>

                <TabsContent value="coach">
                    <AiCoach tasks={tasks} journalHistory={journalHistory} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
