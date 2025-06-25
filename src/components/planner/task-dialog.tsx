
"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react";
import type { PlannerTask } from "@/lib/types";
import { Trash2 } from "lucide-react";

interface TaskDialogProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    task: PlannerTask | null;
    onSave: (task: PlannerTask) => void;
    onDelete: (taskId: string) => void;
}

const emptyTask: PlannerTask = {
    id: '',
    task: '',
    time: '09:00 AM - 10:00 AM',
    priority: 'Medium',
    status: 'Not Done'
};

export function TaskDialog({ isOpen, setIsOpen, task, onSave, onDelete }: TaskDialogProps) {
    const [currentTask, setCurrentTask] = useState<PlannerTask>(task || emptyTask);

    useEffect(() => {
        setCurrentTask(task || { ...emptyTask, id: crypto.randomUUID() });
    }, [task, isOpen]);
    
    const handleSave = () => {
        onSave(currentTask);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>{task ? 'Edit Task' : 'Add New Task'}</DialogTitle>
                    <DialogDescription>Fill in the details for your task.</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-2">
                    <div className="space-y-2">
                        <Label htmlFor="task-name">Task Name</Label>
                        <Input id="task-name" value={currentTask.task} onChange={e => setCurrentTask({...currentTask, task: e.target.value})} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="task-time">Time</Label>
                        <Input id="task-time" placeholder="e.g., 10:00 AM - 11:30 AM" value={currentTask.time} onChange={e => setCurrentTask({...currentTask, time: e.target.value})} />
                    </div>
                     <div className="space-y-2">
                        <Label htmlFor="task-priority">Priority</Label>
                        <Select value={currentTask.priority} onValueChange={(val: 'High' | 'Medium' | 'Low') => setCurrentTask({...currentTask, priority: val})}>
                            <SelectTrigger id="task-priority">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="High">High</SelectItem>
                                <SelectItem value="Medium">Medium</SelectItem>
                                <SelectItem value="Low">Low</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>
                <DialogFooter className="flex justify-between w-full">
                    <div>
                        {task && <Button variant="destructive" size="icon" onClick={() => onDelete(task.id)}><Trash2 className="h-4 w-4"/></Button>}
                    </div>
                    <div className="flex gap-2">
                        <Button variant="ghost" onClick={() => setIsOpen(false)}>Cancel</Button>
                        <Button onClick={handleSave}>Save Task</Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
