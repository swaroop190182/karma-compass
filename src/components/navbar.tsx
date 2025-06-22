
"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Compass, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { WalletDisplay } from './wallet-display';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

export function Navbar() {
  const pathname = usePathname();
  const [isClient, setIsClient] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const navLinks = [
    { href: '/journal', label: 'Journal' },
    { href: '/features', label: 'Features' },
    { href: '/parent', label: 'Parents' },
    { href: '/planner', label: 'Planner' },
    { href: '/reflections', label: 'Reflections' },
    { href: '/quests', label: 'Quests' },
    { href: '/connect', label: 'Connect' },
    { href: '/tutor', label: 'Luma' },
  ];

  return (
    <nav className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex items-center p-3">
        {/* Logo on the left */}
        <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center gap-2">
                <div className="p-2 bg-primary/10 rounded-lg border border-primary/20">
                    <Compass className="h-6 w-6 text-primary" />
                </div>
                <div className="flex flex-col leading-tight font-bold tracking-wider uppercase text-foreground">
                    <span className="text-base">KARMA</span>
                    <span className="text-xs">COMPASS</span>
                </div>
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
                  isClient && pathname === link.href
                      ? "text-primary font-semibold"
                      : "text-foreground/70 hover:text-foreground"
                )}
            >
                <span>{link.label}</span>
            </Link>
            ))}
        </div>
        
        {/* Wallet and Mobile Menu on the right */}
        <div className="flex-1 flex justify-end">
            <div className="hidden sm:block">
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
                                        isClient && pathname === link.href && "text-primary font-bold"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                        <div className="mt-auto">
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
