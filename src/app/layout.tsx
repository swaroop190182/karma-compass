
"use client";

import type { Metadata } from 'next';
import { usePathname } from 'next/navigation';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/navbar';
import { LandingNavbar } from '@/components/landing/landing-navbar';
import { WalletProvider } from '@/providers/wallet-provider';
import { JournalProvider } from '@/providers/journal-provider';
import { TimerProvider } from '@/providers/timer-provider';
import { AuthProvider } from '@/providers/auth-provider';
import { AuthGuard } from '@/components/auth-guard';

// Note: Metadata is not supported in client components.
// We can move it to a server component if needed.
// export const metadata: Metadata = {
//   title: 'Karma Compass',
//   description: 'Track your daily karma and get motivated.',
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isPublicPage = ['/', '/login'].includes(pathname);
  const isLandingPage = pathname === '/';

  return (
    <html lang="en" className="h-full">
      <head>
        <title>Karma Compass</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full">
        <AuthProvider>
          {isPublicPage ? (
            <div className="flex flex-col h-full">
              {isLandingPage && <LandingNavbar />}
              <main className="flex-grow overflow-y-auto">
                  {children}
              </main>
            </div>
          ) : (
            <AuthGuard>
              <WalletProvider>
                <JournalProvider>
                  <TimerProvider>
                    <div className="flex flex-col h-full">
                      <Navbar />
                      <main className="flex-grow overflow-y-auto">
                        {children}
                      </main>
                    </div>
                    <Toaster />
                  </TimerProvider>
                </JournalProvider>
              </WalletProvider>
            </AuthGuard>
          )}
        </AuthProvider>
      </body>
    </html>
  );
}
