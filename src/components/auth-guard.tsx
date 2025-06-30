
'use client';

import { useAuth } from '@/hooks/use-auth';
import { useRouter } from 'next/navigation';
import { useEffect, type ReactNode } from 'react';
import { Skeleton } from './ui/skeleton';

export function AuthGuard({ children }: { children: ReactNode }) {
    const { user, isLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace('/login');
        }
    }, [isLoading, user, router]);

    if (isLoading || !user) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="w-full h-full p-8 space-y-4">
                    <Skeleton className="h-16 w-full" />
                    <Skeleton className="h-64 w-full" />
                    <Skeleton className="h-32 w-full" />
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
