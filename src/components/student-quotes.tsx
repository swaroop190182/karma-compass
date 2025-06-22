
"use client";

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { QuoteIcon } from 'lucide-react';

const quotes = [
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt" },
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs" },
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill" },
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius" },
    { text: "Education is the most powerful weapon which you can use to change the world.", author: "Nelson Mandela" },
    { text: "The expert in anything was once a beginner.", author: "Helen Hayes" },
    { text: "You have to be odd to be number one.", author: "Dr. Seuss" }
];

export function StudentQuotes() {
    const [currentQuote, setCurrentQuote] = useState<{ text: string; author: string } | null>(null);

    useEffect(() => {
        const updateQuote = () => {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            setCurrentQuote(quotes[randomIndex]);
        };

        updateQuote(); // Set initial quote
        const intervalId = setInterval(updateQuote, 3600 * 1000); // Change quote every hour

        return () => clearInterval(intervalId); // Cleanup on component unmount
    }, []);

    return (
        <section className="mt-12">
            <Card className="bg-primary/20 border-primary/40 shadow-md">
                <CardContent className="p-6 text-center">
                    {currentQuote ? (
                        <>
                            <QuoteIcon className="mx-auto h-8 w-8 text-primary mb-4" />
                            <blockquote className="text-xl italic font-medium text-foreground">
                                "{currentQuote.text}"
                            </blockquote>
                            <p className="mt-4 text-right text-sm text-muted-foreground font-bold">— {currentQuote.author}</p>
                        </>
                    ) : (
                        <p>Loading a quote...</p>
                    )}
                </CardContent>
            </Card>
        </section>
    );
}
