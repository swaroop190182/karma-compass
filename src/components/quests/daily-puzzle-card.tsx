
"use client";

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useWallet } from '@/hooks/use-wallet';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, Lightbulb, History, Microscope, Sigma, BrainCircuit, BookText, XCircle } from 'lucide-react';
import type { DailyPuzzle } from '@/lib/types';
import { cn } from '@/lib/utils';

interface DailyPuzzleCardProps {
    puzzle: DailyPuzzle;
    isAttempted: boolean;
    isSolved: boolean;
    onAttempted: (puzzleId: string, wasCorrect: boolean) => void;
}

const categoryIcons = {
    'Science': { icon: Microscope, color: 'text-blue-500' },
    'Math': { icon: Sigma, color: 'text-red-500' },
    'History': { icon: History, color: 'text-amber-600' },
    'Logical Reasoning': { icon: BrainCircuit, color: 'text-purple-500' },
    'Vocabulary': { icon: BookText, color: 'text-green-500' },
};


export function DailyPuzzleCard({ puzzle, isAttempted, isSolved, onAttempted }: DailyPuzzleCardProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);
    const { addFunds } = useWallet();
    const { toast } = useToast();
    
    const CategoryIcon = categoryIcons[puzzle.category].icon;
    const categoryColor = categoryIcons[puzzle.category].color;

    const handleSubmit = () => {
        if (!selectedAnswer) return;

        const correct = selectedAnswer === puzzle.answer;
        setIsAnswered(true);
        setIsCorrect(correct);
        onAttempted(puzzle.id, correct);

        if (correct) {
            addFunds(puzzle.reward, `You solved the ${puzzle.category} puzzle!`);
        } else {
            toast({
                title: "Incorrect Answer",
                description: "That's not quite right. The correct answer has been highlighted.",
                variant: "destructive"
            });
        }
    };
    
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            // Reset dialog-specific state on close if it hasn't been answered in this session
            if (!isAnswered) {
                setSelectedAnswer(null);
            }
        }
        setIsOpen(open);
    }

    return (
        <>
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-3">
                        <CategoryIcon className={cn("w-6 h-6", categoryColor)} />
                        {puzzle.category}
                    </CardTitle>
                    <CardDescription className="h-10">{puzzle.question}</CardDescription>
                </CardHeader>
                 <CardFooter>
                    {isSolved ? (
                        <Button disabled className="w-full bg-green-600 hover:bg-green-600">
                            <CheckCircle className="mr-2"/> Solved for ₹{puzzle.reward}
                        </Button>
                    ) : isAttempted ? (
                        <Button onClick={() => setIsOpen(true)} variant="secondary" className="w-full">
                            <XCircle className="mr-2"/> View Attempt
                        </Button>
                    ) : (
                         <Button onClick={() => setIsOpen(true)} className="w-full">
                            <Lightbulb className="mr-2" /> Solve Puzzle
                        </Button>
                    )}
                </CardFooter>
            </Card>

            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{puzzle.category} Puzzle</DialogTitle>
                        <DialogDescription>{puzzle.question}</DialogDescription>
                    </DialogHeader>
                    
                    <div className="py-4">
                        <RadioGroup 
                            onValueChange={setSelectedAnswer} 
                            value={selectedAnswer ?? ''}
                            disabled={isAttempted || isAnswered}
                        >
                            {puzzle.options.map(option => {
                                const showResult = isAttempted || isAnswered;
                                return (
                                    <div key={option} className={cn(
                                        "flex items-center space-x-2 p-3 rounded-md border transition-colors",
                                        showResult && puzzle.answer === option && "bg-green-500/20 border-green-500 text-green-800 dark:text-green-300 font-semibold",
                                        showResult && puzzle.answer !== option && selectedAnswer === option && "bg-red-500/20 border-red-500 text-red-800 dark:text-red-400"
                                    )}>
                                        <RadioGroupItem value={option} id={option} />
                                        <Label htmlFor={option} className="flex-1 cursor-pointer">{option}</Label>
                                    </div>
                                )
                            })}
                        </RadioGroup>
                    </div>

                    <DialogFooter>
                        {(isAttempted || isAnswered) ? (
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
