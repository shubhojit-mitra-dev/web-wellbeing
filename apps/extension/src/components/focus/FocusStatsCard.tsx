import { Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { useFocusStore } from '../../stores/use-focus-store';

export function FocusStatsCard() {
  const { completedCycles, interruptionCount } = useFocusStore();

  return (
    <Card className="relative overflow-hidden border border-hairline dark:border-hairline-dark bg-surface-card/50 dark:bg-surface-dark rounded-xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-hairline/60 dark:border-hairline-dark/60 px-6 py-4">
        <CardTitle className="flex items-center gap-2.5 text-lg font-serif font-normal tracking-tight text-ink dark:text-on-dark">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Zap className="h-4 w-4 fill-current" />
          </div>
          <span>Focus Overview</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 p-6">
        <div className="flex flex-col rounded-md border border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark-elevated p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted dark:text-on-dark-soft">
            <CheckCircle2 className="h-4 w-4 text-accent-teal" />
            <span>Completed Sessions</span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-ink dark:text-on-dark">
            {completedCycles}
          </div>
        </div>

        <div className="flex flex-col rounded-md border border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark-elevated p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-muted dark:text-on-dark-soft">
            <AlertTriangle className="h-4 w-4 text-accent-amber" />
            <span>Interruption Attempts</span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-ink dark:text-on-dark">
            {interruptionCount}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
