"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WalletDisplay } from './wallet-display';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/journal', label: 'Journal' },
    { href: '/planner', label: 'Planner' },
    { href: '/reflections', label: 'Reflections' },
    { href: '/quests', label: 'Quests' },
    { href: '/tutor', label: 'Luma' },
  ];

  return (
    <nav className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between p-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 w-44">
            <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                 <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <div className="flex flex-col leading-tight font-bold tracking-wider uppercase text-foreground">
                <span className="text-base">KARMA</span>
                <span className="text-xs">JOURNAL</span>
            </div>
        </Link>

        {/* Centered Desktop Nav Links */}
        <div className="flex items-center justify-center flex-1 gap-12">
            {navLinks.map(link => (
            <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-lg font-medium transition-colors",
                  pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                )}
            >
                <span>{link.label}</span>
            </Link>
            ))}
        </div>
        
        {/* Wallet Display */}
        <div className="w-44 flex justify-end">
            <WalletDisplay />
        </div>
      </div>
    </nav>
  );
}
