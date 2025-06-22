
"use client";

import { useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet';
import { CheckCircle, Lightbulb } from 'lucide-react';
import type { WordSearchPuzzle } from '@/lib/types';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface WordSearchCardProps {
    puzzle: WordSearchPuzzle;
    isSolved: boolean;
    onSolved: () => void;
}

type Cell = { row: number; col: number };

export function WordSearchCard({ puzzle, isSolved, onSolved }: WordSearchCardProps) {
    const { addFunds } = useWallet();
    const { toast } = useToast();
    const [isSelecting, setIsSelecting] = useState(false);
    const [startCell, setStartCell] = useState<Cell | null>(null);
    const [endCell, setEndCell] = useState<Cell | null>(null);
    const [foundWords, setFoundWords] = useState<Set<string>>(new Set());
    const [foundCells, setFoundCells] = useState<Set<string>>(new Set());

    const calculatePath = useCallback((start: Cell, end: Cell): Cell[] => {
        const path: Cell[] = [];
        const dr = end.row - start.row;
        const dc = end.col - start.col;
        const len = Math.max(Math.abs(dr), Math.abs(dc)) + 1;

        if (dr === 0 || dc === 0 || Math.abs(dr) === Math.abs(dc)) {
            const stepR = Math.sign(dr);
            const stepC = Math.sign(dc);

            for (let i = 0; i < len; i++) {
                path.push({ row: start.row + i * stepR, col: start.col + i * stepC });
            }
        }
        return path;
    }, []);

    const selectionPath = useMemo(() => {
        if (!isSelecting || !startCell || !endCell) return new Set<string>();
        const path = calculatePath(startCell, endCell);
        return new Set(path.map(({ row, col }) => `${row}-${col}`));
    }, [isSelecting, startCell, endCell, calculatePath]);

    const handleMouseDown = (row: number, col: number) => {
        if (isSolved) return;
        setIsSelecting(true);
        setStartCell({ row, col });
        setEndCell({ row, col });
    };

    const handleMouseEnter = (row: number, col: number) => {
        if (isSelecting) {
            setEndCell({ row, col });
        }
    };

    const handleMouseUp = () => {
        if (!isSelecting || !startCell || !endCell) return;

        const path = calculatePath(startCell, endCell);
        if (path.length > 1) {
            const selectedWord = path.map(({ row, col }) => puzzle.grid[row][col]).join('');
            const reversedWord = selectedWord.split('').reverse().join('');
            const wordToFind = puzzle.words.find(w => w === selectedWord || w === reversedWord);

            if (wordToFind && !foundWords.has(wordToFind)) {
                const newFoundWords = new Set(foundWords).add(wordToFind);
                setFoundWords(newFoundWords);

                const newFoundCells = new Set(foundCells);
                path.forEach(({ row, col }) => newFoundCells.add(`${row}-${col}`));
                setFoundCells(newFoundCells);
                
                toast({ title: "Word Found!", description: `You found "${wordToFind}"!` });

                if (newFoundWords.size === puzzle.words.length) {
                    addFunds(puzzle.reward, `You solved the ${puzzle.title} puzzle!`);
                    onSolved();
                }
            }
        }

        setIsSelecting(false);
        setStartCell(null);
        setEndCell(null);
    };

    return (
        <Card onMouseUp={handleMouseUp} onMouseLeave={handleMouseUp}>
            <CardHeader>
                <CardTitle>{puzzle.title}</CardTitle>
                <CardDescription>Find all the hidden words in the grid below. Words can be horizontal, vertical, or diagonal.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row gap-6">
                <div className="flex-shrink-0 grid select-none" style={{ gridTemplateColumns: `repeat(${puzzle.grid[0].length}, minmax(0, 1fr))` }}>
                    {puzzle.grid.map((row, rowIndex) =>
                        row.map((letter, colIndex) => {
                            const cellKey = `${rowIndex}-${colIndex}`;
                            const isSelected = selectionPath.has(cellKey);
                            const isFound = foundCells.has(cellKey);
                            return (
                                <div
                                    key={cellKey}
                                    onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
                                    onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
                                    className={cn(
                                        "flex items-center justify-center aspect-square text-sm md:text-base font-bold border border-transparent transition-colors",
                                        !isSolved && "cursor-pointer",
                                        isFound && "bg-primary/30 text-primary-foreground rounded-md",
                                        isSelected && "bg-primary/60 rounded-md ring-2 ring-primary"
                                    )}
                                >
                                    {letter}
                                </div>
                            );
                        })
                    )}
                </div>
                <div className="flex-grow">
                    <h3 className="font-semibold mb-3">Words to Find:</h3>
                    <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-x-4 gap-y-2">
                        {puzzle.words.map(word => (
                            <li key={word} className={cn(
                                "text-muted-foreground transition-all",
                                (foundWords.has(word) || isSolved) && "line-through text-foreground font-semibold"
                            )}>
                                {word}
                            </li>
                        ))}
                    </ul>
                </div>
            </CardContent>
             <CardFooter>
                {isSolved && (
                    <Button disabled className="w-full bg-green-600 hover:bg-green-600">
                        <CheckCircle className="mr-2"/> Solved for ₹{puzzle.reward}
                    </Button>
                )}
            </CardFooter>
        </Card>
    );
}
