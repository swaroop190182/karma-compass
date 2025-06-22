import { KarmaTracker } from '@/components/karma-tracker';

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-background text-foreground">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold font-headline text-primary-foreground bg-primary rounded-lg py-2 px-4 inline-block shadow-md">
            Karma Compass
          </h1>
          <p className="text-muted-foreground mt-4 text-lg max-w-2xl mx-auto">
            Navigate your day with positive actions. Track your karma, reflect on your choices, and find motivation to be your best self.
          </p>
        </header>
        <KarmaTracker />
      </div>
    </main>
  );
}
