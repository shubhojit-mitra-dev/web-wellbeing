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
          <CardTitle>Daily Targets & Streak Tracker</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Goal setting and habit streak tracking components will be mounted here in Phase 14
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
