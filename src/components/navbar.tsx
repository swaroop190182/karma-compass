
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WalletDisplay } from './wallet-display';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { AppUsageTimer } from './app-usage-timer';
import Image from 'next/image';

export function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/journal', label: 'Journal' },
    { href: '/features', label: 'Features' },
    { href: '/parent', label: 'Parents' },
    { href: '/planner', label: 'Planner' },
    { href: '/reflections', label: 'Reflections' },
    { href: '/quests', label: 'Quests' },
    { href: '/store', label: 'Store' },
    { href: '/connect', label: 'Connect' },
  ];

  return (
    <nav className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center p-3 h-16">
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

        {/* Centered Navigation Links */}
        <div className="hidden sm:flex items-center justify-center gap-2 md:gap-4 lg:gap-6">
            {navLinks.map(link => (
            <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-sm md:text-base font-medium transition-colors whitespace-nowrap",
                  pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                )}
            >
                <span>{link.label}</span>
            </Link>
            ))}
        </div>
        
        {/* Wallet and Mobile Menu on the right */}
        <div className="flex-1 flex justify-end items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
                <AppUsageTimer />
                <WalletDisplay />
            </div>
            <div className="sm:hidden">
                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <Menu className="h-6 w-6" />
                            <span className="sr-only">Open menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="right" className="w-[240px] flex flex-col">
                        <nav className="grid gap-4 text-base font-medium mt-8 flex-grow">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                        "text-muted-foreground hover:text-foreground", 
                                        pathname === link.href && "text-primary font-bold"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto space-y-4">
                            <AppUsageTimer />
                            <WalletDisplay />
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </div>
      </div>
    </nav>
  );
}
