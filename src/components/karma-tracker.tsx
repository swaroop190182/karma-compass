"use client";

import { useState, useEffect, useMemo, useTransition } from 'react';
import { format } from 'date-fns';
import { Sparkles, ThumbsUp, ThumbsDown, LoaderCircle, Calendar as CalendarIcon } from 'lucide-react';

import { motivationalMessage } from '@/ai/flows/motivational-message';
import { activities, activityCategories, type Activity } from '@/lib/activities';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

// Helper to group activities by category
const groupActivitiesByCategory = (activityList: Activity[]) => {
  return activityList.reduce((acc, activity) => {
    const category = activity.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(activity);
    return acc;
  }, {} as Record<string, Activity[]>);
};

export function KarmaTracker() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dailyActivities, setDailyActivities] = useState<Record<string, Record<string, boolean>>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();

  const selectedDateString = date ? format(date, 'yyyy-MM-dd') : '';

  const selectedActivities = useMemo(() => {
    return dailyActivities[selectedDateString] || {};
  }, [dailyActivities, selectedDateString]);

  useEffect(() => {
    const score = Object.keys(selectedActivities).reduce((acc, activityName) => {
      if (selectedActivities[activityName]) {
        const activity = activities.find(a => a.name === activityName);
        return acc + (activity ? activity.score : 0);
      }
      return acc;
    }, 0);
    setTotalScore(score);
    setMotivationalQuote('');
  }, [selectedActivities]);
  
  const handleActivityToggle = (activityName: string) => {
    const isSelected = !!selectedActivities[activityName];
    setDailyActivities(prev => ({
      ...prev,
      [selectedDateString]: {
        ...(prev[selectedDateString] || {}),
        [activityName]: !isSelected,
      },
    }));
  };

  const handleGetMotivation = async () => {
    if (Object.values(selectedActivities).length === 0 || Object.values(selectedActivities).every(v => !v)) {
        toast({
            title: "No activities selected",
            description: "Please select at least one activity to get a motivational message.",
            variant: "destructive",
        });
        return;
    }
    
    startTransition(async () => {
      try {
        const result = await motivationalMessage({ karmaScore: totalScore });
        setMotivationalQuote(result.message);
      } catch (error) {
        console.error('Failed to get motivational message:', error);
        toast({
          title: 'Error',
          description: 'Could not fetch motivational message. Please try again.',
          variant: 'destructive',
        });
      }
    });
  };

  const goodKarmaGrouped = groupActivitiesByCategory(activities.filter(a => a.type === 'Good'));
  const badKarmaGrouped = groupActivitiesByCategory(activities.filter(a => a.type === 'Bad'));
  
  const goodCategories = activityCategories.filter(c => c.type === 'Good' && goodKarmaGrouped[c.name]);
  const badCategories = activityCategories.filter(c => c.type === 'Bad' && badKarmaGrouped[c.name]);

  const ActivityGrid = ({ groupedActivities, categories, type }: { groupedActivities: Record<string, Activity[]>, categories: typeof activityCategories, type: 'Good' | 'Bad' }) => (
    <div className="space-y-8">
      {categories.map((category) => (
        groupedActivities[category.name] && groupedActivities[category.name].length > 0 && (
          <div key={category.name}>
            <div className="flex items-center gap-3 mb-4 pb-2 border-b">
              <category.icon className="w-7 h-7" />
              <h3 className="text-xl font-headline font-bold">{category.name}</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
              {groupedActivities[category.name].map((activity) => (
                <TooltipProvider key={activity.name} delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleActivityToggle(activity.name)}
                        className={cn(
                          'flex flex-col items-center justify-center p-3 gap-2 rounded-xl border-2 transition-all aspect-square shadow-sm',
                          'hover:shadow-lg hover:scale-[1.02]',
                          selectedActivities[activity.name]
                            ? type === 'Good'
                              ? 'bg-chart-2/20 border-chart-2 shadow-lg scale-105'
                              : 'bg-destructive/20 border-destructive shadow-lg scale-105'
                            : 'bg-card border-input hover:border-accent'
                        )}
                      >
                        <activity.icon className="w-9 h-9 mb-1" />
                        <span className="text-center text-xs font-semibold leading-tight">{activity.name}</span>
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Karma Score: {activity.score > 0 ? `+${activity.score}` : activity.score}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
          </div>
        )
      ))}
    </div>
  );

  return (
    <div className="flex flex-col gap-6">
      <Card className="bg-card/80 backdrop-blur-sm shadow-md sticky top-4 z-10">
        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex-1 flex items-center gap-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full sm:w-[280px] justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                  disabled={(d) => d > new Date() || d < new Date("2000-01-01")}
                />
              </PopoverContent>
            </Popover>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Daily Score</p>
              <p className={cn(
                  "text-4xl font-bold font-headline transition-colors duration-300",
                  totalScore > 0 && "text-chart-2",
                  totalScore < 0 && "text-destructive",
                )}>
                {totalScore > 0 ? `+${totalScore}` : totalScore}
              </p>
            </div>
          </div>
          
          <div className="flex-1 flex flex-col items-center sm:items-end gap-2 w-full sm:w-auto">
            <Button onClick={handleGetMotivation} disabled={isPending || Object.values(selectedActivities).every(v => !v)} className="w-full sm:w-auto">
                {isPending ? <LoaderCircle className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                Get Your Motivation
            </Button>
            {isPending && <p className="text-sm text-muted-foreground animate-pulse">Thinking of a good quote...</p>}
            {motivationalQuote && (
                <Card className="w-full bg-accent/30 border-accent/50 shadow-inner">
                    <CardContent className="p-2 text-center">
                        <p className="text-sm italic text-accent-foreground">"{motivationalQuote}"</p>
                    </CardContent>
                </Card>
            )}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="good-karma" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sticky top-36 z-10">
          <TabsTrigger value="good-karma" className="gap-2">
            <ThumbsUp className="text-chart-2"/> Good Karma
          </TabsTrigger>
          <TabsTrigger value="bad-karma" className="gap-2">
            <ThumbsDown className="text-destructive"/> Needs Improvement
          </TabsTrigger>
        </TabsList>
        <TabsContent value="good-karma">
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-4 md:p-6">
                    <ActivityGrid groupedActivities={goodKarmaGrouped} categories={goodCategories} type="Good" />
                </CardContent>
            </Card>
        </TabsContent>
        <TabsContent value="bad-karma">
            <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
                <CardContent className="p-4 md:p-6">
                    <ActivityGrid groupedActivities={badKarmaGrouped} categories={badCategories} type="Bad" />
                </CardContent>
            </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
