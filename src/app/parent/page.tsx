
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
  Banknote
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

const students = [
    { id: '1', name: 'Rohan', avatar: 'https://placehold.co/40x40.png' },
    { id: '2', name: 'Priya', avatar: 'https://placehold.co/40x40.png' }
];

const transactions = [
    { id: 't1', date: '2023-06-15', amount: 1000, method: 'Credit Card', status: 'Success' },
    { id: 't2', date: '2023-06-08', amount: 500, method: 'UPI', status: 'Success' },
    { id: 't3', date: '2023-05-20', amount: 2000, method: 'Net Banking', status: 'Success' },
]

export default function ParentDashboardPage() {
  return (
    <div className="min-h-screen">
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
            <TabsList className="grid w-full grid-cols-1 sm:grid-cols-6 mb-6">
                <TabsTrigger value="profile"><User className="mr-2"/> Profile Setup</TabsTrigger>
                <TabsTrigger value="wallet"><Wallet className="mr-2"/> Wallet & Billing</TabsTrigger>
                <TabsTrigger value="rules"><Settings2 className="mr-2"/> Earning Rules</TabsTrigger>
                <TabsTrigger value="progress"><LayoutDashboard className="mr-2"/> Student Progress</TabsTrigger>
                <TabsTrigger value="rewards"><Gift className="mr-2"/> Reward Approvals</TabsTrigger>
                <TabsTrigger value="notifications"><Bell className="mr-2"/> Notifications</TabsTrigger>
            </TabsList>
            
            <TabsContent value="profile" className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle>Parent Information</CardTitle>
                        <CardDescription>This information is private and helps personalize your experience.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-6">
                            <Avatar className="h-20 w-20">
                                <AvatarImage src="https://placehold.co/80x80.png" alt="Parent Photo" data-ai-hint="person avatar"/>
                                <AvatarFallback>P</AvatarFallback>
                            </Avatar>
                            <div className="space-y-2">
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
                               <div key={student.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                                   <div className="flex items-center gap-4">
                                       <Avatar>
                                           <AvatarImage src={student.avatar} alt={student.name} data-ai-hint="child avatar"/>
                                           <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                       </Avatar>
                                       <p className="font-semibold">{student.name}</p>
                                   </div>
                                   <div className="flex items-center gap-2">
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
                             <div className="flex items-center justify-between p-3 rounded-lg border">
                                <div>
                                    <Label htmlFor="email-notifications" className="font-semibold cursor-pointer">Email Notifications</Label>
                                    <p className="text-sm text-muted-foreground">Receive weekly progress reports and important alerts via email.</p>
                                </div>
                                <Switch id="email-notifications" defaultChecked />
                            </div>
                             <div className="flex items-center justify-between p-3 rounded-lg border">
                                <div>
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
                                     <div className="flex items-center justify-between p-3 rounded-lg border h-[5.25rem]">
                                        <div>
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
                               <div className="flex items-center justify-between p-3 border rounded-lg">
                                   <div className="flex items-center gap-3">
                                       <CreditCard className="w-6 h-6 text-muted-foreground"/>
                                       <div>
                                           <p className="font-medium">HDFC Bank Credit Card</p>
                                           <p className="text-sm text-muted-foreground">**** **** **** 1234</p>
                                       </div>
                                   </div>
                                   <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4"/></Button>
                               </div>
                               <div className="flex items-center justify-between p-3 border rounded-lg">
                                   <div className="flex items-center gap-3">
                                       <Banknote className="w-6 h-6 text-muted-foreground"/>
                                       <div>
                                           <p className="font-medium">UPI</p>
                                           <p className="text-sm text-muted-foreground">parent@ybl</p>
                                       </div>
                                   </div>
                                   <Button variant="ghost" size="icon" className="text-destructive hover:bg-destructive/10"><Trash2 className="h-4 w-4"/></Button>
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
                            <div key={student.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-muted/50 rounded-lg">
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
                                    <TableHead>Payment Method</TableHead>
                                    <TableHead className="text-right">Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {transactions.map(tx => (
                                    <TableRow key={tx.id}>
                                        <TableCell>{tx.date}</TableCell>
                                        <TableCell>₹{tx.amount.toFixed(2)}</TableCell>
                                        <TableCell>{tx.method}</TableCell>
                                        <TableCell className="text-right font-medium text-green-600">{tx.status}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="rules">
                <Card>
                    <CardHeader><CardTitle>Earning Rules</CardTitle></CardHeader>
                    <CardContent><p>Earning rule settings will be here.</p></CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="progress">
                <Card>
                    <CardHeader><CardTitle>Student Progress</CardTitle></CardHeader>
                    <CardContent><p>Student progress dashboard will be here.</p></CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="rewards">
                <Card>
                    <CardHeader><CardTitle>Reward Approvals</CardTitle></CardHeader>
                    <CardContent><p>Reward approval queue will be here.</p></CardContent>
                </Card>
            </TabsContent>
             <TabsContent value="notifications">
                <Card>
                    <CardHeader><CardTitle>Notifications</CardTitle></CardHeader>
                    <CardContent><p>Notification settings and history will be here.</p></CardContent>
                </Card>
            </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}

    
