
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Download,
  Users,
  FilePenLine,
  Star,
  Wallet,
  TrendingUp,
  Target,
  Bot,
  Puzzle,
  Calendar,
  GraduationCap,
  Gift,
  Mail,
  Quote,
  ArrowRight,
} from 'lucide-react';
import { LandingFooter } from '@/components/landing/landing-footer';

const features = [
  {
    icon: Target,
    title: 'Gamified Goals & Habit Tracking',
  },
  {
    icon: Bot,
    title: 'AI Coach for Nudges & Feedback',
  },
  {
    icon: Wallet,
    title: 'Pocket Money Wallet for Motivation',
  },
  {
    icon: Puzzle,
    title: 'Educational Puzzles & Challenges',
  },
  {
    icon: Calendar,
    title: 'Mood & Reflection Calendar',
  },
  {
    icon: Users,
    title: 'Connect & Compete with Friends',
  },
];

const howItWorksSteps = [
    { icon: FilePenLine, title: 'Reflect Daily', description: 'Start each day by journaling your thoughts and setting intentions in a private, secure space.' },
    { icon: Star, title: 'Take Positive Action', description: 'Complete goals, learn new things, and build healthy habits suggested by your AI coach, Aura.' },
    { icon: Wallet, title: 'Earn Real Rewards', description: 'Unlock pocket money, pre-loaded by parents, for every achievement and milestone you reach.' },
    { icon: TrendingUp, title: 'Watch Yourself Grow', description: 'Visualize your journey on a personal dashboard and see your well-being and skills improve over time.' },
];

const testimonials = [
    { quote: "This app completely changed how my son approaches his studies. The rewards system is genius!", author: "Asha S., Parent" },
    { quote: "I actually look forward to journaling now. It's fun to see my Karma Score go up and earn money for it.", author: "Rohan, Grade 9 Student" },
    { quote: "As a teacher, I love tools that promote self-reflection. Karma Compass does this beautifully.", author: "Mr. Verma, Teacher" },
]

