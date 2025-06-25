
"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon } from "lucide-react";

export function TimeUpOverlay() {
    return (
        <div className="fixed inset-0 z-[200] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4">
            <Card className="max-w-md text-center shadow-2xl border-primary/20">
                <CardHeader>
                    <Moon className="w-12 h-12 mx-auto text-primary mb-4" />
                    <CardTitle className="text-3xl">Time for a Break!</CardTitle>
                </CardHeader>
                <CardContent>
                    <CardDescription className="text-lg">
                        You've been reflecting for 15 minutes. It's important to rest your mind.
                        Come back tomorrow to continue your journey!
                    </CardDescription>
                </CardContent>
            </Card>
        </div>
    );
}
