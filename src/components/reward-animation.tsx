
"use client";

import { useEffect } from 'react';
import { IndianRupee } from 'lucide-react';

interface RewardAnimationProps {
    amount: number;
    endPos: { top: number; left: number };
    onAnimationEnd: () => void;
}

export function RewardAnimation({ amount, endPos, onAnimationEnd }: RewardAnimationProps) {
    // The animation duration should match the one in tailwind.config.ts
    const animationDuration = 1500; 

    useEffect(() => {
        const timer = setTimeout(() => {
            onAnimationEnd();
        }, animationDuration);

        return () => clearTimeout(timer);
    }, [onAnimationEnd]);
    
    // Define CSS custom properties for the animation
    const style = {
        '--start-top': '50vh',
        '--start-left': '50vw',
        '--end-top': `${endPos.top}px`,
        '--end-left': `${endPos.left}px`,
    } as React.CSSProperties;

    return (
        <div 
            style={style}
            className="fixed z-[200] flex items-center justify-center h-12 w-24 bg-green-500 rounded-md border-2 border-green-700 text-white font-bold shadow-lg animate-fly-to-wallet"
        >
            <IndianRupee className="h-5 w-5 mr-1" />
            {amount}
        </div>
    );
}
