
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/hooks/use-wallet';
import { useToast } from '@/hooks/use-toast';
import { Award, CheckCircle, Lightbulb } from 'lucide-react';
import type { WeeklyChallenge } from '@/lib/types';
import { cn } from '@/lib/utils';

interface WeeklyChallengeCardProps {
    challenge: WeeklyChallenge;
    isSolved: boolean;
    onSolved: () => void;
}

export function WeeklyChallengeCard({ challenge, isSolved, onSolved }: WeeklyChallengeCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const { addFunds } = useWallet();
    const { toast } = useToast();

    // Assuming one part for now as per mock data
    const puzzlePart = challenge.parts?.[0];

    const handleSubmit = () => {
        if (!puzzlePart || !selectedAnswer) return;

        const correct = selectedAnswer === puzzlePart.answer;
        setIsAnswered(true);
        setIsCorrect(correct);

        if (correct) {
            addFunds(challenge.reward, `You solved the Weekly Challenge!`);
            onSolved();
        } else {
            toast({
                title: "Incorrect Answer",
                description: "That's not quite right. Think it over and try again next week!",
                variant: "destructive"
            });
        }
    };
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Reset state on close
            setSelectedAnswer(null);
            setIsAnswered(false);
            setIsCorrect(false);
        }
        setIsOpen(open);
    }

    return (
        <>
            <Card className="bg-gradient-to-br from-yellow-400/20 via-yellow-500/20 to-amber-600/20 border-yellow-500/50">
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">{challenge.title}</CardTitle>
                    <CardDescription>{challenge.question}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex items-center justify-center p-6 bg-card rounded-lg">
                        <Award className="w-16 h-16 text-yellow-500" />
                    </div>
                </CardContent>
                <CardFooter>
                    {isSolved ? (
                        <Button disabled size="lg" className="w-full bg-green-600 hover:bg-green-600">
                            <CheckCircle className="mr-2"/> Challenge Completed!
                        </Button>
                    ) : (
                         <Button onClick={() => setIsOpen(true)} size="lg" className="w-full">
                            <Lightbulb className="mr-2" /> Start Challenge
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{challenge.title}</DialogTitle>
                        <DialogDescription>{puzzlePart?.question}</DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4">
                        <RadioGroup 
                            onValueChange={setSelectedAnswer} 
                            value={selectedAnswer ?? ''}
                            disabled={isAnswered}
                        >
                            {puzzlePart?.options.map(option => (
                                <div key={option} className={cn(
                                    "flex items-center space-x-2 p-3 rounded-md border transition-colors",
                                    isAnswered && puzzlePart.answer === option && "bg-green-500/20 border-green-500",
                                    isAnswered && puzzlePart.answer !== option && selectedAnswer === option && "bg-red-500/20 border-red-500"
                                )}>
                                    <RadioGroupItem value={option} id={option} />
                                    <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </div>

                    <DialogFooter>
                        {isAnswered ? (
                            <DialogClose asChild>
                                <Button className="w-full">Close</Button>
                            </DialogClose>
                        ) : (
                            <Button onClick={handleSubmit} disabled={!selectedAnswer} className="w-full">
                                Submit Answer
                            </Button>
                        )}
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
}
