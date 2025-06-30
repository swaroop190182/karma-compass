"use client";

import { useState, useEffect } from 'react';
import { User, BookOpen, Target, GraduationCap, Edit3, Save, Camera, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { boards, grades, subjectsByBoardAndGrade, type Board, type Grade, type Subject } from '@/lib/education';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
    // Mocking user data state. In a real app, this would come from a context or API.
    const [name, setName] = useState('Rohan');
    const [avatar, setAvatar] = useState('https://placehold.co/100x100.png');
    const [selectedBoard, setSelectedBoard] = useState<Board>('CBSE');
    const [selectedGrade, setSelectedGrade] = useState<Grade>('Grade 9');
    const [subjects, setSubjects] = useState<Subject[]>([]);
    const [favoriteSubjects, setFavoriteSubjects] = useState<Set<string>>(new Set(['Science']));
    const [challengingSubjects, setChallengingSubjects] = useState<Set<string>>(new Set(['Mathematics']));
    const [personalGoal, setPersonalGoal] = useState('I want to get better at solving math problems and be more consistent with my study schedule.');
    const { toast } = useToast();

    useEffect(() => {
        if (selectedBoard && selectedGrade) {
            setSubjects(subjectsByBoardAndGrade[selectedBoard][selectedGrade] || []);
        }
    }, [selectedBoard, selectedGrade]);

    const handleSubjectToggle = (subjectName: string, list: 'favorite' | 'challenging') => {
        if (list === 'favorite') {
            const newFavorites = new Set(favoriteSubjects);
            if (newFavorites.has(subjectName)) {
                newFavorites.delete(subjectName);
            } else {
                newFavorites.add(subjectName);
                // A subject can't be both favorite and challenging
                const newChallenging = new Set(challengingSubjects);
                if(newChallenging.has(subjectName)) newChallenging.delete(subjectName);
                setChallengingSubjects(newChallenging);
            }
            setFavoriteSubjects(newFavorites);
        } else {
            const newChallenging = new Set(challengingSubjects);
            if (newChallenging.has(subjectName)) {
                newChallenging.delete(subjectName);
            } else {
                newChallenging.add(subjectName);
                 // A subject can't be both favorite and challenging
                const newFavorites = new Set(favoriteSubjects);
                if(newFavorites.has(subjectName)) newFavorites.delete(subjectName);
                setFavoriteSubjects(newFavorites);
            }
            setChallengingSubjects(newChallenging);
        }
    };

    const handleSave = () => {
        // In a real app, this would save to a database.
        toast({
            title: "Profile Saved!",
            description: "Your information has been successfully updated.",
        });
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
                    <User /> My Profile
                </h1>
                <p className="text-muted-foreground">Manage your information to personalize your Karma Compass experience.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Basic Info */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="flex items-center gap-6">
                                <Avatar className="h-24 w-24">
                                    <AvatarImage src={avatar} alt={name} data-ai-hint="child avatar"/>
                                    <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div className="space-y-2 flex-grow">
                                    <Label htmlFor="name">Display Name</Label>
                                    <Input id="name" value={name} onChange={e => setName(e.target.value)} />
                                    <Label htmlFor="avatar-upload">Avatar</Label>
                                    <div className="flex gap-2">
                                        <Input id="avatar-upload" type="file" className="flex-grow" />
                                        <Button variant="outline" size="icon"><Camera/></Button>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Educational Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><GraduationCap /> Educational Details</CardTitle>
                            <CardDescription>This helps Aura, your AI Tutor, provide grade-appropriate and relevant help.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="board">Board of Education</Label>
                                    <Select value={selectedBoard} onValueChange={(value: Board) => setSelectedBoard(value)}>
                                        <SelectTrigger id="board">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {boards.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="grade">Grade / Class</Label>
                                    <Select value={selectedGrade} onValueChange={(value: Grade) => setSelectedGrade(value)}>
                                        <SelectTrigger id="grade">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {grades.map(g => <SelectItem key={g} value={g}>{g}</SelectItem>)}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Subject Preferences */}
                     <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><BookOpen /> Subject Preferences</CardTitle>
                            <CardDescription>Let Aura know where you shine and where you need a little more help.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <Label className="font-semibold">My Subjects</Label>
                                <p className="text-xs text-muted-foreground mb-3">Click once for a favorite (green), twice for a challenge (yellow).</p>
                                <div className="flex flex-wrap gap-3">
                                    {subjects.map(subject => {
                                        const isFavorite = favoriteSubjects.has(subject.name);
                                        const isChallenging = challengingSubjects.has(subject.name);
                                        return (
                                            <button 
                                                key={subject.name} 
                                                onClick={() => {
                                                    if (!isFavorite && !isChallenging) handleSubjectToggle(subject.name, 'favorite');
                                                    else if (isFavorite) handleSubjectToggle(subject.name, 'challenging');
                                                    else if (isChallenging) handleSubjectToggle(subject.name, 'challenging');
                                                }}
                                            >
                                                <Badge
                                                    variant="outline"
                                                    className={cn("text-base py-2 px-4 cursor-pointer border-2 transition-all hover:border-primary",
                                                        isFavorite && "bg-green-500/20 border-green-500",
                                                        isChallenging && "bg-yellow-500/20 border-yellow-500"
                                                    )}
                                                >
                                                    {isFavorite && <CheckCircle className="mr-2 text-green-700"/>}
                                                    {isChallenging && <Edit3 className="mr-2 text-yellow-700"/>}
                                                    <subject.icon className="mr-2" />
                                                    {subject.name}
                                                </Badge>
                                            </button>
                                        )
                                    })}
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Personal Goal */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2"><Target /> My Personal Goal</CardTitle>
                            <CardDescription>What's the one big thing you want to achieve? Aura will help you break it down into smaller steps.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Textarea
                                placeholder="e.g., I want to feel more confident speaking in class..."
                                value={personalGoal}
                                onChange={e => setPersonalGoal(e.target.value)}
                                rows={4}
                            />
                        </CardContent>
                    </Card>
                </div>

                <div className="space-y-8">
                    <Card className="sticky top-20">
                        <CardHeader>
                            <CardTitle>Why This Info?</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4 text-sm text-muted-foreground">
                            <p>✅ Your <span className="font-semibold text-foreground">Grade & Board</span> help us give you the right study material.</p>
                            <p>✅ Your <span className="font-semibold text-foreground">Subjects</span> tell our AI tutor where to focus.</p>
                            <p>✅ Your <span className="font-semibold text-foreground">Goal</span> helps our AI coach give you better advice.</p>
                            <p>Your information is private and secure.</p>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full" onClick={handleSave}>
                                <Save className="mr-2" /> Save Profile
                            </Button>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
}
