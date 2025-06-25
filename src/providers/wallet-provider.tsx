
"use client";

import { useState, useEffect, useCallback, type ReactNode, useMemo } from 'react';
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
        // Function to find the wallet element and set its position
        const updateWalletPosition = () => {
            const walletElement = document.getElementById('wallet-display');
            if (walletElement) {
                const rect = walletElement.getBoundingClientRect();
                setWalletPosition({
                    top: rect.top + rect.height / 2,
                    left: rect.left + rect.width / 2,
                });
            }
        };
        
        // A small delay to ensure the wallet component has mounted
        const timeoutId = setTimeout(updateWalletPosition, 100);

        // Update position on resize
        window.addEventListener('resize', updateWalletPosition);
        
        // Also use a MutationObserver in case the component appears/moves later
        const observer = new MutationObserver(updateWalletPosition);
        observer.observe(document.body, { childList: true, subtree: true, attributes: true });

        return () => {
            clearTimeout(timeoutId);
            window.removeEventListener('resize', updateWalletPosition);
            observer.disconnect();
        };
    }, []);


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
        
        // The animation will trigger as long as a position is set
        setAnimationConfig({ key: Date.now(), amount });

        toast({
            title: "Wallet Updated!",
            description: `${message} ₹${amount} has been added to your wallet.`,
        });
    }, [balance, toast]);

    const value = useMemo(() => ({ balance, addFunds }), [balance, addFunds]);

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
