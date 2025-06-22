"use client";

import { useState, useEffect, useMemo, useTransition } from 'react';
import { format } from 'date-fns';
import {
  Sparkles, LoaderCircle, Calendar as CalendarIcon, FilePenLine, Bot, Upload,
  BrainCircuit, HeartPulse, Dumbbell, Smile as SmileIcon, Laugh, Meh, Frown, Angry
} from 'lucide-react';

import { motivationalMessage } from '@/ai/flows/motivational-message';
import { activities } from '@/lib/activities';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useToast } from '@/hooks/use-toast';
import { KarmaTracker } from '@/components/karma-tracker';
import { StudentQuotes } from '@/components/student-quotes';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';

const feelings = [
  { name: 'Radiant', icon: Laugh },
  { name: 'Happy', icon: SmileIcon },
  { name: 'Neutral', icon: Meh },
  { name: 'Sad', icon: Frown },
  { name: 'Stressed', icon: Angry },
];

export default function Home() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [dailyActivities, setDailyActivities] = useState<Record<string, Record<string, boolean>>>({});
  const [totalScore, setTotalScore] = useState(0);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);

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

  return (
    <div className="bg-background min-h-screen text-foreground font-body">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex flex-wrap justify-between items-center gap-4 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                Record Your Day
            </h1>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[280px] justify-start text-left font-normal text-base",
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
        </header>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><SmileIcon /> How are you feeling today?</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                    {feelings.map(feeling => (
                        <Button key={feeling.name} variant={selectedFeeling === feeling.name ? 'default' : 'outline'} onClick={() => setSelectedFeeling(feeling.name)} className="flex-1 sm:flex-auto">
                            <feeling.icon className="mr-2" />
                            {feeling.name}
                        </Button>
                    ))}
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-3"><FilePenLine /> Daily Journal & Intentions</CardTitle>
                     <CardDescription>Reflect on your day, set intentions, and clear your mind. Your entries are private.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div>
                        <label className="text-sm font-medium block mb-2">Reflections & Gratitude</label>
                        <Textarea placeholder="What went well? What are you grateful for?" rows={3} />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-2">Intentions for Tomorrow</label>
                        <Textarea placeholder="What positive actions will you take tomorrow?" rows={3} />
                    </div>
                    <div>
                        <label className="text-sm font-medium block mb-2">Mind Dump</label>
                        <Textarea placeholder="Any other thoughts, worries, or ideas? Let them go here." rows={3} />
                    </div>
                    <div className="flex justify-end pt-2">
                        <Button variant="default">Analyze Journal & Activities</Button>
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3"><Sparkles /> Inspired to Act?</CardTitle>
                    <CardDescription>Get ideas for positive actions based on common student goals.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <Button variant="secondary" size="lg"><Dumbbell /> Boost Well-being</Button>
                    <Button variant="secondary" size="lg"><BrainCircuit /> Improve Focus</Button>
                    <Button variant="secondary" size="lg"><HeartPulse /> Enhance Relationships</Button>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>Log Your Day: {date ? format(date, "PPP") : ''}</CardTitle>
                    <CardDescription>Select activities you performed. Green activities add to your score, red ones subtract.</CardDescription>
                </CardHeader>
                <CardContent>
                    <KarmaTracker selectedActivities={selectedActivities} onActivityToggle={handleActivityToggle} />
                </CardContent>
            </Card>

            <Card className="text-center bg-primary/10 border-primary/20">
                <CardHeader>
                    <CardTitle>Your Karma Score</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center gap-4">
                    <p className={cn(
                        "text-6xl font-bold font-headline transition-colors duration-300",
                        totalScore > 0 && "text-green-600",
                        totalScore < 0 && "text-destructive",
                        totalScore === 0 && "text-muted-foreground"
                      )}>
                      {totalScore > 0 ? `+${totalScore}` : totalScore}
                    </p>
                    <Button onClick={handleGetMotivation} disabled={isPending || Object.values(selectedActivities).every(v => !v)} size="lg">
                        {isPending ? <LoaderCircle className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                        Get Today's Motivation
                    </Button>
                    {isPending && <p className="text-sm text-muted-foreground animate-pulse">Thinking of a good quote...</p>}
                    {motivationalQuote && (
                        <Card className="w-full bg-accent/50 border-accent shadow-inner">
                            <CardContent className="p-3">
                                <p className="text-base italic text-accent-foreground">"{motivationalQuote}"</p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>

            <StudentQuotes />
        </div>
      </main>
    </div>
  );
}
