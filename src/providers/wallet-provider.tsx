
"use client";

import { useState, useEffect, useCallback, type ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';
import { WalletContext } from '@/hooks/use-wallet';
import { RewardAnimation } from '@/components/reward-animation';

const WALLET_STORAGE_KEY = 'karma-wallet-balance';

export function WalletProvider({ children }: { children: ReactNode }) {
    const [balance, setBalance] = useState<number>(0);
    const { toast } = useToast();

    // Animation state
    const [animationConfig, setAnimationConfig] = useState<{ key: number; amount: number } | null>(null);
    const [walletPosition, setWalletPosition] = useState<{ top: number; left: number } | null>(null);


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
        
        if (walletPosition) {
            setAnimationConfig({ key: Date.now(), amount });
        }

        toast({
            title: "Wallet Updated!",
            description: `${message} ₹${amount} has been added to your wallet.`,
        });
    }, [balance, toast, walletPosition]);

    const setWalletPositionCallback = useCallback((position: {top: number; left: number}) => {
        setWalletPosition(position);
    }, []);

    const value = { balance, addFunds, setWalletPosition: setWalletPositionCallback };

    return (
        <WalletContext.Provider value={value}>
            {children}
            {animationConfig && walletPosition && (
                <RewardAnimation
                    key={animationConfig.key}
                    amount={animationConfig.amount}
                    endPos={walletPosition}
                    onAnimationEnd={() => setAnimationConfig(null)}
                />
            )}
        </WalletContext.Provider>
    );
}
