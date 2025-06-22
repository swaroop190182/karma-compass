
"use client";

import { createContext, useContext } from 'react';

interface WalletContextType {
    balance: number;
    addFunds: (amount: number, message?: string) => void;
    setWalletPosition: (position: { top: number; left: number; }) => void;
}

export const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function useWallet() {
    const context = useContext(WalletContext);
    if (context === undefined) {
        throw new Error('useWallet must be used within a WalletProvider');
    }
    return context;
}
