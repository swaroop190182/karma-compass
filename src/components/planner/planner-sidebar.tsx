
"use client";

import { Calendar } from "@/components/ui/calendar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Search, Pen } from "lucide-react";

interface PlannerSidebarProps {
    date: Date;
    setDate: (date: Date) => void;
}

const calendars = [
    { id: "academic", label: "Academic", color: "bg-blue-500" },
    { id: "personal", label: "Personal", color: "bg-green-500" },
    { id: "wellbeing", label: "Well-being", color: "bg-yellow-500" },
]

export function PlannerSidebar({ date, setDate }: PlannerSidebarProps) {
    return (
        <aside className="w-64 border-r p-4 space-y-6 hidden lg:block bg-card">
            <Calendar
                mode="single"
                selected={date}
                onSelect={(d) => d && setDate(d)}
                className="p-0"
            />
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search tasks..." className="pl-8" />
            </div>
            <div className="space-y-2">
                 <div className="flex justify-between items-center">
                    <Label className="font-semibold">My Categories</Label>
                    <Pen className="w-4 h-4 text-muted-foreground cursor-pointer" />
                 </div>
                 <div className="space-y-2">
                    {calendars.map(cal => (
                        <div key={cal.id} className="flex items-center gap-2">
                            <Checkbox id={cal.id} defaultChecked />
                            <div className={`w-3 h-3 rounded-sm ${cal.color}`}></div>
                            <Label htmlFor={cal.id} className="text-sm font-normal">{cal.label}</Label>
                        </div>
                    ))}
                 </div>
            </div>
        </aside>
    )
}
