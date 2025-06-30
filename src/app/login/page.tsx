
'use client';

import { useState, type FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/use-auth';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { LogIn } from 'lucide-react';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const router = useRouter();
    const { toast } = useToast();

    const handleLogin = (e: FormEvent) => {
        e.preventDefault();
        if (!email || !password) {
            toast({
                title: 'Login Failed',
                description: 'Please enter both email and password.',
                variant: 'destructive',
            });
            return;
        }

        // --- Simplified "No Lockout" Auth ---
        // In this prototype, any non-empty email/password combination works.
        // This is insecure for production but perfect for development and demos.
        console.log('Logging in user:', { email });
        login({ email });
        toast({
            title: 'Login Successful',
            description: 'Welcome back!',
        });
        router.push('/journal');
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-muted/30">
            <Card className="w-full max-w-sm">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl">Welcome to Karma Compass</CardTitle>
                    <CardDescription>Enter any credentials to log in to the demo.</CardDescription>
                </CardHeader>
                <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="any@email.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="anypassword"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                    </CardContent>
                    <CardFooter>
                        <Button type="submit" className="w-full">
                            <LogIn className="mr-2" /> Log In
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </div>
    );
}
