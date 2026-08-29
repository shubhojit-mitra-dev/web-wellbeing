import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';

export default function GoalsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Productivity Goals & Targets
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Set daily category screen time limits and track your achievement streaks.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Daily Targets & Habit Streaks</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4 text-center px-4">
          <p className="text-sm font-medium text-zinc-600 dark:text-zinc-300">
            Goal Configuration & Habit Streak Tracking Module
          </p>
          <p className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 max-w-md">
            Define daily browsing limits by category, monitor your progress in real-time, and build
            consistent focus streaks.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
