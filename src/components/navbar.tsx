
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ClipboardList, Sparkles, Wallet, Brain, GraduationCap } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useWallet } from '@/hooks/use-wallet';
import { useEffect, useRef } from 'react';

export function Navbar() {
  const pathname = usePathname();
  const { balance, setWalletPosition } = useWallet();
  const walletRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updatePosition = () => {
        if (walletRef.current) {
            const rect = walletRef.current.getBoundingClientRect();
            setWalletPosition({
                top: rect.top + rect.height / 2,
                left: rect.left + rect.width / 2,
            });
        }
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    return () => window.removeEventListener('resize', updatePosition);
  }, [setWalletPosition]);

  const navLinks = [
    { href: '/', label: 'Karma Journal', icon: LayoutGrid },
    { href: '/planner', label: 'Daily Planner', icon: ClipboardList },
    { href: '/reflections', label: 'Reflections', icon: Sparkles },
    { href: '/quests', label: 'Quests', icon: Brain },
    { href: '/tutor', label: 'Luma', icon: GraduationCap },
  ];

  return (
    <nav className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-2 sm:p-4">
        <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2">
                <span className="text-xl font-bold bg-gradient-to-r from-primary to-yellow-400 text-transparent bg-clip-text">Karma Compass</span>
            </Link>
            <div className="hidden md:flex items-center gap-2 sm:gap-4">
                {navLinks.map(link => (
                    <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                        "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                        pathname === link.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                    )}
                    >
                    <link.icon className="h-5 w-5" />
                    <span>{link.label}</span>
                    </Link>
                ))}
            </div>
        </div>
        
        <div className="flex items-center gap-4">
            <div ref={walletRef} className="flex items-center gap-1 rounded-full bg-amber-400/20 px-2.5 py-1 border border-amber-500/50">
                <Wallet className="h-3.5 w-3.5 text-amber-600" />
                <span className="font-semibold text-xs text-amber-800 dark:text-amber-300">
                    ₹{balance.toFixed(2)}
                </span>
            </div>
        </div>
      </div>
       {/* Mobile Nav Links */}
       <div className="md:hidden flex items-center justify-around p-2 border-t">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex flex-col items-center gap-1 rounded-md px-3 py-1 text-xs font-medium transition-colors",
                pathname === link.href
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </Link>
          ))}
        </div>
    </nav>
  );
}
