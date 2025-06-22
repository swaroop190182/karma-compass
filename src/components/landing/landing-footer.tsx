import Link from 'next/link';
import Image from 'next/image';

export function LandingFooter() {
    const mainLinks = [
        { href: '#features', label: 'Features' },
        { href: '/journal', label: 'Demo' },
    ];
    const legalLinks = [
         { href: '#', label: 'About Us' },
         { href: '#', label: 'Contact' },
         { href: '#', label: 'Privacy Policy' },
    ]

    return (
        <footer className="border-t">
            <div className="container mx-auto px-4 py-8">
                <div className="grid md:grid-cols-3 gap-8 text-center md:text-left">
                    <div>
                        <h3 className="font-bold text-lg">Karma Compass</h3>
                        <p className="text-sm text-muted-foreground mt-2">
                            Build Good Habits. Earn Pocket Money. Grow Every Day.
                        </p>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground">Quick Links</h3>
                        <ul className="mt-2 space-y-2">
                             {mainLinks.map((link) => (
                                <li key={link.href}>
                                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                     <div>
                        <h3 className="font-semibold text-foreground">Legal</h3>
                         <ul className="mt-2 space-y-2">
                             {legalLinks.map((link) => (
                                <li key={link.label}>
                                    <Link href={link.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-sm text-muted-foreground">
                        &copy; {new Date().getFullYear()} Karma Compass. All Rights Reserved.
                    </p>
                    <div className="flex items-center gap-4 mt-4 md:mt-0">
                         <Link href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                            <Image src="https://placehold.co/120x40.png" alt="Download on the App Store" width={120} height={40} data-ai-hint="app store" />
                         </Link>
                          <Link href="#" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                            <Image src="https://placehold.co/120x40.png" alt="Get it on Google Play" width={120} height={40} data-ai-hint="play store" />
                         </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
