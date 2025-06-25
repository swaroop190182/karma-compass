
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { PlannerSidebar } from '@/components/planner/planner-sidebar';
import { PlannerView } from '@/components/planner/planner-view';
import { TaskDialog } from '@/components/planner/task-dialog';
import type { PlannerTask } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';
import { format, addDays, subDays } from 'date-fns';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

export default function PlannerPage() {
    const [tasks, setTasks] = useState<PlannerTask[]>([]);
    const [date, setDate] = useState<Date>(new Date());
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [selectedTask, setSelectedTask] = useState<PlannerTask | null>(null);
    const { toast } = useToast();

    // Load tasks from localStorage or AI suggestions
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

    const handleSaveTask = (task: PlannerTask) => {
        const isEditing = tasks.some(t => t.id === task.id);
        if (isEditing) {
            setTasks(tasks.map(t => t.id === task.id ? task : t));
        } else {
            setTasks([...tasks, task]);
        }
        setIsDialogOpen(false);
        setSelectedTask(null);
    };
    
    const handleAddNewTask = () => {
        setSelectedTask(null);
        setIsDialogOpen(true);
    };

    const handleSelectTask = (task: PlannerTask) => {
        setSelectedTask(task);
        setIsDialogOpen(true);
    };
    
    const handleDeleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId));
        setIsDialogOpen(false);
        setSelectedTask(null);
    };

    return (
        <div className="flex h-[calc(100vh-80px)] text-foreground bg-background">
            <PlannerSidebar date={date} setDate={setDate} />
            <main className="flex-1 flex flex-col overflow-hidden">
                <header className="flex items-center justify-between p-4 border-b">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" onClick={() => setDate(new Date())}>Today</Button>
                        <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => setDate(d => subDays(d, 1))}><ChevronLeft className="h-4 w-4" /></Button>
                            <Button variant="ghost" size="icon" onClick={() => setDate(d => addDays(d, 1))}><ChevronRight className="h-4 w-4" /></Button>
                        </div>
                        <h2 className="text-xl font-semibold">{format(date, "MMMM yyyy")}</h2>
                    </div>
                    <Button onClick={handleAddNewTask}><Plus className="mr-2 h-4 w-4" /> Add Task</Button>
                </header>
                <PlannerView tasks={tasks} onSelectTask={handleSelectTask} />
            </main>
            <TaskDialog 
                isOpen={isDialogOpen} 
                setIsOpen={setIsDialogOpen}
                task={selectedTask}
                onSave={handleSaveTask}
                onDelete={handleDeleteTask}
            />
        </div>
    );
}
