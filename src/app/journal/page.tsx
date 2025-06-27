
"use client";

import { useState, useEffect, useMemo, useTransition, type MouseEvent } from 'react';
import { format } from 'date-fns';
import {
  Sparkles, LoaderCircle, Calendar as CalendarIcon, FilePenLine, Bot, Upload,
  BrainCircuit, HeartPulse, Dumbbell, Smile as SmileIcon, Laugh, Meh, Frown, Angry, Mic, CheckCircle2, Lightbulb, Check, FileCheck2, AlertCircle, Lock
} from 'lucide-react';

import { motivationalMessage } from '@/ai/flows/motivational-message';
import { analyzeJournalAndIntentions } from '@/ai/flows/analyze-journal-flow';
import { getHabitTip } from '@/ai/flows/habit-coach-flow';
import { activities, type Activity, badKarmaActivities } from '@/lib/activities';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { KarmaTracker } from '@/components/karma-tracker';
import { StudentQuotes } from '@/components/student-quotes';
import { Textarea } from '@/components/ui/textarea';
import { useWallet } from '@/hooks/use-wallet';
import { useJournal } from '@/hooks/use-journal';
import { Label } from '@/components/ui/label';
import { ReactionAnimation, type AnimationType } from '@/components/reaction-animation';
import { KarmaCompass } from '@/components/karma-compass';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { getNegativeHabitTips } from '@/ai/flows/negative-habit-coach-flow';

const JOURNAL_REWARD_DATES_KEY = 'journal-reward-dates';

const feelings = [
  { name: 'Radiant', icon: Laugh, colorClass: 'text-yellow-400', hoverClass: 'hover:bg-yellow-400/10 hover:border-yellow-400/50', selectedClass: 'bg-yellow-400/20 border-yellow-500 text-yellow-600 dark:text-yellow-300' },
  { name: 'Happy', icon: SmileIcon, colorClass: 'text-green-500', hoverClass: 'hover:bg-green-500/10 hover:border-green-500/50', selectedClass: 'bg-green-500/20 border-green-600 text-green-600 dark:text-green-400' },
  { name: 'Neutral', icon: Meh, colorClass: 'text-slate-500', hoverClass: 'hover:bg-slate-500/10 hover:border-slate-500/50', selectedClass: 'bg-slate-500/20 border-slate-600 text-slate-600 dark:text-slate-400' },
  { name: 'Sad', icon: Frown, colorClass: 'text-blue-500', hoverClass: 'hover:bg-blue-500/10 hover:border-blue-500/50', selectedClass: 'bg-blue-500/20 border-blue-600 text-blue-600 dark:text-blue-400' },
  { name: 'Stressed', icon: Angry, colorClass: 'text-red-500', hoverClass: 'hover:bg-red-500/10 hover:border-red-500/50', selectedClass: 'bg-red-500/20 border-red-600 text-red-600 dark:text-red-400' },
];

