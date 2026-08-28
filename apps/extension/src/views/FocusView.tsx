import { PomodoroTimerCard } from '../components/focus/PomodoroTimerCard';
import { BlocklistManagerCard } from '../components/focus/BlocklistManagerCard';
import { FocusStatsCard } from '../components/focus/FocusStatsCard';

export default function FocusView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Focus Mode & Pomodoro Timer
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Configure focus sessions, website blocklists, and break schedules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PomodoroTimerCard />
          <FocusStatsCard />
        </div>
        <div className="lg:col-span-1">
          <BlocklistManagerCard />
        </div>
      </div>
    </div>
  );
}
