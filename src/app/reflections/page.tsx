import { GamificationCentral } from '@/components/reflections/gamification-central';
import { WellnessDashboard } from '@/components/reflections/wellness-dashboard';
import { KarmaCalendar } from '@/components/reflections/karma-calendar';
import { KarmaScoreChart } from '@/components/reflections/karma-score-chart';
import { WeeklyRanking } from '@/components/reflections/weekly-ranking';
import { HabitTracker } from '@/components/reflections/habit-tracker';
import { Separator } from '@/components/ui/separator';

export default function ReflectionsPage() {
    return (
        <div className="min-h-screen">
            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                <header className="mb-8">
                    <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
                        Your Inner Growth
                    </h1>
                    <p className="text-muted-foreground">Track your progress, celebrate wins, and reflect on your journey.</p>
                </header>

                <div className="space-y-8">
                    <GamificationCentral />
                    <WellnessDashboard />
                    <KarmaCalendar />
                    <KarmaScoreChart />
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                           <WeeklyRanking />
                        </div>
                        <div>
                           <HabitTracker />
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
