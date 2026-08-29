import { PomodoroTimerCard } from '../components/focus/PomodoroTimerCard';
import { BlocklistManagerCard } from '../components/focus/BlocklistManagerCard';
import { FocusStatsCard } from '../components/focus/FocusStatsCard';

export default function FocusView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Focus Mode & Pomodoro Timer
        </h1>
        <p className="text-sm text-[#6c6a64] dark:text-[#a09d96] mt-1.5">
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
