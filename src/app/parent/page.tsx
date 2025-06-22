
"use client";

import {
  User,
  Wallet,
  Settings2,
  LayoutDashboard,
  Gift,
  Bell,
  Camera,
  PlusCircle,
  Trash2,
  CreditCard,
  Landmark,
  Banknote,
  BookOpen,
  Target,
  Puzzle,
  TrendingUp,
  Sparkles,
  CalendarDays,
  Smile,
  CheckCircle2,
  Lightbulb,
  FileText,
  Check,
  X,
  MessageSquare,
  Award
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ResponsiveContainer, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Line } from 'recharts';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import { Textarea } from '@/components/ui/textarea';

const students = [
    { id: '1', name: 'Rohan', avatar: 'https://placehold.co/40x40.png' },
    { id: '2', name: 'Priya', avatar: 'https://placehold.co/40x40.png' }
];

const transactions = [
    { id: 't1', date: '2023-06-15', amount: 1000, method: 'Credit Card', status: 'Success' },
    { id: 't2', date: '2023-06-08', amount: 500, method: 'UPI', status: 'Success' },
    { id: 't3', date: '2023-05-20', amount: 2000, method: 'Net Banking', status: 'Success' },
];

const moodData = [
  { day: 'Mon', moodScore: 4 }, // 5-point scale: 1-Stressed, 2-Sad, 3-Neutral, 4-Happy, 5-Radiant
  { day: 'Tue', moodScore: 5 },
  { day: 'Wed', moodScore: 3 },
  { day: 'Thu', moodScore: 4 },
  { day: 'Fri', moodScore: 5 },
  { day: 'Sat', moodScore: 4 },
  { day: 'Sun', moodScore: 3 },
];

const moodLabels: { [key: number]: string } = {
  1: 'Stressed',
  2: 'Sad',
  3: 'Neutral',
  4: 'Happy',
  5: 'Radiant'
};


const completedActivities = [
    { name: 'Completed Homework', points: '+5 Karma, ₹2 Earned' },
    { name: 'Daily Journaling', points: '+10 Karma, ₹10 Earned' },
    { name: 'Solved Math Puzzle', points: '+15 Karma, ₹3 Earned' },
]

const weeklyHabits = [
    { name: 'Woke up on time', days: [true, true, false, true, true, false, true] },
    { name: 'Limited screen time', days: [true, false, true, true, false, true, true] },
    { name: 'Read a book chapter', days: [true, true, true, true, true, true, true] },
]

const aiSuggestions = [
    "Rohan has a 5-day journaling streak! Consider giving him a small bonus to celebrate this consistency.",
    "Priya seems to struggle with 'Task Completion' on weekends. Maybe discuss a lighter schedule for Saturdays and Sundays?",
    "Consider increasing the reward for 'Test Prep' as exams are approaching to provide extra motivation."
]

const pendingApprovals = [
    { id: 'a1', studentName: 'Rohan', task: 'Completed "Topping a Test" Achievement', evidence: 'Rohan wrote in his journal: "I got a 95% on my math test! I studied for it all week."', requestedAmount: 100 },
    { id: 'a2', studentName: 'Priya', task: '7-Day Journaling Streak Bonus', evidence: 'Logged a journal entry for 7 consecutive days.', requestedAmount: 50 },
    { id: 'a3', studentName: 'Rohan', task: 'Solved "Find the Scientists" Word Search', evidence: 'Completed the puzzle on June 18th.', requestedAmount: 50 },
];

const notifications = [
    { id: 'n5', studentName: 'Rohan', message: 'is requesting to redeem ₹200 from his wallet.', date: 'Just now', icon: Wallet, type: 'action_required' },
    { id: 'n1', studentName: 'Rohan', message: 'Completed his daily journaling.', date: '2 hours ago', icon: BookOpen, type: 'info' },
    { id: 'n2', studentName: 'Priya', message: 'Reached a 7-day task completion streak!', date: 'Yesterday', icon: TrendingUp, type: 'info' },
    { id: 'n3', studentName: 'Rohan', message: 'Was awarded ₹50 for the weekly challenge.', date: '3 days ago', icon: Award, type: 'info' },
    { id: 'n4', studentName: 'Priya', message: 'Set a new goal: "Read 5 book chapters".', date: '4 days ago', icon: Target, type: 'info' },
];

