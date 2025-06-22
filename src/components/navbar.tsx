"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ClipboardList } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Karma Journal', icon: LayoutGrid },
    { href: '/planner', label: 'Daily Planner', icon: ClipboardList },
  ];

  return (
    <nav className="bg-card border-b sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-2 sm:p-4">
        <Link href="/" className="flex items-center gap-2">
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-yellow-400 text-transparent bg-clip-text">Karma Compass</span>
        </Link>
        <div className="flex items-center gap-2 sm:gap-4">
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
              <span className="hidden sm:inline">{link.label}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
