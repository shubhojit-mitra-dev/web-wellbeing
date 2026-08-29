import { Zap, CheckCircle2, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { useFocusStore } from '../../stores/use-focus-store';

export function FocusStatsCard() {
  const { completedCycles, interruptionCount } = useFocusStore();

  return (
    <Card className="relative overflow-hidden border border-[#e6dfd8] dark:border-[#2d2b27] bg-[#efe9de]/50 dark:bg-[#181715] rounded-xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#e6dfd8]/60 dark:border-[#2d2b27]/60 px-6 py-4">
        <CardTitle className="flex items-center gap-2.5 text-lg font-serif font-normal tracking-tight text-[#141413] dark:text-[#faf9f5]">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#cc785c]/10 text-[#cc785c]">
            <Zap className="h-4 w-4 fill-current" />
          </div>
          <span>Focus Overview</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="grid grid-cols-2 gap-4 p-6">
        <div className="flex flex-col rounded-md border border-[#e6dfd8] dark:border-[#2d2b27] bg-[#faf9f5] dark:bg-[#252320] p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#6c6a64] dark:text-[#a09d96]">
            <CheckCircle2 className="h-4 w-4 text-[#5db8a6]" />
            <span>Completed Sessions</span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#141413] dark:text-[#faf9f5]">
            {completedCycles}
          </div>
        </div>

        <div className="flex flex-col rounded-md border border-[#e6dfd8] dark:border-[#2d2b27] bg-[#faf9f5] dark:bg-[#252320] p-4 text-center">
          <div className="flex items-center justify-center gap-1.5 text-xs font-medium text-[#6c6a64] dark:text-[#a09d96]">
            <AlertTriangle className="h-4 w-4 text-[#e8a55a]" />
            <span>Interruption Attempts</span>
          </div>
          <div className="mt-2 font-mono text-3xl font-bold text-[#141413] dark:text-[#faf9f5]">
            {interruptionCount}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
