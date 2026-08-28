import { Flame, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { useFocusStore } from '../../stores/use-focus-store';

export function FocusStatsCard() {
  const { interruptionCount, completedCycles } = useFocusStore();

  return (
    <Card className="relative overflow-hidden border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
          <Flame className="h-5 w-5 text-amber-500" />
          <span>Focus Overview</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 pt-2">
        <div className="rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
            <ShieldAlert className="h-4 w-4 text-rose-500" />
            <span>Interruption Attempts</span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {interruptionCount}
          </div>
        </div>

        <div className="rounded-xl border border-zinc-100 dark:border-zinc-800/60 bg-zinc-50/50 dark:bg-zinc-900/40 p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-zinc-500 dark:text-zinc-400 text-xs mb-1">
            <CheckCircle2 className="h-4 w-4 text-emerald-500" />
            <span>Completed Sessions</span>
          </div>
          <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">
            {completedCycles}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
