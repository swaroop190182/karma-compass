
"use client";

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import type { PlannerTask } from '@/lib/types';
import { cn } from '@/lib/utils';
import { Calendar, PlusCircle, Trash2 } from 'lucide-react';
import type React from 'react';


interface DailyPlannerProps {
    tasks: PlannerTask[];
    setTasks: React.Dispatch<React.SetStateAction<PlannerTask[]>>;
}

export function DailyPlanner({ tasks, setTasks }: DailyPlannerProps) {
    const handleAddTask = () => {
        const newTask: PlannerTask = {
            id: crypto.randomUUID(),
            time: '9:00 - 10:00 AM',
            task: 'New Task',
            priority: 'Medium',
            status: 'Not Done',
        };
        setTasks([...tasks, newTask]);
    };
    
    const handleUpdateTask = (id: string, field: keyof Omit<PlannerTask, 'id'>, value: string) => {
        setTasks(tasks.map(task => (task.id === id ? { ...task, [field]: value } : task)));
    };

    const handleDeleteTask = (id: string) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const getStatusColor = (status: PlannerTask['status']) => {
        switch (status) {
            case 'Done': return 'bg-green-500/20 text-green-700';
            case 'Skipped': return 'bg-red-500/20 text-red-700';
            default: return 'bg-slate-500/20 text-slate-700';
        }
    };
    
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div className="space-y-1.5">
                    <CardTitle className="flex items-center gap-3"><Calendar /> Plan Your Day & Set Intentions</CardTitle>
                </div>
                <Button onClick={handleAddTask} size="sm"><PlusCircle className="mr-2 h-4 w-4" /> Add Slot</Button>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[150px]">Time Slot</TableHead>
                                <TableHead>Task</TableHead>
                                <TableHead className="w-[120px]">Priority</TableHead>
                                <TableHead className="w-[140px]">Status</TableHead>
                                <TableHead className="w-[50px]">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {tasks.length > 0 ? tasks.map(task => (
                                <TableRow key={task.id}>
                                    <TableCell>
                                        <Input value={task.time} onChange={e => handleUpdateTask(task.id, 'time', e.target.value)} className="border-none bg-transparent focus-within:bg-white" />
                                    </TableCell>
                                    <TableCell>
                                        <Input value={task.task} onChange={e => handleUpdateTask(task.id, 'task', e.target.value)} className="border-none bg-transparent focus-within:bg-white" />
                                    </TableCell>
                                    <TableCell>
                                        <Select value={task.priority} onValueChange={(value: 'High' | 'Medium' | 'Low') => handleUpdateTask(task.id, 'priority', value)}>
                                            <SelectTrigger className="border-none bg-transparent focus:ring-0">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="High">High</SelectItem>
                                                <SelectItem value="Medium">Medium</SelectItem>
                                                <SelectItem value="Low">Low</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                    <TableCell>
                                        <Select value={task.status} onValueChange={(value: 'Done' | 'Not Done' | 'Skipped') => handleUpdateTask(task.id, 'status', value)}>
                                            <SelectTrigger className={cn("font-semibold border-none focus:ring-0", getStatusColor(task.status))}>
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Done">Done</SelectItem>
                                                <SelectItem value="Not Done">Not Done</SelectItem>
                                                <SelectItem value="Skipped">Skipped</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </TableCell>
                                     <TableCell>
                                        <Button variant="ghost" size="icon" onClick={() => handleDeleteTask(task.id)}>
                                            <Trash2 className="h-4 w-4 text-destructive" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            )) : (
                                <TableRow>
                                    <TableCell colSpan={5} className="text-center text-muted-foreground h-24">
                                        No tasks planned yet. Click "Add Slot" to start!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
}

