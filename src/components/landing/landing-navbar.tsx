
"use client";

import Link from 'next/link';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Image from 'next/image';

export function LandingNavbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/journal', label: 'Record' },
    { href: '/reflections', label: 'Reflections' },
    { href: '/planner', label: 'Goals' },
    { href: '/quests', label: 'Habits' },
    { href: '/store', label: 'Store' },
    { href: '/connect', label: 'Connect' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
            {/* Logo on the left */}
            <div className="flex-1 flex justify-start">
                <Link href="/">
                    <Image
                        src="https://i.postimg.cc/wj6407JT/Chat-GPT-Image-Jun-25-2025-10-35-54-PM.png"
                        alt="Karma Compass Logo"
                        width={140}
                        height={40}
                        className="h-10 w-auto"
                        data-ai-hint="logo"
                        priority
                    />
                </Link>
            </div>

            {/* Centered Desktop Navigation Links */}
            <nav className="hidden md:flex items-center justify-center gap-8 text-sm">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="font-medium transition-colors text-foreground/70 hover:text-foreground"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>

            {/* Right Aligner for Desktop, Mobile Menu for Mobile */}
            <div className="flex-1 flex justify-end">
                <div className="md:hidden">
                    <Sheet open={isOpen} onOpenChange={setIsOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                                <span className="sr-only">Open menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                             <Link href="/" onClick={() => setIsOpen(false)}>
                                <Image
                                    src="https://i.postimg.cc/wj6407JT/Chat-GPT-Image-Jun-25-2025-10-35-54-PM.png"
                                    alt="Karma Compass Logo"
                                    width={140}
                                    height={40}
                                    className="h-10 w-auto mb-8"
                                    data-ai-hint="logo"
                                />
                            </Link>
                            <nav className="grid gap-6 text-lg font-medium">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className="text-muted-foreground hover:text-foreground"
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </nav>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    </header>
  );
}
