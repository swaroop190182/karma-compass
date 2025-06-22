"use client";

import { useState, useMemo, useTransition, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Bot, GraduationCap, School, BookOpen, Send, LoaderCircle, User, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { boards, grades, subjectsByBoardAndGrade, type Board, type Grade, type Subject } from '@/lib/education';
import { getTutorResponse } from '@/ai/flows/tutor-flow';

type Message = {
    role: 'user' | 'model';
    content: string;
};

export default function TutorPage() {
    const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
    const [selectedGrade, setSelectedGrade] = useState<Grade | null>(null);
    const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);

    const [isConfigured, setIsConfigured] = useState(false);

    const [messages, setMessages] = useState<Message[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isLumaTyping, startLumaResponseTransition] = useTransition();
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const availableGrades = useMemo(() => {
        if (selectedBoard) return grades;
        return [];
    }, [selectedBoard]);

    const availableSubjects = useMemo(() => {
        if (selectedBoard && selectedGrade) {
            return subjectsByBoardAndGrade[selectedBoard]?.[selectedGrade] || [];
        }
        return [];
    }, [selectedBoard, selectedGrade]);
    
    useEffect(() => {
        // Reset subsequent fields when a parent field changes
        setSelectedGrade(null);
        setSelectedSubject(null);
    }, [selectedBoard]);
    
    useEffect(() => {
        setSelectedSubject(null);
    }, [selectedGrade]);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);


    const handleStartChatting = () => {
        if (selectedBoard && selectedGrade && selectedSubject) {
            setMessages([
                { role: 'model', content: `Hello! I'm Luma, your personal AI tutor. I'm ready to help you with ${selectedSubject.name}. What would you like to learn about today?` }
            ]);
            setIsConfigured(true);
        } else {
            toast({
                title: 'Configuration Incomplete',
                description: 'Please select your board, grade, and subject to begin.',
                variant: 'destructive',
            });
        }
    };
    
    const handleSendMessage = async () => {
        if (!currentInput.trim() || !selectedBoard || !selectedGrade || !selectedSubject) return;

        const newUserMessage: Message = { role: 'user', content: currentInput };
        const newMessages = [...messages, newUserMessage];
        setMessages(newMessages);
        setCurrentInput('');

        startLumaResponseTransition(async () => {
            try {
                const chatHistory = newMessages.slice(0, -1).map(msg => ({
                    role: msg.role,
                    content: msg.content
                }));
                
                const response = await getTutorResponse({
                    board: selectedBoard,
                    grade: selectedGrade,
                    subject: selectedSubject.name,
                    chatHistory: chatHistory,
                    question: newUserMessage.content,
                });

                setMessages(prev => [...prev, { role: 'model', content: response.answer }]);
            } catch (error) {
                console.error("Failed to get response from Luma:", error);
                setMessages(prev => [...prev, { role: 'model', content: "I'm sorry, I encountered an error. Please try asking again." }]);
                toast({
                    title: 'Error',
                    description: 'Could not get a response from Luma. Please check your connection and try again.',
                    variant: 'destructive',
                });
            }
        });
    };
    
    const handleSubjectSelection = (subjectName: string) => {
        const subject = availableSubjects.find(s => s.name === subjectName);
        setSelectedSubject(subject || null);
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col h-[calc(100vh-80px)]">
             <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                    <GraduationCap /> Luma AI Tutor
                </h1>
                <p className="text-muted-foreground">Your personal AI study partner, ready to help you learn.</p>
            </header>

            {!isConfigured ? (
                <Card className="max-w-2xl mx-auto w-full">
                    <CardHeader>
                        <CardTitle>Set Up Your Learning Session</CardTitle>
                        <CardDescription>Tell us a bit about your curriculum so Luma can help you better.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <label className="font-medium flex items-center gap-2"><School className="w-4 h-4" /> Education Board</label>
                            <Select onValueChange={(value: Board) => setSelectedBoard(value)} value={selectedBoard ?? ''}>
                                <SelectTrigger><SelectValue placeholder="Select your board..." /></SelectTrigger>
                                <SelectContent>
                                    {boards.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                         <div className="space-y-2">
                            <label className="font-medium flex items-center gap-2"><GraduationCap className="w-4 h-4" /> Grade</label>
                            <Select onValueChange={(value: Grade) => setSelectedGrade(value)} value={selectedGrade ?? ''} disabled={!selectedBoard}>
                                <SelectTrigger><SelectValue placeholder="Select your grade..." /></SelectTrigger>
                                <SelectContent>
                                    {availableGrades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <label className="font-medium flex items-center gap-2"><BookOpen className="w-4 h-4" /> Subject</label>
                            <Select onValueChange={handleSubjectSelection} value={selectedSubject?.name ?? ''} disabled={!selectedGrade}>
                                <SelectTrigger><SelectValue placeholder="Select your subject..." /></SelectValue>
                                <SelectContent>
                                    {availableSubjects.map(s => <SelectItem key={s.name} value={s.name}>{s.name}</SelectItem>)}
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button onClick={handleStartChatting} className="w-full" size="lg">
                            <Sparkles className="mr-2" /> Start Chatting with Luma
                        </Button>
                    </CardFooter>
                </Card>
            ) : (
                <div className="flex-1 flex flex-col bg-card border rounded-lg shadow-sm">
                    <div className="p-4 border-b flex justify-between items-center bg-muted/30 rounded-t-lg">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full text-white">
                                {selectedSubject?.icon && <selectedSubject.icon />}
                            </div>
                            <div>
                                <h2 className="font-bold text-lg">{selectedSubject?.name}</h2>
                                <p className="text-xs text-muted-foreground">{selectedBoard} | {selectedGrade}</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => { setIsConfigured(false); setMessages([])}}>Change Subject</Button>
                    </div>

                    <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                        <div className="space-y-6">
                            {messages.map((message, index) => (
                                <div key={index} className={cn("flex items-start gap-3", message.role === 'user' ? 'justify-end' : 'justify-start')}>
                                    {message.role === 'model' && (
                                        <Image src="https://placehold.co/40x40.png" data-ai-hint="friendly robot" alt="Luma" width={40} height={40} className="rounded-full" />
                                    )}
                                    <div className={cn(
                                        "p-3 rounded-lg max-w-md",
                                        message.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                                    )}>
                                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                                    </div>
                                     {message.role === 'user' && (
                                        <div className="w-10 h-10 rounded-full bg-slate-300 flex items-center justify-center">
                                            <User className="w-6 h-6 text-slate-600" />
                                        </div>
                                    )}
                                </div>
                            ))}
                            {isLumaTyping && (
                                <div className="flex items-start gap-3 justify-start">
                                    <Image src="https://placehold.co/40x40.png" data-ai-hint="friendly robot" alt="Luma" width={40} height={40} className="rounded-full" />
                                    <div className="p-3 rounded-lg bg-muted flex items-center gap-2">
                                        <LoaderCircle className="w-4 h-4 animate-spin" />
                                        <span className="text-sm text-muted-foreground">Luma is typing...</span>
                                    </div>
                                </div>
                            )}
                        </div>
                    </ScrollArea>

                    <div className="p-4 border-t bg-background rounded-b-lg">
                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }}>
                            <div className="relative">
                                <Input
                                    value={currentInput}
                                    onChange={(e) => setCurrentInput(e.target.value)}
                                    placeholder="Ask Luma a question..."
                                    className="pr-12"
                                    disabled={isLumaTyping}
                                />
                                <Button type="submit" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8" disabled={isLumaTyping || !currentInput.trim()}>
                                    <Send className="h-4 w-4" />
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
