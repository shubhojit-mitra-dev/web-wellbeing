import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { Target } from 'lucide-react';

export default function GoalsView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-ink dark:text-on-dark">
          Productivity Goals & Targets
        </h1>
        <p className="text-sm text-muted dark:text-on-dark-soft mt-1.5">
          Set daily category screen time limits and track your achievement streaks.
        </p>
      </div>

      <Card className="bg-surface-card/50 dark:bg-surface-dark border-hairline dark:border-hairline-dark">
        <CardHeader className="border-b border-hairline/60 dark:border-hairline-dark/60 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-serif flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <span>Daily Targets & Habit Streaks</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-t border-hairline/60 dark:border-hairline-dark/60 mt-4 text-center px-4">
          <div className="rounded-md bg-canvas dark:bg-surface-dark-elevated border border-hairline dark:border-hairline-dark p-6 text-xs text-muted dark:text-on-dark-soft max-w-lg space-y-2">
            <p className="text-primary font-semibold text-sm font-serif">
              Goal Configuration & Habit Streak Tracking Module
            </p>
            <p className="text-body dark:text-on-dark-soft">
              Define daily browsing limits by category, monitor your progress in real-time, and
              build consistent focus streaks.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
