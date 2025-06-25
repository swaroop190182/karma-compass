
"use client";

import {
  FilePenLine,
  Sparkles,
  Calendar,
  Bot,
  GraduationCap,
  Puzzle,
  LayoutDashboard,
  Wallet,
  BrainCircuit,
  Target,
  ShoppingCart
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const featuresList = [
  {
    icon: FilePenLine,
    title: 'Daily Journal & AI Analysis',
    description: 'Log your daily reflections, gratitude, and intentions. Our AI analyzes your entries to automatically track completed activities and create tasks for your planner, making self-reflection seamless and productive.',
    link: '/journal',
    linkText: 'Go to Journal'
  },
  {
    icon: Sparkles,
    title: 'Karma Tracker & Gamification',
    description: 'Select from a wide range of positive and negative activities to log your day. Each action affects your daily Karma Score, turning self-improvement into a motivating and rewarding game.',
    link: '/journal',
    linkText: 'Track Your Day'
  },
  {
    icon: Calendar,
    title: 'Daily & Weekly Planner',
    description: 'Organize your academic and personal life with a smart planner. Set daily tasks, track their status, and monitor your progress towards larger weekly goals to stay on top of your responsibilities.',
    link: '/planner',
    linkText: 'Open Planner'
  },
  {
    icon: Bot,
    title: 'Aura - AI Wellness Coach',
    description: 'Meet Aura, your personal wellness coach. Aura analyzes your journal history and planner to provide personalized insights and actionable suggestions, helping you build better habits and improve well-being.',
    link: '/planner',
    linkText: 'Chat with Aura'
  },
  {
    icon: Bot,
    title: 'Luma - AI Counsellor',
    description: 'Feeling overwhelmed or just need to talk? Luma is your confidential and non-judgmental AI counsellor, available 24/7 to listen and support you with whatever is on your mind.',
    link: '/tutor',
    linkText: 'Talk to Luma'
  },
  {
    icon: Puzzle,
    title: 'Quests & Brain Puzzles',
    description: 'Challenge your mind with daily quizzes, weekly riddles, and fun word search puzzles. Sharpen your knowledge across various subjects and earn wallet rewards for every puzzle you solve.',
    link: '/quests',
    linkText: 'Solve a Quest'
  },
  {
    icon: LayoutDashboard,
    title: 'Reflections Dashboard',
    description: 'Visualize your growth with a comprehensive dashboard. Track your Karma Score over time, view your wellness metrics on a beautiful calendar, and see how you rank against your own goals.',
    link: '/reflections',
    linkText: 'View Dashboard'
  },
  {
    icon: ShoppingCart,
    title: 'Pocket Money Wallet & Rewards Store',
    description: 'Motivation meets tangible rewards. Completing quests and achieving goals adds real money to your digital wallet, which you can use to redeem items from the Karma Store.',
    link: '/store',
    linkText: 'Visit the Store'
  },
];

export default function FeaturesPage() {
  return (
    <div className="min-h-screen">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Everything You Need to Grow
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
            Karma Compass is more than just an app; it's a complete ecosystem for student success and well-being. Discover the features that make it possible.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature) => (
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
