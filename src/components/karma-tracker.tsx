
"use client";

import { activities, activityCategories, type Activity } from '@/lib/activities';
import { cn } from '@/lib/utils';
import {
  Accordion,
  AccordionContent,
  AccordionTrigger,
  AccordionItem,
} from '@/components/ui/accordion';
import type React from 'react';

const ActivityGrid = ({ activities, selectedActivities, onActivityToggle }: { activities: Activity[], selectedActivities: Record<string, boolean>, onActivityToggle: (activity: Activity, event: React.MouseEvent<HTMLButtonElement>) => void }) => (
    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2 pt-4">
        {activities.map((activity) => (
        <button
            key={activity.name}
            onClick={(e) => onActivityToggle(activity, e)}
            className={cn(
                'flex flex-col items-center justify-center p-1.5 gap-1 rounded-lg border-2 transition-all aspect-square shadow-sm',
                'hover:shadow-md hover:scale-[1.03]',
                selectedActivities[activity.name]
                ? activity.type === 'Good'
                    ? 'bg-chart-2/30 border-chart-2 shadow-lg scale-105 animate-pop-in'
                    : 'bg-muted border-foreground/50 shadow-lg scale-105 animate-shake'
                : 'bg-card border-input hover:border-primary'
            )}
            >
            <activity.icon className="w-6 h-6 shrink-0" />
            <span className="text-center text-[10px] font-semibold leading-tight">{activity.name}</span>
        </button>
        ))}
    </div>
);

export function KarmaTracker({ selectedActivities, onActivityToggle }: { selectedActivities: Record<string, boolean>, onActivityToggle: (activity: Activity, event: React.MouseEvent<HTMLButtonElement>) => void }) {
  const goodKarmaCategories = activityCategories.filter(c => c.type === 'Good');
  const badKarmaCategories = activityCategories.filter(c => c.type === 'Bad');

  const getActivitiesForCategory = (categoryName: string) => {
    return activities.filter(a => a.category === categoryName);
  }

  return (
    <div className="space-y-6">
        <div>
            <h3 className="text-xl font-bold text-green-700 dark:text-green-400 mb-2">Helpful & Positive Activities</h3>
             <Accordion type="multiple" className="w-full space-y-2">
                {goodKarmaCategories.map(category => {
                    const categoryActivities = getActivitiesForCategory(category.name);
                    if (categoryActivities.length === 0) return null;
                    
                    const CategoryIcon = category.icon;

                    return (
                        <AccordionItem value={category.name} key={category.name} className="border rounded-lg px-4 bg-muted/20">
                            <AccordionTrigger className="text-base font-semibold hover:no-underline py-3">
                                <div className="flex items-center gap-3">
                                    <CategoryIcon className="w-5 h-5 text-primary" />
                                    {category.name}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                               <ActivityGrid 
                                    activities={categoryActivities} 
                                    selectedActivities={selectedActivities} 
                                    onActivityToggle={onActivityToggle} 
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
       
        <div>
            <h3 className="text-xl font-bold text-foreground mb-2">Habits for Improvement</h3>
             <Accordion type="multiple" className="w-full space-y-2">
                {badKarmaCategories.map(category => {
                    const categoryActivities = getActivitiesForCategory(category.name);
                    if (categoryActivities.length === 0) return null;

                    const CategoryIcon = category.icon;

                    return (
                        <AccordionItem value={category.name} key={category.name} className="border rounded-lg px-4 bg-muted/20">
                            <AccordionTrigger className="text-base font-semibold hover:no-underline py-3">
                                <div className="flex items-center gap-3">
                                    <CategoryIcon className="w-5 h-5 text-foreground" />
                                    {category.name}
                                </div>
                            </AccordionTrigger>
                            <AccordionContent>
                               <ActivityGrid 
                                    activities={categoryActivities} 
                                    selectedActivities={selectedActivities} 
                                    onActivityToggle={onActivityToggle} 
                                />
                            </AccordionContent>
                        </AccordionItem>
                    )
                })}
            </Accordion>
        </div>
    </div>
  );
}
