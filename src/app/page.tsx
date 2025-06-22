"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Eye, Target, Bot, LineChart, HeartPulse, Users, FilePenLine, Repeat, BarChart, Goal, ArrowRight } from 'lucide-react';
import { LandingFooter } from '@/components/landing/landing-footer';

const features = [
  {
    icon: Eye,
    title: 'Mindful Reflection',
    description: 'Log daily activities and see their karmic impact. Understand your choices better.',
  },
  {
    icon: Target,
    title: 'Goal Setting & Streaks',
    description: 'Set personal goals, track your streaks, and stay motivated on your journey.',
  },
  {
    icon: Bot,
    title: 'AI-Powered Insights',
    description: 'Receive personalized feedback and suggestions from our AI coach to help you grow.',
  },
  {
    icon: LineChart,
    title: 'Progress Visualization',
    description: 'Track your karma score and habit trends over time with clear, insightful charts.',
  },
  {
    icon: HeartPulse,
    title: 'Healthy Habit Formation',
    description: 'Access resources and programs to understand and manage habits effectively.',
  },
  {
    icon: Users,
    title: 'Community Support (Future)',
    description: 'Connect with others, share experiences, and find encouragement (coming soon).',
  },
];

const steps = [
    { icon: FilePenLine, title: '1. Record Daily', description: 'Log your actions, thoughts, and journal entries easily.' },
    { icon: Repeat, title: '2. Track Habits', description: 'Monitor habits you want to cultivate or reduce.' },
    { icon: BarChart, title: '3. View Progress', description: 'See your karma score and trends on your dashboard.' },
    { icon: Goal, title: '4. Set Goals', description: 'Define personal goals and track your achievements.' },
];

export default function LandingPage() {
  return (
    <div className="bg-background text-foreground font-body">
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 sm:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Karma Journal:<br />Cultivate Balance, Inspire Growth.
              </h1>
              <p className="text-lg text-muted-foreground">
                Discover a new path to personal well-being. Track your actions, understand their impact, and build a more mindful, positive life, one day at a time.
              </p>
              <div className="flex gap-4">
                <Button asChild size="lg">
                    <Link href="/journal">Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="#features">Explore Features</Link>
                </Button>
              </div>
            </div>
            <div className="relative p-4 bg-white rounded-lg shadow-xl">
                 <Image
                    src="https://placehold.co/600x400.png"
                    alt="Karma Journal app screenshot on a phone"
                    width={600}
                    height={400}
                    className="rounded-md"
                    data-ai-hint="app on phone calm"
                />
                <div className="absolute top-8 right-8 bg-white/80 backdrop-blur-sm p-4 rounded-lg shadow-lg">
                    <p className="font-bold text-foreground">Transform Your Karma,</p>
                    <p className="text-muted-foreground">One Entry at a Time.</p>
                </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-secondary/50">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Not Just a Tracker. A Life Companion.</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Karma Journal is designed to be more than just a log. It's a tool for self-discovery, helping you understand your patterns, celebrate your progress, and gently guide you towards healthier habits and a more positive outlook.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {features.map((feature) => (
                        <Card key={feature.title} className="text-center bg-card">
                           <CardHeader>
                               <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <feature.icon className="w-6 h-6 text-primary" />
                               </div>
                                <CardTitle>{feature.title}</CardTitle>
                           </CardHeader>
                           <CardContent>
                                <p className="text-muted-foreground">{feature.description}</p>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20">
            <div className="container mx-auto px-4">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Simple. Personal. Powerful.</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Getting started with Karma Journal is easy. Follow these simple steps to begin your journey towards self-improvement.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {steps.map((step) => (
                        <Card key={step.title} className="text-center bg-card shadow-lg p-4">
                           <CardHeader>
                               <div className="mx-auto w-16 h-16 rounded-lg bg-secondary flex items-center justify-center mb-4">
                                    <step.icon className="w-8 h-8 text-foreground" />
                               </div>
                                <CardTitle className="text-xl">{step.title}</CardTitle>
                           </CardHeader>
                           <CardContent>
                                <p className="text-muted-foreground">{step.description}</p>
                           </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-secondary/50">
            <div className="container mx-auto px-4 text-center">
                <div className="bg-card p-10 rounded-lg shadow-xl max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Begin Your Journey to a More Mindful Life</h2>
                    <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
                        Ready to take control of your personal growth? Karma Journal provides the tools and insights you need to build a more positive and fulfilling life.
                    </p>
                    <Button asChild size="lg" className="mt-8">
                        <Link href="/journal">Get Started Today <ArrowRight className="ml-2"/></Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
