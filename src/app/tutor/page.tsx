
"use client";

import { useState, useTransition, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Bot, Send, LoaderCircle, User, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import { getCounsellorResponse } from '@/ai/flows/tutor-flow';

type Message = {
    role: 'user' | 'model';
    content: string;
};

export default function CounsellorPage() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [currentInput, setCurrentInput] = useState('');
    const [isLumaTyping, startLumaResponseTransition] = useTransition();
    const { toast } = useToast();
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Initial welcome message from Luma
        setMessages([
            { role: 'model', content: `Hello! I'm Luma. This is a safe and private space for you to share anything on your mind. How are you feeling today?` }
        ]);
    }, []);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTo({
                top: scrollAreaRef.current.scrollHeight,
                behavior: 'smooth',
            });
        }
    }, [messages]);

    const handleSendMessage = async () => {
        if (!currentInput.trim()) return;

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
                
                const response = await getCounsellorResponse({
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

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8 flex flex-col h-[calc(100vh-80px)]">
             <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 text-transparent bg-clip-text">
                    <Sparkles /> Luma - Your AI Counsellor
                </h1>
                <p className="text-muted-foreground">A safe space to talk about your thoughts and feelings.</p>
            </header>

            <div className="flex-1 flex flex-col bg-card border rounded-lg shadow-sm">
                <div className="p-4 border-b flex justify-between items-center bg-muted/30 rounded-t-lg">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full text-white">
                            <Bot />
                        </div>
                        <div>
                            <h2 className="font-bold text-lg">Luma is listening</h2>
                            <p className="text-xs text-muted-foreground">Your conversation is private and secure.</p>
                        </div>
                    </div>
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
                                placeholder="Share what's on your mind..."
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
        </div>
    );
}
