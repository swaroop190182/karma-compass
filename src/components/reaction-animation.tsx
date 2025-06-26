
"use client";

import { useEffect } from 'react';
import { ThumbsUp, Trophy, Frown } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AnimationType = 'like' | 'trophy' | 'sad';

interface ReactionAnimationProps {
    x: number;
    y: number;
    type: AnimationType;
    onEnd: () => void;
}

const icons = {
    like: <ThumbsUp className="w-12 h-12 text-blue-500 fill-blue-500" />,
    trophy: <Trophy className="w-12 h-12 text-yellow-500 fill-yellow-400" />,
    sad: <Frown className="w-12 h-12 text-slate-500" />,
};

export function ReactionAnimation({ x, y, type, onEnd }: ReactionAnimationProps) {

    useEffect(() => {
        const timer = setTimeout(() => {
            onEnd();
        }, 1000); // Match animation duration

        return () => clearTimeout(timer);
    }, [onEnd]);

    return (
        <div
            className="fixed z-[200] pointer-events-none animate-reaction-pop-up"
            style={{
                left: x,
                top: y,
            }}
        >
            {icons[type]}
        </div>
    );
}