export default function ParentDashboardPage() {
  return (
    <div className="min-h-screen bg-muted/20">
      <main className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold text-foreground">
            Parent Dashboard
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
            Welcome, Parent! Here you can manage your child's journey, set rewards, and monitor their growth in a secure and supportive environment.
          </p>
        </header>

        <Tabs defaultValue="profile" className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 mb-6">
                <TabsTrigger value="profile"><User className="mr-2"/> Profile</TabsTrigger>
                <TabsTrigger value="wallet"><Wallet className="mr-2"/> Wallet</TabsTrigger>
                <TabsTrigger value="rules"><Settings2 className="mr-2"/> Rules</TabsTrigger>
                <TabsTrigger value="progress"><LayoutDashboard className="mr-2"/> Progress</TabsTrigger>
                <TabsTrigger value="rewards"><Gift className="mr-2"/> Approvals</TabsTrigger>
                <TabsTrigger value="notifications"><Bell className="mr-2"/> Alerts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Parent Information</CardTitle>
                        <CardDescription>This information is private and helps personalize your experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center gap-6">
                            <Avatar className="h-20 w-20 flex-shrink-0">
                                <AvatarImage src="https://placehold.co/80x80.png" alt="Parent Photo" data-ai-hint="person avatar"/>
                                <AvatarFallback>P</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2 w-full">
                                <Label htmlFor="picture">Profile Photo (Optional)</Label>
                                <div className="flex items-center gap-2">
                                   <Input id="picture" type="file" className="max-w-sm"/>
                                   <Button variant="outline" size="icon"><Camera className="h-4 w-4" /></Button>
                                </div>
                                <p className="text-xs text-muted-foreground">Upload a PNG or JPG, max 2MB.</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" placeholder="e.g., Asha Sharma" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" placeholder="e.g., asha.sharma@example.com" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Linked Students</CardTitle>
                        <CardDescription>Manage the students connected to your account.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                           {students.map(student => (
                               <div key={student.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 bg-muted rounded-lg gap-4">
                                   <div className="flex items-center gap-4">
                                       <Avatar>
                                           <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="child avatar"/>
                                           <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                       </Avatar>
                                       <p className="font-semibold">{student.name}</p>
                                   </div>
                                   <div className="flex items-center gap-2 self-end sm:self-center">
                                       <Button variant="outline" size="sm">Manage</Button>
                                       <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10">
                                           <Trash2 className="h-4 w-4" />
                                       </Button>
                                   </div>
                               </div>
                           ))}
                        </div>
                        <Button variant="secondary" className="mt-6">
                            <PlusCircle className="mr-2" /> Add Another Student
                        </Button>
                    </CardContent>
                </Card>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Preferences & Limits</CardTitle>
                        <CardDescription>Customize notifications and set spending controls for your students.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                         <div className="space-y-4">
                            <h4 className="font-medium text-foreground">Notification Settings</h4>
                             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg border gap-4">
                                <div className="flex-grow">
                                    <Label htmlFor="email-notifications" className="font-semibold cursor-pointer">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive weekly progress reports and important alerts via email.</p>
                                </div>
                                <Switch id="email-notifications" defaultChecked />
                            </div>
                             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg border gap-4">
                                <div className="flex-grow">
                                    <Label htmlFor="push-notifications" className="font-semibold cursor-pointer">Push Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Get real-time mobile alerts for reward approvals and milestones.</p>
                                </div>
                                <Switch id="push-notifications" />
                            </div>
                         </div>
                         <Separator />
                          <div className="space-y-4">
                            <h4 className="font-medium text-foreground">Financial Controls</h4>
                             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div className="space-y-2">
                                    <Label htmlFor="weekly-limit">Default Weekly Spending Limit (per student)</Label>
                                    <Input id="weekly-limit" type="number" placeholder="e.g., 500" />
                                </div>
                                 <div className="space-y-2">
                                    <Label className="font-semibold">Reward Approval</Label>
                                     <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 rounded-lg border min-h-[5.25rem] gap-4">
                                        <div className="flex-grow">
                                            <Label htmlFor="manual-approval" className="font-normal cursor-pointer">Require manual approval</Label>
                                            <p className="text-sm text-muted-foreground">You must approve rewards before funds are sent.</p>
                                        </div>
                                        <Switch id="manual-approval" defaultChecked />
                                    </div>
                                </div>
                             </div>
                         </div>
                    </CardContent>
                </Card>
                <div className="flex justify-end">
                    <Button size="lg">Save All Changes</Button>
                </div>

            </TabsContent>

            <TabsContent value="wallet" className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Parent Wallet</CardTitle>
                        <CardDescription>Manage your central wallet to fund your students' rewards.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                        <div className="space-y-6">
                            <div className="p-6 rounded-lg bg-primary/10 border-primary/20 border">
                                <Label className="text-sm font-medium text-primary-foreground/80">Current Balance</Label>
                                <p className="text-4xl font-bold text-primary-foreground">₹5,000.00</p>
                            </div>
                             <div className="space-y-4">
                                <Label htmlFor="amount" className="font-semibold">Load Money to Wallet</Label>
                                <Input id="amount" type="number" placeholder="Enter amount in ₹" />
                                <Select defaultValue="upi">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select Payment Method" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="upi"><Banknote className="mr-2"/> UPI</SelectItem>
                                        <SelectItem value="card"><CreditCard className="mr-2"/> Credit/Debit Card</SelectItem>
                                        <SelectItem value="netbanking"><Landmark className="mr-2"/> Net Banking</SelectItem>
                                    </SelectContent>
                                </Select>
                                <Button className="w-full" size="lg">Add Funds</Button>
                                <p className="text-xs text-muted-foreground text-center">All transactions are secure and require OTP/PIN verification.</p>
                            </div>
                        </div>
                        <div className="space-y-6">
                           <h4 className="font-semibold text-foreground">Managed Payment Methods</h4>
                           <div className="space-y-3">
                               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-3">
                                   <div className="flex items-center gap-3">
                                       <CreditCard className="w-6 h-6 text-muted-foreground"/>
                                       <div>
                                           <p className="font-medium">HDFC Bank Credit Card</p>
                                           <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
                                       </div>
                                   </div>
                                   <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 self-end sm:self-center"><Trash2 className="h-4 w-4"/></Button>
                               </div>
                               <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 border rounded-lg gap-3">
                                   <div className="flex items-center gap-3">
                                       <Banknote className="w-6 h-6 text-muted-foreground"/>
                                       <div>
                                           <p className="font-medium">UPI</p>
                                           <p className="text-sm text-muted-foreground">parent@ybl</p>
                                       </div>
                                   </div>
                                   <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10 self-end sm:self-center"><Trash2 className="h-4 w-4"/></Button>
                               </div>
                           </div>
                           <Button variant="secondary" className="w-full"><PlusCircle className="mr-2"/> Add New Payment Method</Button>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Student Spending Limits</CardTitle>
                        <CardDescription>Set weekly or monthly spending caps for each student from your main wallet.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {students.map(student => (
                            <div key={student.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted rounded-lg">
                                <div className="flex items-center gap-4 mb-4 sm:mb-0">
                                    <Avatar>
                                        <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="child avatar"/>
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <p className="font-semibold">{student.name}'s Limit</p>
                                </div>
                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    <Input type="number" placeholder="e.g., 500" className="w-full sm:w-32" />
                                     <Select defaultValue="weekly">
                                        <SelectTrigger className="w-full sm:w-32">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="weekly">per Week</SelectItem>
                                            <SelectItem value="monthly">per Month</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        ))}
                         <div className="flex justify-end pt-2">
                             <Button>Save Limits</Button>
                         </div>
                    </CardContent>
                </Card>

                 <Card>
                    <CardHeader>
                        <CardTitle>Transaction History</CardTitle>
                        <CardDescription>A log of all money added to your parent wallet.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Date</TableHead>
                                    <TableHead>Amount</TableHead>
                                    <TableHead className="hidden md:table-cell">Method</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map(tx => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                                        <TableCell className="hidden md:table-cell">{tx.method}</TableCell>
                                        <TableCell className="text-right font-medium text-green-600">{tx.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            
            <TabsContent value="rules" className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Core Earning Rules</CardTitle>
                        <CardDescription>
                            Set the base rewards for key activities. Toggle a rule off to disable earnings for that activity.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-4">
                            <div className="flex items-center gap-4 flex-grow">
                                <BookOpen className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <Label htmlFor="journal-reward" className="font-semibold">Daily Journaling Reward</Label>
                                    <p className="text-sm text-muted-foreground">Reward for writing a journal entry each day.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <Input id="journal-reward" type="number" placeholder="e.g., 10" className="w-24" />
                                <Switch id="journal-switch" defaultChecked />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-4">
                            <div className="flex items-center gap-4 flex-grow">
                                <Target className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <Label htmlFor="task-reward" className="font-semibold">Per-Task Completion Reward</Label>
                                    <p className="text-sm text-muted-foreground">Reward for each task marked 'Done' in the planner.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <Input id="task-reward" type="number" placeholder="e.g., 5" className="w-24" />
                                <Switch id="task-switch" defaultChecked />
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-4">
                            <div className="flex items-center gap-4 flex-grow">
                                <Puzzle className="w-6 h-6 text-primary flex-shrink-0" />
                                <div>
                                    <Label htmlFor="puzzle-reward" className="font-semibold">Puzzle & Quest Reward</Label>
                                    <p className="text-sm text-muted-foreground">Reward for solving daily or weekly puzzles.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <Input id="puzzle-reward" type="number" placeholder="e.g., 20" className="w-24" />
                                <Switch id="puzzle-switch" defaultChecked />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Karma Points Conversion</CardTitle>
                        <CardDescription>Optionally, convert daily Karma Score into wallet money.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-4">
                            <div className="flex-grow">
                                <Label htmlFor="karma-conversion-switch" className="font-semibold cursor-pointer">Enable Karma Score to Wallet Conversion</Label>
                                <p className="text-sm text-muted-foreground">Automatically convert positive karma points into money at the end of the day.</p>
                            </div>
                            <Switch id="karma-conversion-switch" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="karma-points">Karma Points</Label>
                                <Input id="karma-points" type="number" placeholder="e.g., 100" />
                            </div>
                            <div className="text-center font-bold text-2xl self-center pb-2">=</div>
                            <div className="space-y-2">
                                <Label htmlFor="karma-rupees">Wallet Amount (₹)</Label>
                                <Input id="karma-rupees" type="number" placeholder="e.g., 10" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
                
                <Card>
                    <CardHeader>
                        <CardTitle>Bonuses & Streaks</CardTitle>
                        <CardDescription>Reward consistency and major achievements with extra bonuses.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-4">
                            <div className="flex items-center gap-4 flex-grow">
                                <TrendingUp className="w-6 h-6 text-green-500" />
                                <div>
                                    <Label htmlFor="streak-bonus" className="font-semibold">7-Day Journaling Streak Bonus</Label>
                                    <p className="text-sm text-muted-foreground">Extra reward for journaling every day for a week.</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <Input id="streak-bonus" type="number" placeholder="e.g., 50" className="w-24" />
                                <Switch id="streak-switch" defaultChecked />
                            </div>
                        </div>
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-lg border gap-4">
                            <div className="flex items-center gap-4 flex-grow">
                                <Sparkles className="w-6 h-6 text-yellow-500" />
                                <div>
                                    <Label htmlFor="achievement-bonus" className="font-semibold">Major Achievement Bonus</Label>
                                    <p className="text-sm text-muted-foreground">Set a custom bonus for things like "Topping a Test".</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 flex-shrink-0">
                                <Input id="achievement-bonus" type="number" placeholder="e.g., 100" className="w-24" />
                                <Button variant="outline">Set Trigger</Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end">
                    <Button size="lg">Save Earning Rules</Button>
                </div>
            </TabsContent>
            
            <TabsContent value="progress" className="space-y-6">
                <Card>
                    <CardHeader className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                        <div className="space-y-1.5 flex-grow">
                            <CardTitle>Student Progress Dashboard</CardTitle>
                            <CardDescription>An overview of your student's activities and well-being.</CardDescription>
                        </div>
                         <div className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                             <Select defaultValue='rohan'>
                                <SelectTrigger className="w-full sm:w-[150px]">
                                    <SelectValue placeholder="Select Student" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="rohan">Rohan</SelectItem>
                                    <SelectItem value="priya">Priya</SelectItem>
                                </SelectContent>
                            </Select>
                            <Select defaultValue='today'>
                                <SelectTrigger className="w-full sm:w-[150px]">
                                    <SelectValue placeholder="Select Period" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="today">Today</SelectItem>
                                    <SelectItem value="week">This Week</SelectItem>
                                    <SelectItem value="month">This Month</SelectItem>
                                </SelectContent>
                            </Select>
                         </div>
                    </CardHeader>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-lg">Today's Karma Score</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold text-green-500">+25</p>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle className="text-lg">Today's Earnings</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-5xl font-bold text-primary">₹15</p>
                        </CardContent>
                    </Card>
                    <Card>
                         <CardHeader>
                            <CardTitle className="text-lg">Today's Mood</CardTitle>
                        </CardHeader>
                        <CardContent className="flex items-center gap-3">
                            <Smile className="w-12 h-12 text-green-500"/>
                            <p className="text-2xl font-semibold">Happy</p>
                        </CardContent>
                    </Card>
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><FileText/>Completed Activities Today</CardTitle>
                    </CardHeader>
                    <CardContent>
                         <ul className="space-y-2">
                            {completedActivities.map((activity, index) => (
                                <li key={index} className="flex justify-between items-center text-sm p-2 bg-muted rounded-md">
                                    <span className="font-medium">{activity.name}</span>
                                    <span className="text-muted-foreground">{activity.points}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                </Card>
                
                <Separator />
                
                <h2 className="text-2xl font-bold pt-4 flex items-center gap-3"><CalendarDays/> Weekly Report</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Engagement</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div>
                                <Label>Journaling Streak: 5 days</Label>
                                <Progress value={5/7 * 100} className="h-2 mt-1" />
                            </div>
                             <div>
                                <Label>Task Completion Rate: 80%</Label>
                                <Progress value={80} className="h-2 mt-1" />
                            </div>
                             <div>
                                <Label>Quests Solved: 3 / 5</Label>
                                <Progress value={3/5 * 100} className="h-2 mt-1" />
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card>
                        <CardHeader>
                            <CardTitle>Weekly Mood Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                             <ChartContainer config={{}} className="h-[200px] w-full">
                                <ResponsiveContainer>
                                    <LineChart data={moodData} margin={{ top: 5, right: 10, left: -20, bottom: 0 }}>
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" tick={{fontSize: 12}}/>
                                        <YAxis dataKey="moodScore" domain={[1, 5]} tickFormatter={(value) => moodLabels[value] || ''} stroke="hsl(var(--muted-foreground))" tick={{fontSize: 10}} width={40} />
                                        <Tooltip content={<ChartTooltipContent indicator="dot" />} />
                                        <Line type="monotone" dataKey="moodScore" stroke="hsl(var(--primary))" strokeWidth={2} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </ChartContainer>
                        </CardContent>
                    </Card>
                </div>
                
                 <Card>
                    <CardHeader>
                        <CardTitle>Weekly Habit Tracking</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                           {weeklyHabits.map((habit, index) => (
                               <div key={index}>
                                   <p className="text-sm font-medium mb-2">{habit.name}</p>
                                   <div className="flex gap-1.5">
                                       {habit.days.map((done, dayIndex) => (
                                           <div key={dayIndex} className={cn("w-full h-8 rounded-md flex items-center justify-center", done ? "bg-green-500/20" : "bg-muted")}>
                                               {done && <CheckCircle2 className="w-4 h-4 text-green-700" />}
                                           </div>
                                       ))}
                                   </div>
                               </div>
                           ))}
                        </div>
                    </CardContent>
                </Card>

                <Card className="bg-primary/10 border-primary/20">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Lightbulb/> Aura's Suggestions for You</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="space-y-2 list-disc list-inside text-primary-foreground/90">
                           {aiSuggestions.map((suggestion, index) => (
                               <li key={index}>{suggestion}</li>
                           ))}
                        </ul>
                    </CardContent>
                </Card>

            </TabsContent>
            <TabsContent value="rewards" className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Reward Approvals Queue</CardTitle>
                        <CardDescription>Review and approve your student's manually claimed rewards and achievements. Auto-approved rewards are transferred directly.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {pendingApprovals.length > 0 ? (
                            pendingApprovals.map(approval => (
                                <div key={approval.id} className="p-4 border rounded-lg space-y-4 bg-card">
                                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start">
                                        <div>
                                            <h4 className="font-semibold text-lg flex items-center gap-2">
                                                <Gift className="w-5 h-5 text-primary" /> {approval.task}
                                            </h4>
                                            <p className="text-sm text-muted-foreground ml-7">
                                                <span className="font-medium">{approval.studentName}</span> is requesting <span className="font-bold text-primary">₹{approval.requestedAmount}</span>.
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-2 mt-2 sm:mt-0 self-end sm:self-start">
                                            <Button variant="destructive" size="sm"><X className="mr-2 h-4 w-4" /> Deny</Button>
                                            <Button size="sm"><Check className="mr-2 h-4 w-4" /> Approve</Button>
                                        </div>
                                    </div>
                                    <Separator />
                                    <div>
                                        <Label className="font-medium text-xs text-muted-foreground uppercase flex items-center gap-1.5"><FileText /> Evidence / Notes</Label>
                                        <blockquote className="text-sm p-3 bg-muted rounded-md mt-1 border-l-4 border-primary/50">{approval.evidence}</blockquote>
                                    </div>
                                    <div>
                                        <Label htmlFor={`message-${approval.id}`} className="font-medium text-xs text-muted-foreground uppercase flex items-center gap-1.5"><MessageSquare /> Encouragement Message (Optional)</Label>
                                        <Textarea id={`message-${approval.id}`} placeholder="Great job on this!" className="mt-1"/>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-10">
                                <p className="text-muted-foreground">The approval queue is empty.</p>
                            </div>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="notifications" className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Notifications & Activity Feed</CardTitle>
                        <CardDescription>Stay updated with your students' milestones and activities.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {notifications.map(notif => {
                                const Icon = notif.icon;
                                return (
                                    <div key={notif.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-3 rounded-lg border">
                                        <div className="flex items-start gap-4">
                                            <div className="p-2 bg-primary/10 rounded-full mt-1 sm:mt-0 flex-shrink-0">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                            <div>
                                                <p className="font-medium text-foreground">
                                                    <span className="font-bold">{notif.studentName}</span> {notif.message}
                                                </p>
                                                <p className="text-xs text-muted-foreground">{notif.date}</p>
                                            </div>
                                        </div>
                                        <div className="self-end sm:self-center flex-shrink-0">
                                            {notif.type === 'action_required' ? (
                                                <Button size="sm">Review Request</Button>
                                            ) : (
                                                <Button variant="ghost" size="sm">
                                                    <MessageSquare className="mr-2 h-4 w-4" />
                                                    Reply
                                                </Button>
                                            )}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-accent/20 border-accent/40">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-3"><Gift className="text-accent-foreground" /> Set a Bonus Challenge</CardTitle>
                        <CardDescription>Motivate your student with a special, one-time reward for a custom goal.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <p className="text-sm text-muted-foreground flex-grow">For example: "Get an A on the next Science test for a ₹200 bonus."</p>
                        <Button className="self-end sm:self-center flex-shrink-0">Create Challenge</Button>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
