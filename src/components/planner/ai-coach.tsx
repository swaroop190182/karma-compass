"use client";

import { useState, useTransition } from 'react';
import { Lightbulb, CheckCircle, LoaderCircle, AlertTriangle, Sparkles } from 'lucide-react';
import Image from 'next/image';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { getAuraFeedback, type AuraCoachOutput } from '@/ai/flows/aura-coach-flow';
import type { PlannerTask } from '@/lib/types';
import { Separator } from '../ui/separator';

interface AiCoachProps {
    tasks: PlannerTask[];
}

export function AiCoach({ tasks }: AiCoachProps) {
    const [feedback, setFeedback] = useState<AuraCoachOutput | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isAnalyzing, startAnalysisTransition] = useTransition();
    const { toast } = useToast();

    const handleGetFeedback = () => {
        startAnalysisTransition(async () => {
            setError(null);
            try {
                const result = await getAuraFeedback({ tasks });
                setFeedback(result);
            } catch (e) {
                console.error("Failed to get feedback from Aura:", e);
                setError("Aura is taking a little break. Please try again in a moment.");
                toast({
                    title: 'Analysis Error',
                    description: 'Could not get feedback from Aura. Please try again.',
                    variant: 'destructive',
                });
            }
        });
    };

    return (
        <Card className="min-h-[400px]">
            <CardHeader className="flex flex-row items-start gap-4">
                <Image 
                    src="https://placehold.co/100x100.png"
                    alt="Aura AI Coach Avatar" 
                    width={80} 
                    height={80} 
                    className="rounded-full border-2 border-primary/50"
                    data-ai-hint="abstract avatar"
                />
                <div className="flex-1">
                    <CardTitle className="flex items-center gap-3 text-2xl">Aura - Your AI Wellness Coach</CardTitle>
                    <CardDescription>Get personalized insights and suggestions based on your progress.</CardDescription>
                </div>
            </CardHeader>
            <Separator />
            <CardContent className="pt-6 text-center flex flex-col items-center justify-center min-h-[250px]">
                {!feedback && !isAnalyzing && !error && (
                    <div className="space-y-4">
                        <Lightbulb className="mx-auto h-12 w-12 text-yellow-400" />
                        <h3 className="text-xl font-semibold">Ready for some insights?</h3>
                        <p className="text-muted-foreground">Click the button below to let Aura analyze your journey!</p>
                        <Button onClick={handleGetFeedback} size="lg" className="mt-4">
                            <Sparkles className="mr-2" /> Ask Aura for Feedback
                        </Button>
                    </div>
                )}
                
                {isAnalyzing && (
                    <div className="space-y-4">
                        <LoaderCircle className="mx-auto h-12 w-12 animate-spin text-primary" />
                        <h3 className="text-xl font-semibold">Aura is thinking...</h3>
                        <p className="text-muted-foreground">Analyzing your day to provide the best insights.</p>
                    </div>
                )}

                {error && !isAnalyzing && (
                     <div className="space-y-4 text-destructive">
                        <AlertTriangle className="mx-auto h-12 w-12" />
                        <h3 className="text-xl font-semibold">Oops! Something went wrong.</h3>
                        <p>{error}</p>
                        <Button onClick={handleGetFeedback} size="lg" variant="destructive" className="mt-4">
                            Try Again
                        </Button>
                    </div>
                )}

                {feedback && !isAnalyzing && (
                    <div className="w-full text-left space-y-6">
                        <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-lg font-semibold"><Lightbulb className="text-yellow-400" /> Aura's Insights</h4>
                            <ul className="space-y-2 list-disc list-inside pl-4 text-muted-foreground">
                                {feedback.insights.map((insight, i) => <li key={`insight-${i}`}>{insight}</li>)}
                            </ul>
                        </div>
                         <div className="space-y-3">
                            <h4 className="flex items-center gap-2 text-lg font-semibold"><CheckCircle className="text-green-500" /> Actionable Suggestions</h4>
                            <ul className="space-y-2 list-disc list-inside pl-4 text-muted-foreground">
                                {feedback.suggestions.map((suggestion, i) => <li key={`suggestion-${i}`}>{suggestion}</li>)}
                            </ul>
                        </div>
                        <div className="text-center pt-4">
                            <Button onClick={handleGetFeedback} variant="outline">
                                <Sparkles className="mr-2" /> Re-analyze My Day
                            </Button>
                        </div>
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
