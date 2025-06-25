
"use client";

import { ShoppingCart, Wallet, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useWallet } from '@/hooks/use-wallet';
import { useToast } from '@/hooks/use-toast';

const storeItems = [
  {
    id: 'item1',
    name: 'Smart Reusable Notebook',
    description: 'Digitize your notes. Comes with a special pen and cloth.',
    price: 800,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'smart notebook'
  },
  {
    id: 'item2',
    name: 'Ergonomic Study Pen Pack',
    description: 'A pack of 5 pens designed for comfortable long writing sessions.',
    price: 250,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'study pens'
  },
  {
    id: 'item3',
    name: 'Adjustable Focus Lamp',
    description: 'LED lamp with multiple color temperatures to reduce eye strain.',
    price: 1500,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'desk lamp'
  },
  {
    id: 'item4',
    name: 'Noise-Cancelling Headphones',
    description: 'Block out distractions and focus on what matters.',
    price: 3500,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'headphones'
  },
  {
    id: 'item5',
    name: '"The Thinker" Board Game',
    description: 'A fun strategy board game to play with family and friends.',
    price: 1200,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'board game'
  },
  {
    id: 'item6',
    name: '1-Month "Science Today" Mag',
    description: 'Get the latest issue of the popular science magazine for students.',
    price: 300,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'science magazine'
  },
   {
    id: 'item7',
    name: 'Productivity Desk Pad',
    description: 'A large desk pad with a weekly planner and habit tracker layout.',
    price: 450,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'desk pad'
  },
  {
    id: 'item8',
    name: 'Portable Whiteboard Set',
    description: 'A small, portable whiteboard perfect for quick notes and diagrams.',
    price: 600,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'whiteboard'
  },
  {
    id: 'item9',
    name: 'Customizable Laptop Skin',
    description: 'Personalize your laptop with a cool, protective skin.',
    price: 500,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'laptop skin'
  },
  {
    id: 'item10',
    name: 'Fidget Spinner for Focus',
    description: 'A quiet, high-quality fidget spinner to help with focus.',
    price: 150,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'fidget spinner'
  },
  {
    id: 'item11',
    name: 'Insulated Water Bottle',
    description: 'Keep your drinks cold or hot for hours. Stay hydrated!',
    price: 900,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'water bottle'
  },
  {
    id: 'item12',
    name: '"Great Minds" Poster Pack',
    description: 'A set of 4 motivational posters featuring famous scientists and thinkers.',
    price: 400,
    image: 'https://placehold.co/200x150.png',
    dataAiHint: 'motivational posters'
  },
];

export default function StorePage() {
    const { balance } = useWallet();
    const { toast } = useToast();

    const handleRedeem = (itemName: string, price: number) => {
        // In a real app, you would deduct from the wallet here.
        // For now, we just show a success toast.
        toast({
            title: "Redemption Successful!",
            description: `You've redeemed "${itemName}" for ₹${price}. It will be delivered soon.`,
        });
    };

    return (
        <div className="container mx-auto p-4 sm:p-6 lg:p-8">
            <header className="mb-8 space-y-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold text-foreground flex items-center gap-3">
                            <ShoppingCart /> Karma Store
                        </h1>
                        <p className="text-muted-foreground">Use your earnings to redeem cool rewards!</p>
                    </div>
                    <Card className="p-3 bg-secondary/50">
                        <div className="flex items-center gap-3">
                             <Wallet className="w-6 h-6 text-primary"/>
                             <div>
                                <p className="text-sm text-muted-foreground">Your Balance</p>
                                <p className="text-xl font-bold">₹{balance.toFixed(0)}</p>
                             </div>
                        </div>
                    </Card>
                </div>
            </header>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                {storeItems.map((item) => (
                    <Card key={item.id} className="flex flex-col group overflow-hidden">
                        <CardHeader className="p-0">
                           <div className="overflow-hidden">
                             <Image
                                src={item.image}
                                alt={item.name}
                                width={200}
                                height={150}
                                className="rounded-t-lg object-cover aspect-[4/3] w-full transition-transform duration-300 group-hover:scale-110"
                                data-ai-hint={item.dataAiHint}
                            />
                           </div>
                        </CardHeader>
                        <CardContent className="p-3 flex-grow">
                            <CardTitle className="text-base leading-tight truncate">{item.name}</CardTitle>
                            <CardDescription className="mt-1 text-xs line-clamp-2">{item.description}</CardDescription>
                        </CardContent>
                        <CardFooter className="flex justify-between items-center p-3 pt-0">
                            <p className="text-lg font-bold text-primary">₹{item.price}</p>
                            <Button
                                size="sm"
                                onClick={() => handleRedeem(item.name, item.price)}
                                disabled={balance < item.price}
                            >
                                Redeem
                            </Button>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
