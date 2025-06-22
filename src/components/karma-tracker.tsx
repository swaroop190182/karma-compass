"use client";

import { useState, useEffect, useMemo, useTransition } from 'react';
import { format } from 'date-fns';
import { Sparkles, ThumbsUp, ThumbsDown, LoaderCircle } from 'lucide-react';

import { motivationalMessage } from '@/ai/flows/motivational-message';
import { goodKarmaActivities, badKarmaActivities, type Activity } from '@/lib/activities';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

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
        const activity = [...goodKarmaActivities, ...badKarmaActivities].find(a => a.name === activityName);
        return acc + (activity ? activity.score : 0);
      }
      return acc;
    }, 0);
    setTotalScore(score);
    setMotivationalQuote('');
  }, [selectedActivities]);
  
  const handleActivityToggle = (activityName: string, isChecked: boolean) => {
    setDailyActivities(prev => ({
      ...prev,
      [selectedDateString]: {
        ...(prev[selectedDateString] || {}),
        [activityName]: isChecked,
      },
    }));
  };

  const handleGetMotivation = async () => {
    if (Object.values(selectedActivities).every(v => !v)) {
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

  const ActivityList = ({ title, activities, icon: Icon, iconColor }: { title: string; activities: Activity[]; icon: React.ElementType; iconColor: string; }) => (
    <Card className="flex-1 bg-card/80 backdrop-blur-sm shadow-lg">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-headline">
          <Icon className={cn("w-6 h-6", iconColor)} />
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[30rem] pr-4">
          <div className="space-y-4">
            {activities.map(activity => (
              <div key={activity.name} className="flex items-start space-x-3">
                <Checkbox
                  id={`${selectedDateString}-${activity.name}`}
                  checked={!!selectedActivities[activity.name]}
                  onCheckedChange={checked => handleActivityToggle(activity.name, !!checked)}
                  aria-labelledby={`${selectedDateString}-${activity.name}-label`}
                  className='mt-1'
                />
                <Label htmlFor={`${selectedDateString}-${activity.name}`} id={`${selectedDateString}-${activity.name}-label`} className="cursor-pointer text-sm font-normal leading-snug">
                  {activity.name}
                </Label>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-1 space-y-8">
        <Card className="bg-card/80 backdrop-blur-sm shadow-lg">
          <CardHeader>
            <CardTitle className="font-headline">Select a Date</CardTitle>
            <CardDescription>Pick a day to track your karma.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              className="rounded-md border"
              disabled={(d) => d > new Date() || d < new Date("2000-01-01")}
            />
          </CardContent>
        </Card>

        <Card className="bg-card/80 backdrop-blur-sm shadow-lg sticky top-8">
            <CardHeader>
                <CardTitle className="font-headline">Your Daily Score</CardTitle>
                <CardDescription>
                    {date ? format(date, "PPP") : "No date selected"}
                </CardDescription>
            </CardHeader>
            <CardContent className="text-center py-6">
                <div
                    className={cn(
                        "text-8xl font-bold font-headline transition-colors duration-300",
                        totalScore > 0 && "text-chart-2",
                        totalScore < 0 && "text-destructive",
                    )}
                >
                    {totalScore > 0 ? `+${totalScore}`: totalScore}
                </div>
            </CardContent>
            <CardFooter className="flex-col gap-4">
                <Button onClick={handleGetMotivation} disabled={isPending || Object.values(selectedActivities).every(v => !v)} className="w-full">
                    {isPending ? <LoaderCircle className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                    Get Your Motivation
                </Button>
                {isPending && <p className="text-sm text-muted-foreground animate-pulse">Thinking of a good quote...</p>}
                {motivationalQuote && (
                    <Card className="w-full bg-accent/30 border-accent/50 shadow-inner">
                        <CardContent className="p-4 text-center">
                            <p className="text-base italic text-accent-foreground">"{motivationalQuote}"</p>
                        </CardContent>
                    </Card>
                )}
            </CardFooter>
        </Card>
      </div>

      <div className="lg:col-span-2 flex flex-col md:flex-row gap-8">
        <ActivityList title="Good Karma" activities={goodKarmaActivities} icon={ThumbsUp} iconColor="text-chart-2" />
        <ActivityList title="Needs Improvement" activities={badKarmaActivities} icon={ThumbsDown} iconColor="text-destructive" />
      </div>
    </div>
  );
}
