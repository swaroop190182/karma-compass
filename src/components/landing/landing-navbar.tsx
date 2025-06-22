import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Compass } from 'lucide-react';

export function LandingNavbar() {
  const navLinks = [
    { href: '/features', label: 'Features' },
    { href: '/journal', label: 'Record' },
    { href: '/reflections', label: 'Reflections' },
    { href: '/planner', label: 'Goals' },
    { href: '/quests', label: 'Habits' },
    { href: '/tutor', label: 'Luma' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
            <div className="flex-1 flex justify-start">
                 <Link href="/" className="flex items-center gap-2">
                    <div className="p-2 bg-primary/10 rounded-lg">
                        <Compass className="h-6 w-6 text-primary" />
                    </div>
                    <span className="font-bold text-lg">Karma Compass</span>
                </Link>
            </div>
            <nav className="hidden md:flex items-center justify-center gap-6 text-sm">
                {navLinks.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="text-foreground/80 font-medium transition-colors hover:text-foreground"
                    >
                        {link.label}
                    </Link>
                ))}
            </nav>
            <div className="flex-1 flex justify-end">
                <Button asChild>
                    <Link href="/journal">Get Started</Link>
                </Button>
            </div>
        </div>
    </header>
  );
}
