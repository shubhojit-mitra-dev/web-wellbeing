import { Play, Pause, Square, Zap, Coffee } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button } from '@web-wellbeing/ui';
import { useFocusStore } from '../../stores/use-focus-store';

export function PomodoroTimerCard() {
  const {
    focusState,
    pomodoroPhase,
    remainingSeconds,
    plannedDurationMinutes,
    setFocusState,
    setPlannedDurationMinutes,
  } = useFocusStore();

  const minutes = Math.floor(remainingSeconds / 60);
  const seconds = remainingSeconds % 60;
  const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  const presetDurations = [15, 25, 45, 60];

  return (
    <Card className="relative overflow-hidden border border-[#e6dfd8] dark:border-[#2d2b27] bg-[#efe9de]/50 dark:bg-[#181715] rounded-xl shadow-sm">
      {/* Top Header Row */}
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-[#e6dfd8]/60 dark:border-[#2d2b27]/60 px-6 py-4">
        <CardTitle className="flex items-center gap-2.5 text-lg font-serif font-normal tracking-tight text-[#141413] dark:text-[#faf9f5]">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-[#cc785c]/10 text-[#cc785c]">
            <Zap className="h-4 w-4 fill-current" />
          </div>
          <span>Focus Timer</span>
        </CardTitle>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium border ${
            focusState === 'active'
              ? 'bg-[#cc785c]/10 text-[#cc785c] border-[#cc785c]/30'
              : focusState === 'paused'
                ? 'bg-[#e8a55a]/10 text-[#e8a55a] border-[#e8a55a]/30'
                : 'bg-[#faf9f5] text-[#6c6a64] dark:bg-[#252320] dark:text-[#a09d96] border-[#e6dfd8] dark:border-[#2d2b27]'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              focusState === 'active'
                ? 'bg-[#cc785c] animate-pulse'
                : focusState === 'paused'
                  ? 'bg-[#e8a55a]'
                  : 'bg-[#8e8b82]'
            }`}
          />
          <span>
            {focusState === 'inactive'
              ? 'Ready'
              : pomodoroPhase === 'work'
                ? 'Work Session'
                : 'Break Phase'}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-8 text-center">
        {/* Large Display Timer in JetBrains Mono / Serif Mix */}
        <div className="py-3">
          <div className="font-mono text-7xl font-semibold tracking-tight text-[#141413] dark:text-[#faf9f5]">
            {formattedTime}
          </div>
        </div>

        {/* Segmented Preset Duration Selector */}
        {focusState === 'inactive' && (
          <div className="mx-auto flex max-w-xs items-center justify-center gap-1 rounded-md bg-[#faf9f5] p-1.5 dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#2d2b27]">
            {presetDurations.map((duration) => (
              <button
                key={duration}
                onClick={() => setPlannedDurationMinutes(duration)}
                className={`flex-1 rounded-sm py-1.5 text-xs font-medium transition-all duration-200 ${
                  plannedDurationMinutes === duration
                    ? 'bg-[#cc785c] text-white shadow-sm font-semibold'
                    : 'text-[#6c6a64] hover:text-[#141413] dark:text-[#a09d96] dark:hover:text-[#faf9f5]'
                }`}
              >
                {duration}m
              </button>
            ))}
          </div>
        )}

        {/* Action Controls */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {focusState === 'inactive' && (
            <Button
              variant="default"
              size="lg"
              className="gap-2.5 rounded-md px-8 py-3 bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 border-0"
              onClick={() => setFocusState('active')}
            >
              <Play className="h-4 w-4 fill-current" />
              <span>Start Focus</span>
            </Button>
          )}

          {focusState === 'active' && (
            <>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 rounded-md px-6 py-3 border-[#e6dfd8] dark:border-[#2d2b27] font-medium"
                onClick={() => setFocusState('paused')}
              >
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="gap-2 rounded-md px-6 py-3 font-medium bg-[#c64545] hover:bg-[#b03a3a]"
                onClick={() => setFocusState('inactive')}
              >
                <Square className="h-4 w-4 fill-current" />
                <span>End</span>
              </Button>
            </>
          )}

          {focusState === 'paused' && (
            <>
              <Button
                variant="default"
                size="lg"
                className="gap-2 rounded-md px-6 py-3 bg-[#cc785c] hover:bg-[#a9583e] text-white font-medium"
                onClick={() => setFocusState('active')}
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Resume</span>
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="gap-2 rounded-md px-6 py-3 font-medium bg-[#c64545] hover:bg-[#b03a3a]"
                onClick={() => setFocusState('inactive')}
              >
                <Square className="h-4 w-4 fill-current" />
                <span>End</span>
              </Button>
            </>
          )}
        </div>

        {/* Footer Subtext */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-[#6c6a64] dark:text-[#a09d96] pt-2">
          <Coffee className="h-3.5 w-3.5 text-[#e8a55a]" />
          <span>Distraction blocklist automatically enforced during active focus sessions.</span>
        </p>
      </CardContent>
    </Card>
  );
}
