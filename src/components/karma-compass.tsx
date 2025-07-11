
"use client";

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface KarmaCompassProps {
    score: number;
    eqScore: number;
}

const getRotation = (score: number) => {
    // Map score from a range of [-50, 150] to an angle range of [-135, 135]
    // This makes 0 score point straight up (0 deg), negative to the left, positive to the right.
    const scoreMin = -50;
    const scoreMax = 150;
    const angleMin = -135;
    const angleMax = 135;

    const clampedScore = Math.max(scoreMin, Math.min(scoreMax, score));
    const scoreRatio = (clampedScore - scoreMin) / (scoreMax - scoreMin);
    const rotation = angleMin + scoreRatio * (angleMax - angleMin);

    return rotation;
};

export function KarmaCompass({ score, eqScore }: KarmaCompassProps) {
    const [displayScore, setDisplayScore] = useState(0);
    const [displayEqScore, setDisplayEqScore] = useState(0);
    const [rotation, setRotation] = useState(getRotation(0));

    useEffect(() => {
        setRotation(getRotation(score));
        
        // Animated score count-up/down
        const duration = 500;
        const startTime = performance.now();
        const startScore = displayScore;
        const startEqScore = displayEqScore;
        
        const animate = (currentTime: number) => {
            const elapsedTime = currentTime - startTime;
            if (elapsedTime < duration) {
                const progress = elapsedTime / duration;
                setDisplayScore(Math.round(startScore + (score - startScore) * progress));
                setDisplayEqScore(Math.round(startEqScore + (eqScore - startEqScore) * progress));
                requestAnimationFrame(animate);
            } else {
                setDisplayScore(score);
                setDisplayEqScore(eqScore);
            }
        };

        requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [score, eqScore]);


    return (
        <div className="relative w-32 h-32 sm:w-36 sm:h-36" aria-label={`Karma Compass showing a score of ${score} and EQ of ${eqScore}`}>
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-lg">
                <defs>
                    <radialGradient id="compass-bg" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                        <stop offset="0%" stopColor="hsl(var(--card))" />
                        <stop offset="100%" stopColor="hsl(var(--primary))" />
                    </radialGradient>
                </defs>
                 {/* Outer circle */}
                 <circle cx="100" cy="100" r="95" fill="url(#compass-bg)" stroke="hsl(var(--border))" strokeWidth="2" />
                 
                 {/* Labels */}
                 <text x="40" y="165" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--muted-foreground))" className="uppercase">Negative</text>
                 <text x="45" y="45" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--muted-foreground))" className="uppercase">Neutral</text>
                 <text x="155" y="45" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--muted-foreground))" className="uppercase">Positive</text>
                 <text x="160" y="165" textAnchor="middle" fontSize="10" fontWeight="bold" fill="hsl(var(--muted-foreground))" className="uppercase">Excellent</text>

                {/* Tick marks */}
                {Array.from({ length: 24 }).map((_, i) => (
                    <line
                        key={i}
                        x1="100"
                        y1="10"
                        x2="100"
                        y2={i % 2 === 0 ? "20" : "15"}
                        stroke="hsl(var(--muted-foreground))"
                        strokeWidth={i % 2 === 0 ? "2" : "1"}
                        transform={`rotate(${i * 15}, 100, 100)`}
                    />
                ))}

                {/* Karma Score Display (Left) */}
                <text
                    x="70"
                    y="105"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fill="hsl(var(--foreground))"
                >
                    {displayScore > 0 ? `+${displayScore}` : displayScore}
                </text>
                <text x="70" y="125" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">Karma</text>

                {/* Vertical Separator */}
                <line x1="100" y1="75" x2="100" y2="125" stroke="hsl(var(--border))" />

                {/* EQ Score Display (Right) */}
                <text
                    x="130"
                    y="105"
                    textAnchor="middle"
                    fontSize="28"
                    fontWeight="bold"
                    fill="hsl(var(--foreground))"
                >
                    {displayEqScore}
                </text>
                <text x="130" y="125" textAnchor="middle" fontSize="10" fill="hsl(var(--muted-foreground))">EQ</text>


                {/* Needle */}
                <g style={{ transform: `rotate(${rotation}deg)`, transformOrigin: '100px 100px', transition: 'transform 0.5s ease-out' }}>
                    <polygon points="100,25 95,100 105,100" fill="hsl(var(--accent))" />
                    <circle cx="100" cy="100" r="5" fill="hsl(var(--accent))" stroke="hsl(var(--background))" strokeWidth="2" />
                </g>
            </svg>
        </div>
    );
}