export default function LandingPage() {
  return (
    <div className="text-foreground font-body">
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-4 py-20 sm:py-32">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-center justify-center md:justify-start text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                    <span className="bg-gradient-to-r from-primary to-green-500 text-transparent bg-clip-text">Habits made rewarding</span>
                  </h1>
              </div>
              <p className="text-lg text-muted-foreground">
                Every small step counts—and pays. Karma Compass turns your focus, discipline, and self-care into points and pocket cash.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg">
                    <Link href="/login">📝 Get Started</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                    <Link href="/parent">👨‍👩‍👧 For Parents</Link>
                </Button>
                 <Button asChild variant="secondary" size="lg">
                    <Link href="#cta">📲 Download the App</Link>
                </Button>
              </div>
            </div>
            <div className="relative p-4 flex justify-center">
                 <Image
                    src="https://i.postimg.cc/4325wRmf/Chat-GPT-Image-Jun-22-2025-09-07-03-PM.png"
                    alt="Karma Compass app screenshot"
                    width={400}
                    height={600}
                    className="rounded-lg shadow-2xl"
                    data-ai-hint="app screenshot"
                />
            </div>
          </div>
        </section>

        {/* Karma Compass Feature Section */}
        <section className="py-20 bg-secondary/50">
            <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center">
                <div>
                     <Image
                        src="https://i.postimg.cc/C5NFsLJ5/SKJ.png"
                        alt="Karma Compass showing a Karma Score of +35 and an EQ score of 88"
                        width={500}
                        height={300}
                        className="rounded-lg shadow-xl mx-auto"
                        data-ai-hint="compass dashboard"
                    />
                </div>
                <div className="space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold">The Karma Compass</h2>
                     <p className="text-lg text-muted-foreground">
                        Your personal guide to daily growth.
                    </p>
                    <ul className="space-y-3 text-muted-foreground list-disc list-inside">
                        <li>Visualize your daily Karma Score with an intuitive compass needle.</li>
                        <li>Track your Emotional Quotient (EQ) based on your reflections and actions.</li>
                        <li>Receive instant, animated feedback on your progress.</li>
                        <li>Turn self-improvement into a fun and rewarding visual experience.</li>
                    </ul>
                </div>
            </div>
        </section>

        {/* What Is Karma Compass? */}
        <section className="py-20">
             <div className="container mx-auto px-4">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">What Is Karma Compass?</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Karma Compass is an all-in-one smart journal designed to help students build self-awareness and discipline. It goes beyond simple tracking by integrating daily reflections, gamified habit-building, and AI-powered coaching to encourage holistic growth.
                    </p>
                </div>
            </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-secondary/50">
            <div className="container mx-auto px-4">
                 <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">How Karma Compass Works</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        A simple, powerful four-step process designed for growth and motivation.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-16">
                    {howItWorksSteps.map((step) => (
                        <Card key={step.title} className="bg-card shadow-lg text-center transform transition-transform duration-300 hover:-translate-y-2 border-t-4 border-primary/50 hover:border-primary">
                           <CardHeader>
                               <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                    <step.icon className="w-8 h-8 text-primary" />
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
        
        {/* Key Features Section */}
        <section id="features" className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Everything You Need to Succeed</h2>
                    <p className="mt-4 text-lg text-muted-foreground">
                        Karma Compass is packed with features designed for student well-being and growth.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
                    {features.map((feature) => (
                        <Card key={feature.title} className="text-left bg-card p-2">
                           <CardHeader className="flex flex-row items-center gap-4">
                               <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                                    <feature.icon className="w-6 h-6 text-primary" />
                               </div>
                               <div>
                                 <CardTitle className="text-lg">{feature.title}</CardTitle>
                               </div>
                           </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* Designed For Students, Trusted By Parents */}
        <section id="for-parents" className="py-20 bg-secondary/50">
             <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Designed For Students, Trusted By Parents</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
                    <Card className="bg-card shadow-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <GraduationCap className="w-10 h-10 text-primary" />
                            <h3 className="text-2xl font-bold">For Students</h3>
                        </div>
                        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                            <li>Build a growth mindset and self-awareness.</li>
                            <li>Track your personal wins and achievements.</li>
                            <li>Unlock real rewards for your hard work.</li>
                        </ul>
                    </Card>
                     <Card className="bg-card shadow-xl p-6">
                        <div className="flex items-center gap-4 mb-4">
                            <Users className="w-10 h-10 text-green-600" />
                            <h3 className="text-2xl font-bold">For Parents</h3>
                        </div>
                        <ul className="space-y-2 list-disc list-inside text-muted-foreground">
                           <li>Monitor your child's engagement & mood.</li>
                           <li>Securely preload the student wallet for rewards.</li>
                           <li>Encourage positive behavior and healthy habits.</li>
                        </ul>
                        <div className="mt-6">
                            <Button asChild>
                                <Link href="/parent">
                                    Go to Parent Dashboard <ArrowRight className="ml-2" />
                                </Link>
                            </Button>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
        
        {/* Testimonials Section */}
        <section className="py-20">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-3xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold">Loved by Students, Parents, and Teachers</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index} className="bg-card">
                            <CardContent className="pt-6">
                                <Quote className="w-8 h-8 text-primary/30 mb-4"/>
                                <p className="italic text-muted-foreground">"{testimonial.quote}"</p>
                                <p className="font-bold text-right mt-4">- {testimonial.author}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>

        {/* CTA Section */}
        <section id="cta" className="py-20 bg-secondary/50">
            <div className="container mx-auto px-4 text-center">
                <div className="bg-card p-10 rounded-lg shadow-xl max-w-4xl mx-auto border-t-4 border-primary">
                    <h2 className="text-3xl md:text-4xl font-bold">Ready to Start Your Reflection Journey?</h2>
                    <div className="flex flex-wrap justify-center gap-4 mt-8">
                        <Button size="lg" className="bg-green-600 hover:bg-green-700">
                            <Download className="mr-2"/> Download App
                        </Button>
                        <Button variant="outline" size="lg">
                            <Mail className="mr-2"/> Join Waitlist
                        </Button>
                         <Button variant="secondary" size="lg">
                            <Gift className="mr-2"/> Gift This to a Student
                        </Button>
                    </div>
                </div>
            </div>
        </section>
      </main>
      <LandingFooter />
    </div>
  );
}
