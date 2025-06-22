import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Navbar } from '@/components/navbar';
import { WalletProvider } from '@/providers/wallet-provider';

export const metadata: Metadata = {
  title: 'Karma Compass',
  description: 'Track your daily karma and get motivated.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased h-full bg-background">
        <WalletProvider>
            <div className="flex flex-col h-full">
            <Navbar />
            <main className="flex-grow overflow-y-auto">
                {children}
            </main>
            </div>
            <Toaster />
        </WalletProvider>
      </body>
    </html>
  );
}
