
"use client";

import {
  UserCog,
  Wallet,
  Settings2,
  LayoutDashboard,
  Gift,
  Bell,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const parentFeatures = [
  {
    icon: UserCog,
    title: 'Profile & Student Management',
    description: 'Set up your parent profile, add a photo, and link multiple student accounts to manage them all from one place. Adjust notification preferences and other settings.',
    link: '#',
    linkText: 'Manage Profile'
  },
  {
    icon: Wallet,
    title: 'Secure Wallet & Top-Ups',
    description: 'Load money into your parent wallet using UPI, Cards, or Net Banking. View your balance, track transaction history, and set spending limits for each child.',
    link: '#',
    linkText: 'Add Funds'
  },
  {
    icon: Settings2,
    title: 'Custom Earning Rules',
    description: 'Decide how your child earns rewards. Set custom amounts for daily journaling, completing academic goals, solving puzzles, and achieving streaks.',
    link: '#',
    linkText: 'Set Rules'
  },
  {
    icon: LayoutDashboard,
    title: 'Progress Monitoring',
    description: 'Get a clear view of your child\'s progress with daily activity summaries, mood trends, and weekly performance reports powered by AI insights.',
    link: '#',
    linkText: 'View Dashboard'
  },
  {
    icon: Gift,
    title: 'Reward Approval System',
    description: 'Choose to automatically transfer earned money to your child\'s wallet or enable manual approval. Review their work and send a note of encouragement with each reward.',
    link: '#',
    linkText: 'Approve Rewards'
  },
  {
    icon: Bell,
    title: 'Notifications & Engagement',
    description: 'Receive alerts for important milestones, reward redemptions, or when your child needs a nudge. Use the chat feature to send messages and set bonus challenges.',
    link: '#',
    linkText: 'Adjust Alerts'
  },
];

export default function ParentDashboardPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Parent Dashboard
          </h1>
          <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
            Welcome, Parent! Here you can manage your child's journey, set rewards, and monitor their growth in a secure and supportive environment.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {parentFeatures.map((feature) => (
            <Card key={feature.title} className="flex flex-col">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{feature.description}</CardDescription>
              </CardContent>
              <div className="p-6 pt-0">
                 <Button asChild variant="outline" className="w-full">
                    <Link href={feature.link}>{feature.linkText}</Link>
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </main>
    </div>
  );
}
