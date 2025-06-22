"use client";

import { useWallet } from '@/hooks/use-wallet';
import { Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';

export function WalletDisplay() {
    const { balance } = useWallet();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    // Only render the balance on the client to avoid hydration mismatch,
    // as it's read from localStorage in the WalletProvider.
    if (!isClient) {
        return <div className="flex items-center gap-2 h-9 w-24 rounded-md bg-muted animate-pulse" />;
    }

    return (
        <div id="wallet-display" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-sm font-semibold border border-border">
            <Wallet className="h-5 w-5 text-primary" />
            <span>₹{balance.toFixed(0)}</span>
        </div>
    );
}
