import Link from 'next/link';

export function LandingFooter() {
    const navLinks = [
        { href: '#features', label: 'Features' },
        { href: '/journal', label: 'Record' },
        { href: '/reflections', label: 'Reflections' },
    ];
    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Karma Journal. All Rights Reserved.
                    </p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        {navLinks.map((link) => (
                             <Link
                                key={link.href}
                                href={link.href}
                                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
}