export default function JournalPage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  
  const { allEntries, allActivities, updateJournalEntry, updateJournalActivities } = useJournal();
  const [rewardedDates, setRewardedDates] = useState<Set<string>>(new Set());

  const [reflections, setReflections] = useState('');
  const [intentions, setIntentions] = useState('');
  const [mindDump, setMindDump] = useState('');
  const [selectedFeeling, setSelectedFeeling] = useState<string | null>(null);
  
  const [totalScore, setTotalScore] = useState(0);
  const [eqScore, setEqScore] = useState(0);
  const [motivationalQuote, setMotivationalQuote] = useState('');
  const [habitTip, setHabitTip] = useState('');
  const [showScoreCard, setShowScoreCard] = useState(false);

  const [isGettingMotivation, startMotivationTransition] = useTransition();
  const [isAnalyzing, startAnalysisTransition] = useTransition();
  const [isGettingTip, startTipTransition] = useTransition();

  const [proofDialogState, setProofDialogState] = useState<{ isOpen: boolean, activity: Activity | null }>({ isOpen: false, activity: null });
  const [proofText, setProofText] = useState('');
  
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [activitiesForReview, setActivitiesForReview] = useState<Record<string, boolean>>({});

  const { toast } = useToast();
  const { addFunds } = useWallet();

  type AnimationState = { id: number; x: number; y: number; type: AnimationType; };
  const [animations, setAnimations] = useState<AnimationState[]>([]);

  const selectedDateString = date ? format(date, 'yyyy-MM-dd') : '';

  const loggedDates = useMemo(() => {
    return Object.keys(allEntries)
      .filter(dateString => {
        const entry = allEntries[dateString];
        const acts = allActivities[dateString];
        const hasActivities = acts && Object.values(acts).some(v => v);
        const hasText = entry && (entry.reflections || entry.intentions || entry.mindDump);
        return hasActivities || hasText;
      })
      .map(dateString => new Date(dateString + 'T00:00:00'));
  }, [allEntries, allActivities]);

  const averageScores = useMemo(() => {
    const entriesWithScores = Object.values(allEntries).filter(
      (entry) => typeof entry.score === 'number' && typeof entry.eqScore === 'number'
    );

    if (entriesWithScores.length === 0) {
      return { averageKarma: 0, averageEq: 50 }; // Default EQ to neutral
    }

    const totalKarma = entriesWithScores.reduce((sum, entry) => sum + (entry.score ?? 0), 0);
    const totalEq = entriesWithScores.reduce((sum, entry) => sum + (entry.eqScore ?? 0), 0);

    return {
      averageKarma: Math.round(totalKarma / entriesWithScores.length),
      averageEq: Math.round(totalEq / entriesWithScores.length),
    };
  }, [allEntries]);

  useEffect(() => {
    try {
      const storedDates = localStorage.getItem(JOURNAL_REWARD_DATES_KEY);
      if (storedDates) setRewardedDates(new Set(JSON.parse(storedDates)));
    } catch (error) {
      console.error("Failed to read rewarded dates from localStorage", error);
    }
  }, []);

  useEffect(() => {
    if (!selectedDateString) return;

    const currentEntry = allEntries[selectedDateString] || {};
    setReflections(currentEntry.reflections || '');
    setIntentions(currentEntry.intentions || '');
    setMindDump(currentEntry.mindDump || '');
    setSelectedFeeling(currentEntry.feeling || null);

    if (typeof currentEntry.score === 'number') {
      setTotalScore(currentEntry.score);
      setEqScore(currentEntry.eqScore || 0);
      setShowScoreCard(true);
    } else {
      setShowScoreCard(false);
      setTotalScore(0);
      setEqScore(0);
    }
    
    setMotivationalQuote('');
    setHabitTip('');
  }, [date, allEntries, selectedDateString]);

  const selectedActivities = useMemo(() => {
    return allActivities[selectedDateString] || {};
  }, [allActivities, selectedDateString]);
  
  const handleActivityToggle = (activity: Activity, event: MouseEvent<HTMLButtonElement>) => {
    // If deselecting, just toggle it off.
    if (selectedActivities[activity.name]) {
        const newSelected = { ...selectedActivities, [activity.name]: false };
        updateJournalActivities(selectedDateString, newSelected);
        setShowScoreCard(false);
        return;
    }

    // Trigger animation only on selection
    if (activity.animation) {
      const rect = event.currentTarget.getBoundingClientRect();
      setAnimations(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(), // Add random to avoid key collision on rapid clicks
          x: rect.left + rect.width / 2,
          y: rect.top,
          type: activity.animation,
        },
      ]);
    }

    // If selecting and it requires proof, open dialog.
    if (activity.requiresProof) {
        setProofDialogState({ isOpen: true, activity });
    } else {
    // If selecting and no proof needed, just toggle.
        const newSelected = { ...selectedActivities, [activity.name]: true };
        updateJournalActivities(selectedDateString, newSelected);
        setShowScoreCard(false);
    }
  };
  
  const handleFeelingChange = (feelingName: string) => {
    const newFeeling = selectedFeeling === feelingName ? null : feelingName;
    setSelectedFeeling(newFeeling);
    updateJournalEntry(selectedDateString, { feeling: newFeeling });
  }
  
  const handleReflectionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setReflections(e.target.value);
    updateJournalEntry(selectedDateString, { reflections: e.target.value });
  }

  const handleIntentionsChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setIntentions(e.target.value);
    updateJournalEntry(selectedDateString, { intentions: e.target.value });
  }

  const handleMindDumpChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMindDump(e.target.value);
    updateJournalEntry(selectedDateString, { mindDump: e.target.value });
  }

  const handleGetMotivation = async () => {
    if (Object.values(selectedActivities).every(v => !v)) {
        toast({
            title: "No activities selected",
            description: "Please select at least one activity to get a motivational message.",
            variant: "destructive",
        });
        return;
    }
    
    startMotivationTransition(async () => {
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

  const handleAnalyzeJournal = () => {
    if (!reflections && !intentions) {
        toast({
            title: "Journal is empty",
            description: "Please write in your reflections or intentions before analyzing.",
            variant: "destructive",
        });
        return;
    }

    startAnalysisTransition(async () => {
        try {
            const allActivityNames = activities.map(a => a.name);
            const result = await analyzeJournalAndIntentions({
                journalText: reflections,
                intentionsText: intentions,
                activityList: allActivityNames
            });

            const currentActivities = allActivities[selectedDateString] || {};
            const updatedActivitiesFromAI = { ...currentActivities };
            result.identifiedActivities.forEach(name => {
                updatedActivitiesFromAI[name] = true;
            });
            
            updateJournalActivities(selectedDateString, updatedActivitiesFromAI);
            
            let toastDescription = "";
            if (result.identifiedActivities.length > 0) {
                toastDescription += `Logged ${result.identifiedActivities.length} activities. `;
            }

            if (result.plannerTasks.length > 0) {
                localStorage.setItem('newPlannerTasks', JSON.stringify(result.plannerTasks));
                toastDescription += `Added ${result.plannerTasks.length} tasks to your planner.`;
            }
            
            if(result.identifiedActivities.length > 0) setShowScoreCard(false);

            toast({
                title: "Analysis Complete",
                description: toastDescription || "No new activities or tasks found.",
            });

        } catch (error) {
            console.error("Failed to analyze journal:", error);
            toast({
                title: 'Analysis Error',
                description: 'Could not analyze your journal entries. Please try again.',
                variant: 'destructive',
            });
        }
    });
  };

  const handleStartReview = () => {
    const hasPositiveActivities = Object.keys(selectedActivities).some(name => {
        const activity = activities.find(a => a.name === name);
        return selectedActivities[name] && activity?.type === 'Good';
    });


    if (!hasPositiveActivities) {
      toast({
        title: "No Positive Activities Logged",
        description: "Please log at least one positive activity before saving your day.",
        variant: "destructive",
      });
      return;
    }
    setActivitiesForReview({ ...selectedActivities });
    setIsReviewOpen(true);
  };

  const handleFinalizeDay = () => {
    updateJournalActivities(selectedDateString, activitiesForReview);

    const score = Object.keys(activitiesForReview).reduce((acc, activityName) => {
      if (activitiesForReview[activityName]) {
        const activity = activities.find(a => a.name === activityName);
        return acc + (activity ? activity.score : 0);
      }
      return acc;
    }, 0);
    
    const feelingScores: { [key: string]: number } = { 'Radiant': 20, 'Happy': 10, 'Neutral': 0, 'Sad': -10, 'Stressed': -15 };
    const eqActivityScores: Record<string, number> = {
      'Help Classmate': 5, 'Be Kind': 5, 'Listen': 3, 'Apologize': 4, 'Family Time': 5, 'Volunteer': 7, 'Be Polite': 3, 'Resist Peer Pressure': 5,
      'Meditate': 3, 'Journal': 4, 'Gratitude': 5,
      'Bullied Someone': -10, 'Gossiped': -5, 'Ignored Someone': -7, 'Was Argumentative': -5, 'Was Rude': -6, 'Lacked Empathy': -8, 'Mocked Others': -7,
    };
    
    const feelingScore = selectedFeeling ? (feelingScores[selectedFeeling] || 0) : 0;

    const activityEqScore = Object.keys(activitiesForReview).reduce((acc, activityName) => {
        if (activitiesForReview[activityName]) {
            const eqValue = eqActivityScores[activityName];
            if (typeof eqValue === 'number') {
                return acc + eqValue;
            }
        }
        return acc;
    }, 0);

    let calculatedEq = 50 + feelingScore + activityEqScore;
    calculatedEq = Math.max(0, Math.min(100, Math.round(calculatedEq)));

    const finalEqScore = isNaN(calculatedEq) ? 50 : calculatedEq;
    setEqScore(finalEqScore);
    
    setTotalScore(score);
    updateJournalEntry(selectedDateString, { score: score, eqScore: finalEqScore });

    if (!rewardedDates.has(selectedDateString)) {
        const allReviewedActivities = Object.keys(activitiesForReview)
            .filter(name => activitiesForReview[name])
            .map(name => activities.find(a => a.name === name))
            .filter((a): a is Activity => !!a);
        
        const hasPositive = allReviewedActivities.some(a => a.type === 'Good');
        const hasNegative = allReviewedActivities.some(a => a.type === 'Bad');

        if (hasPositive && hasNegative) {
            addFunds(15, "Great job on a balanced reflection! You earned a bonus.");
        } else if (hasPositive) {
            addFunds(5, "You earned a reward for journaling. Add a challenge next time for a bonus!");
        }

        if (hasPositive) {
            const newRewardedDates = new Set(rewardedDates);
            newRewardedDates.add(selectedDateString);
            setRewardedDates(newRewardedDates);
            localStorage.setItem(JOURNAL_REWARD_DATES_KEY, JSON.stringify(Array.from(newRewardedDates)));
        }
    }

    setMotivationalQuote('');
    setHabitTip('');
    setShowScoreCard(true);

    const positiveActivities = Object.keys(activitiesForReview).filter(activityName => {
        if (activitiesForReview[activityName]) {
            const activity = activities.find(a => a.name === activityName);
            return activity?.type === 'Good';
        }
        return false;
    });

    if (positiveActivities.length > 0) {
        const randomActivity = positiveActivities[Math.floor(Math.random() * positiveActivities.length)];
        startTipTransition(async () => {
            try {
                const result = await getHabitTip({ habitName: randomActivity });
                setHabitTip(result.tip);
            } catch (error) {
                console.error('Failed to get habit tip:', error);
            }
        });
    }
    
    setIsReviewOpen(false);
  };

  const handleSubmitProof = () => {
    if (!proofDialogState.activity) return;

    if (!proofText.trim()) {
        toast({
            title: "Proof Required",
            description: "Please provide a brief description of how you completed the task.",
            variant: "destructive",
        });
        return;
    }
    
    const { activity } = proofDialogState;
    
    const newSelected = { ...selectedActivities, [activity.name]: true };
    updateJournalActivities(selectedDateString, newSelected);
    
    const currentEntry = allEntries[selectedDateString];
    const newProofs = { ...(currentEntry?.proofs || {}), [activity.name]: proofText };
    updateJournalEntry(selectedDateString, { proofs: newProofs });

    setShowScoreCard(false);
    setProofDialogState({ isOpen: false, activity: null });
    setProofText('');

    toast({
        title: "Activity Logged!",
        description: `Your proof for "${activity.name}" has been saved.`
    });
  };

  const handleAnimationEnd = (id: number) => {
    setAnimations(prev => prev.filter(anim => anim.id !== id));
  };
  
  const handleNegativeActivityToggleInDialog = (activity: Activity, event: MouseEvent<HTMLButtonElement>) => {
    const isSelected = !!activitiesForReview[activity.name];

    setActivitiesForReview(prev => ({
        ...prev,
        [activity.name]: !isSelected,
    }));

    // Trigger animation only on selection
    if (!isSelected && activity.animation) {
        const rect = event.currentTarget.getBoundingClientRect();
        setAnimations(prev => [
            ...prev,
            {
                id: Date.now() + Math.random(),
                x: rect.left + rect.width / 2,
                y: rect.top,
                type: activity.animation,
            },
        ]);
    }
  };
  
  const hasNegativeInReview = useMemo(() => {
    return Object.keys(activitiesForReview).some(name => {
        const activity = activities.find(a => a.name === name);
        return activity?.type === 'Bad' && activitiesForReview[name];
    });
  }, [activitiesForReview]);

  return (
    <div className="min-h-screen text-foreground font-body">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="flex items-center justify-between gap-4 mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex-shrink-0">
              Record Your Day
          </h1>
          <div className="flex-1 flex justify-center">
            <KarmaCompass score={averageScores.averageKarma} eqScore={averageScores.averageEq} />
          </div>
          <div className="flex-shrink-0">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-auto sm:w-[280px] justify-start text-left font-normal text-base",
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
                  modifiers={{ logged: loggedDates }}
                  modifiersClassNames={{
                      logged: 'bg-primary/20',
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </header>
        
        <Card className="mb-8">
            <CardHeader>
                <CardTitle className="flex items-center gap-3"><SmileIcon /> How are you feeling today?</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
                {feelings.map(feeling => {
                    const isSelected = selectedFeeling === feeling.name;
                    return (
                        <Button
                            key={feeling.name}
                            variant="outline"
                            onClick={() => handleFeelingChange(feeling.name)}
                            className={cn(
                                "flex-1 sm:flex-auto font-semibold transition-all duration-200 ease-in-out transform hover:scale-105",
                                !isSelected && feeling.hoverClass,
                                isSelected ? feeling.selectedClass : 'text-foreground'
                            )}
                        >
                            <feeling.icon
                                className={cn("mr-2 h-5 w-5 transition-colors", !isSelected && feeling.colorClass)}
                            />
                            {feeling.name}
                        </Button>
                    )
                })}
            </CardContent>
        </Card>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                     <CardTitle className="flex items-center gap-3"><FilePenLine /> Daily Journal &amp; Intentions</CardTitle>
                     <CardDescription>Reflect on your day, set intentions, and clear your mind. Your entries are private.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2 p-4 border rounded-lg bg-muted/20">
                        <label className="text-sm font-medium block">Reflections &amp; Gratitude</label>
                        <Textarea placeholder="What went well? What are you grateful for? The AI will log your activities from this." rows={3} value={reflections} onChange={handleReflectionsChange}/>
                         <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm"><Upload className="mr-2" /> Upload Photo</Button>
                            <Button variant="outline" size="sm"><Mic className="mr-2" /> Record Voice</Button>
                         </div>
                    </div>

                    <div className="space-y-2 p-4 border rounded-lg bg-muted/20">
                        <label className="text-sm font-medium block">Intentions for Tomorrow</label>
                        <Textarea placeholder="What positive actions will you take tomorrow? The AI will create planner tasks from this." rows={3} value={intentions} onChange={handleIntentionsChange}/>
                        <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="sm"><Upload className="mr-2" /> Upload Photo</Button>
                            <Button variant="outline" size="sm"><Mic className="mr-2" /> Record Voice</Button>
                         </div>
                    </div>
                    
                    <div className="space-y-2 p-4 border rounded-lg bg-muted/20">
                        <label className="text-sm font-medium block">Mind Dump</label>
                        <Textarea placeholder="Any other thoughts, worries, or ideas? Let them go here." rows={3} value={mindDump} onChange={handleMindDumpChange}/>
                    </div>

                    <div className="flex justify-end pt-2">
                        <Button onClick={handleAnalyzeJournal} disabled={isAnalyzing}>
                            {isAnalyzing ? <LoaderCircle className="animate-spin mr-2" /> : <Bot className="mr-2" />}
                            Analyze Journal &amp; Create Plan
                        </Button>
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
                <CardFooter className="justify-end pt-4">
                  <Button onClick={handleStartReview} size="lg">
                    <CheckCircle2 className="mr-2" />
                    Review & Save Day
                  </Button>
                </CardFooter>
            </Card>

            {showScoreCard && (
              <Card className="text-center bg-primary/10 border-primary/20">
                  <CardHeader>
                      <CardTitle>Your Karma Score for {date ? format(date, "PPP") : ''}</CardTitle>
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
                      <Button onClick={handleGetMotivation} disabled={isGettingMotivation || Object.values(selectedActivities).every(v => !v)} size="lg">
                          {isGettingMotivation ? <LoaderCircle className="animate-spin mr-2" /> : <Sparkles className="mr-2 h-4 w-4" />}
                          Get Motivation for This Day
                      </Button>
                      {isGettingMotivation && <p className="text-sm text-muted-foreground animate-pulse">Thinking of a good quote...</p>}
                      {motivationalQuote && (
                          <Card className="w-full bg-accent/50 border-accent shadow-inner">
                              <CardContent className="p-3">
                                  <p className="text-base italic text-accent-foreground">"{motivationalQuote}"</p>
                              </CardContent>
                          </Card>
                      )}
                  </CardContent>
                  
                  {(habitTip || isGettingTip) && (
                    <CardFooter className="flex-col items-center gap-2 pt-4 border-t border-primary/20">
                        {isGettingTip ? (
                            <div className="flex items-center justify-center text-muted-foreground text-xs gap-2 pb-4">
                                <LoaderCircle className="w-3 h-3 animate-spin"/> Aura is thinking of a habit tip...
                            </div>
                        ) : habitTip ? (
                            <>
                                <div className="flex items-center gap-2 font-semibold text-accent-foreground">
                                    <Lightbulb className="w-5 h-5 text-yellow-500"/>
                                    Habit Coach Tip
                                </div>
                                <p className="text-sm italic text-muted-foreground">"{habitTip}"</p>
                            </>
                        ) : null}
                    </CardFooter>
                  )}
              </Card>
            )}

            <StudentQuotes />
        </div>
      </main>
      
      <Dialog open={proofDialogState.isOpen} onOpenChange={(isOpen) => setProofDialogState({ isOpen, activity: isOpen ? proofDialogState.activity : null })}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    <FileCheck2 />
                    Provide Proof for "{proofDialogState.activity?.name}"
                </DialogTitle>
                <DialogDescription>
                    Adding a small note helps you reflect on your accomplishments and builds accountability.
                </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-2">
                <div className="space-y-2">
                    <Label htmlFor="proof-text">Describe how you completed this task</Label>
                    <Textarea 
                        id="proof-text"
                        placeholder="e.g., I finished all the math problems in chapter 5."
                        value={proofText}
                        onChange={(e) => setProofText(e.target.value)}
                        rows={3}
                    />
                </div>
                 <div className="flex gap-2 pt-2">
                    <Button variant="outline" size="sm" className="w-full"><Upload className="mr-2" /> Upload Photo</Button>
                    <Button variant="outline" size="sm" className="w-full"><Mic className="mr-2" /> Record Voice</Button>
                 </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant="ghost">Cancel</Button>
                </DialogClose>
                <Button onClick={handleSubmitProof}><Check className="mr-2"/> Submit & Log Activity</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isReviewOpen} onOpenChange={setIsReviewOpen}>
        <DialogContent className="sm:max-w-lg">
            <DialogHeader>
                <DialogTitle>Final Daily Review</DialogTitle>
                <DialogDescription>
                    Before you save, take a moment to reflect on any challenges. Honesty is key to growth.
                </DialogDescription>
            </DialogHeader>
            <div className="max-h-[60vh] overflow-y-auto pr-4">
                <div className="space-y-4 py-2">
                    <div>
                        <h4 className="font-semibold text-foreground flex items-center gap-2">
                            <AlertCircle className="text-yellow-500" /> Any Challenges?
                        </h4>
                        <p className="text-xs text-muted-foreground mb-3 flex items-center gap-2"><Lock className="w-3 h-3" /> Your reflections on challenges are always private to you.</p>
                        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 pt-2">
                            {badKarmaActivities.map(activity => {
                                const isSelected = !!activitiesForReview[activity.name];
                                return (
                                    <button
                                        key={activity.name}
                                        onClick={(e) => handleNegativeActivityToggleInDialog(activity, e)}
                                        className={cn(
                                            'flex flex-col items-center justify-center p-1 gap-1 rounded-lg border-2 transition-all aspect-square shadow-sm text-center',
                                            'hover:shadow-md hover:scale-[1.03]',
                                            isSelected
                                            ? 'bg-muted border-foreground/50 shadow-lg scale-105 animate-shake'
                                            : 'bg-card border-input hover:border-destructive/50'
                                        )}
                                    >
                                        <activity.icon className="w-4 h-4 shrink-0" />
                                        <span className="text-[10px] font-semibold leading-tight">{activity.name}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                    <Alert variant={hasNegativeInReview ? 'default' : 'destructive'} className={cn(hasNegativeInReview && 'bg-green-500/10 border-green-500/20')}>
                        <Lightbulb className="h-4 w-4" />
                        <AlertTitle>{hasNegativeInReview ? "Bonus Unlocked!" : "Unlock Your Bonus!"}</AlertTitle>
                        <AlertDescription>
                            {hasNegativeInReview
                              ? "Great! You've reflected on both wins and challenges. You'll get a bonus reward!"
                              : "Log at least one challenge to unlock your full journaling bonus. Growth comes from reflecting on the tough stuff too!"}
                        </AlertDescription>
                    </Alert>
                </div>
            </div>
            <DialogFooter className="sm:justify-between items-center pt-4 border-t">
                 <p className="text-sm text-muted-foreground text-left hidden sm:block">Your final score will be calculated.</p>
                <div className="flex gap-2">
                    <Button variant="ghost" onClick={() => setIsReviewOpen(false)}>Cancel</Button>
                    <Button onClick={handleFinalizeDay}>
                        {hasNegativeInReview ? "Save & Get Bonus" : "Save & Finalize"}
                    </Button>
                </div>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      {animations.map(anim => (
        <ReactionAnimation
          key={anim.id}
          x={anim.x}
          y={anim.y}
          type={anim.type}
          onEnd={() => handleAnimationEnd(anim.id)}
        />
      ))}
    </div>
  );
}

    