
"use client";

import { useState, useMemo, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DailyPlanner } from '@/components/planner/daily-planner';
import { WeeklyGoals } from '@/components/planner/weekly-goals';
import { EveningReflection } from '@/components/planner/evening-reflection';
import { AiCoach } from '@/components/planner/ai-coach';
import { MoodCheckIn } from '@/components/planner/mood-check-in';
import { SmartSuggestions } from '@/components/planner/smart-suggestions';
import type { PlannerTask, WeeklyGoal, DayEntry } from '@/lib/types';
import { useJournal } from '@/hooks/use-journal';
import { useToast } from '@/hooks/use-toast';

export default function PlannerPage() {
    const [tasks, setTasks] = useState<PlannerTask[]>([]);
    const [goals, setGoals] = useState<WeeklyGoal[]>([
        { id: 'g1', title: 'Complete 5 Math chapters', current: 2, target: 5 },
        { id: 'g2', title: 'Read 100 pages of a book', current: 75, target: 100 },
    ]);
    const { toast } = useToast();
    const { allEntries, allActivities } = useJournal();

    useEffect(() => {
        const newTasksFromJournal = localStorage.getItem('newPlannerTasks');
        if (newTasksFromJournal) {
            try {
                const parsedTasks: Omit<PlannerTask, 'id' | 'status'>[] = JSON.parse(newTasksFromJournal);
                const tasksToAdd = parsedTasks.map(task => ({
                    ...task,
                    id: crypto.randomUUID(),
                    status: 'Not Done' as const,
                }));
                setTasks(prev => [...prev, ...tasksToAdd]);
                toast({
                    title: "Tasks Imported",
                    description: `Added ${tasksToAdd.length} tasks from your journal intentions.`,
                });
            } catch (e) {
                console.error("Failed to parse new planner tasks", e);
            } finally {
                localStorage.removeItem('newPlannerTasks');
            }
        }
    }, [toast]);

    const journalHistory = useMemo(() => {
        return Object.values(allEntries)
          .map((entry): DayEntry => ({
            date: entry.date,
            score: entry.score ?? 0,
            loggedActivities: Object.keys(allActivities[entry.date] || {}).filter(key => allActivities[entry.date][key]),
            reflection: entry.reflection || '',
          }))
          .sort((a, b) => (b.date && a.date ? b.date.localeCompare(a.date) : 0)) // Sort by date descending
          .slice(0, 14); // Limit to last 14 days
    }, [allEntries, allActivities]);
    
    const tasksForAura = tasks.map(t => ({...t, id: t.id}));

    const handleAddTaskFromSuggestion = (task: Omit<PlannerTask, 'id' | 'status'>) => {
        const newTask = {
            ...task,
            id: crypto.randomUUID(),
            status: 'Not Done' as const,
        };
        setTasks(prev => [...prev, newTask]);
        toast({ title: "Task Added", description: `"${newTask.task}" was added to your planner.` });
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                    Goals & Planner
                </h1>
                <p className="text-muted-foreground">Plan your day, track weekly goals, and get AI-powered insights.</p>
            </header>

            <div className="space-y-8">
                <MoodCheckIn />
                
                <Tabs defaultValue="daily-planner" className="w-full">
                    <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                        <TabsTrigger value="daily-planner">Daily Planner</TabsTrigger>
                        <TabsTrigger value="weekly-goals">Weekly Goals</TabsTrigger>
                        <TabsTrigger value="evening-reflection">Evening Reflection</TabsTrigger>
                        <TabsTrigger value="ai-coach">AI Coach</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="daily-planner" className="mt-6 space-y-6">
                        <SmartSuggestions onAddTask={handleAddTaskFromSuggestion} />
                        <DailyPlanner tasks={tasks} setTasks={setTasks} />
                    </TabsContent>
                    
                    <TabsContent value="weekly-goals" className="mt-6">
                        <WeeklyGoals goals={goals} setGoals={setGoals} />
                    </TabsContent>
                    
                    <TabsContent value="evening-reflection" className="mt-6">
                        <EveningReflection tasks={tasks} />
                    </TabsContent>

                    <TabsContent value="ai-coach" className="mt-6">
                        <AiCoach tasks={tasksForAura} journalHistory={journalHistory} />
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
