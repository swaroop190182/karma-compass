"use client";

import { activities, type Activity } from '@/lib/activities';
import { cn } from '@/lib/utils';

const ActivityGrid = ({ activities, selectedActivities, onActivityToggle }: { activities: Activity[], selectedActivities: Record<string, boolean>, onActivityToggle: (name: string) => void }) => (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
        {activities.map((activity) => (
        <button
            key={activity.name}
            onClick={() => onActivityToggle(activity.name)}
            className={cn(
                'flex flex-col items-center justify-center p-1.5 gap-1 rounded-lg border-2 transition-all aspect-square shadow-sm',
                'hover:shadow-md hover:scale-[1.03]',
                selectedActivities[activity.name]
                ? activity.type === 'Good'
                    ? 'bg-chart-2/30 border-chart-2 shadow-lg scale-105 animate-pop-in'
                    : 'bg-destructive/30 border-destructive shadow-lg scale-105 animate-shake'
                : 'bg-card border-input hover:border-primary'
            )}
            >
            <activity.icon className="w-6 h-6 shrink-0" />
            <span className="text-center text-[10px] font-semibold leading-tight">{activity.name}</span>
        </button>
        ))}
    </div>
);

export function KarmaTracker({ selectedActivities, onActivityToggle }: { selectedActivities: Record<string, boolean>, onActivityToggle: (activityName: string) => void }) {
  return (
      <ActivityGrid 
        activities={activities} 
        selectedActivities={selectedActivities} 
        onActivityToggle={onActivityToggle} 
      />
  );
}
