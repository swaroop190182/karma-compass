"use client";

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WalletContext } from '@/hooks/use-wallet';

const WALLET_STORAGE_KEY = 'karma-wallet-balance';

export function WalletProvider({ children }: { children: ReactNode }) {
    const [balance, setBalance] = useState<number>(0);
    const { toast } = useToast();

    useEffect(() => {
        try {
            const storedBalance = localStorage.getItem(WALLET_STORAGE_KEY);
            if (storedBalance) {
                setBalance(JSON.parse(storedBalance));
            }
        } catch (error) {
            console.error("Failed to read wallet balance from localStorage", error);
            setBalance(0);
        }
    }, []);

    const updateBalance = (newBalance: number) => {
        try {
            localStorage.setItem(WALLET_STORAGE_KEY, JSON.stringify(newBalance));
            setBalance(newBalance);
        } catch (error) {
            console.error("Failed to save wallet balance to localStorage", error);
        }
    };

    const addFunds = useCallback((amount: number, message: string = "You've earned a reward!") => {
        const newBalance = balance + amount;
        updateBalance(newBalance);
        toast({
            title: "Wallet Updated!",
            description: `${message} ₹${amount} has been added to your wallet.`,
        });
    }, [balance, toast]);

    const value = { balance, addFunds };

    return (
        <WalletContext.Provider value={value}>
            {children}
        </WalletContext.Provider>
    );
}
