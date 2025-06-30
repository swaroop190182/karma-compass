
'use client';

import { useState, useEffect, useCallback, type ReactNode, useMemo } from 'react';
import { AuthContext } from '@/hooks/use-auth';

const AUTH_USER_KEY = 'karma-auth-user';

interface User {
  email: string;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            // Using sessionStorage to ensure logout when the tab is closed
            const storedUser = sessionStorage.getItem(AUTH_USER_KEY);
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to read user from sessionStorage", error);
        } finally {
            setIsLoading(false);
        }
    }, []);

    const login = useCallback((userData: User) => {
        try {
            sessionStorage.setItem(AUTH_USER_KEY, JSON.stringify(userData));
            setUser(userData);
        } catch (error) {
            console.error("Failed to save user to sessionStorage", error);
        }
    }, []);

    const logout = useCallback(() => {
        try {
            sessionStorage.removeItem(AUTH_USER_KEY);
            setUser(null);
        } catch (error) {
            console.error("Failed to remove user from sessionStorage", error);
        }
    }, []);

    const value = useMemo(() => ({ user, isLoading, login, logout }), [user, isLoading, login, logout]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
