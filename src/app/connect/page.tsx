
"use client";

import {
  Users,
  Search,
  Trophy,
  UserPlus,
  BarChart2,
  Medal
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const classmates = [
    { id: '1', name: 'Rohan Sharma', avatar: 'https://placehold.co/40x40.png', karma: 119, level: 5, dataAiHint: 'child avatar' },
    { id: '2', name: 'Priya Patel', avatar: 'https://placehold.co/40x40.png', karma: 98, level: 4, dataAiHint: 'child avatar' },
    { id: '3', name: 'Arjun Mehta', avatar: 'https://placehold.co/40x40.png', karma: 152, level: 6, dataAiHint: 'child avatar' },
    { id: '4', name: 'Sana Khan', avatar: 'https://placehold.co/40x40.png', karma: 75, level: 3, dataAiHint: 'child avatar' },
];

const sharedChallenges = [
    { id: 'c1', title: '7-Day Morning Study Streak', description: 'Study for at least 30 minutes every morning for a week.', participants: 5, reward: 50 },
    { id: 'c2', title: 'Kindness Challenge', description: 'Complete 10 acts of kindness this week.', participants: 8, reward: 75 },
    { id: 'c3', title: 'Read a Book Together', description: 'Finish reading "The Adventures of Tom Sawyer" this month.', participants: 3, reward: 100 },
]

export default function ConnectPage() {
  return (
    <div className="container mx-auto p-4 sm:p-6 lg:p-8">
      <header className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
          <Users /> Connect & Compete
        </h1>
        <p className="text-muted-foreground">Find classmates, view progress, and take on challenges together.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle>Find Classmates</CardTitle>
                    <CardDescription>Search for your friends to connect with them.</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="flex gap-2">
                        <Input placeholder="Enter classmate's name or ID..." className="flex-grow" />
                        <Button><Search className="mr-2" /> Search</Button>
                    </div>
                </CardContent>
            </Card>
            
            <Card>
                <CardHeader>
                    <CardTitle>My Connections</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    {classmates.map(student => (
                       <div key={student.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                           <div className="flex items-center gap-4">
                               <Avatar className="h-12 w-12">
                                   <AvatarImage src={student.avatar} alt={student.name} data-ai-hint={student.dataAiHint}/>
                                   <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                               </Avatar>
                               <div>
                                   <p className="font-bold text-lg">{student.name}</p>
                                   <p className="text-sm text-muted-foreground">Level {student.level} • <span className="font-semibold text-primary">{student.karma} Karma</span></p>
                               </div>
                           </div>
                           <Button variant="outline" size="sm">View Profile</Button>
                       </div>
                   ))}
                </CardContent>
            </Card>
        </div>

        <div className="space-y-8">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><Trophy/> Shared Challenges</CardTitle>
                    <CardDescription>Join challenges with your classmates and earn bonus rewards.</CardDescription>
                </CardHeader>
                 <CardContent className="space-y-4">
                    {sharedChallenges.map(challenge => (
                        <div key={challenge.id} className="p-4 border rounded-lg space-y-2">
                           <h4 className="font-semibold">{challenge.title}</h4>
                           <p className="text-sm text-muted-foreground">{challenge.description}</p>
                           <div className="flex justify-between items-center pt-2">
                                <p className="text-xs font-bold text-primary">{challenge.participants} participants</p>
                                <Button size="sm" variant="secondary">Join for ₹{challenge.reward}</Button>
                           </div>
                        </div>
                    ))}
                 </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><BarChart2/> Weekly Leaderboard</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                    <div className="flex items-center">
                        <Medal className="w-6 h-6 text-yellow-500 mr-3"/>
                        <p>1. Arjun Mehta <span className="text-muted-foreground text-sm">(152)</span></p>
                    </div>
                     <div className="flex items-center">
                        <Medal className="w-6 h-6 text-slate-400 mr-3"/>
                        <p>2. You <span className="text-muted-foreground text-sm">(119)</span></p>
                    </div>
                     <div className="flex items-center">
                        <Medal className="w-6 h-6 text-amber-700 mr-3"/>
                        <p>3. Priya Patel <span className="text-muted-foreground text-sm">(98)</span></p>
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
