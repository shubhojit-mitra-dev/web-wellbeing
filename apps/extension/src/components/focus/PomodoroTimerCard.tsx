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
    <Card className="relative overflow-hidden border border-zinc-200/80 dark:border-zinc-800/80 bg-white dark:bg-zinc-950 shadow-xl rounded-2xl">
      {/* Background Accent Glow */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-emerald-500/10 blur-3xl dark:bg-emerald-500/15" />

      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-zinc-100 dark:border-zinc-900 px-6 py-4">
        <CardTitle className="flex items-center gap-2.5 text-base font-bold text-zinc-900 dark:text-zinc-100">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/20">
            <Zap className="h-4 w-4 fill-current" />
          </div>
          <span>Focus Timer</span>
        </CardTitle>

        {/* Status Badge */}
        <div
          className={`flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold border ${
            focusState === 'active'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
              : focusState === 'paused'
                ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-900 dark:text-zinc-400 border-zinc-200 dark:border-zinc-800'
          }`}
        >
          <span
            className={`h-2 w-2 rounded-full ${
              focusState === 'active'
                ? 'bg-emerald-500 animate-pulse'
                : focusState === 'paused'
                  ? 'bg-amber-500'
                  : 'bg-zinc-400'
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

      <CardContent className="space-y-6 p-6 text-center">
        {/* Large Timer Display */}
        <div className="py-2">
          <div className="font-mono text-7xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 drop-shadow-sm">
            {formattedTime}
          </div>
        </div>

        {/* Segmented Preset Selector */}
        {focusState === 'inactive' && (
          <div className="mx-auto flex max-w-xs items-center justify-center gap-1 rounded-2xl bg-zinc-100 p-1.5 dark:bg-zinc-900/80 border border-zinc-200/80 dark:border-zinc-800/80">
            {presetDurations.map((duration) => (
              <button
                key={duration}
                onClick={() => setPlannedDurationMinutes(duration)}
                className={`flex-1 rounded-xl py-1.5 text-xs font-bold transition-all duration-200 ${
                  plannedDurationMinutes === duration
                    ? 'bg-white text-zinc-900 shadow-sm dark:bg-emerald-500 dark:text-zinc-950'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
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
              className="gap-2.5 rounded-full px-8 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold shadow-lg shadow-emerald-500/20 transition-all duration-200 hover:scale-105 active:scale-95 border-0"
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
                className="gap-2 rounded-full px-6 py-3 border-zinc-300 dark:border-zinc-700 font-semibold"
                onClick={() => setFocusState('paused')}
              >
                <Pause className="h-4 w-4" />
                <span>Pause</span>
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="gap-2 rounded-full px-6 py-3 font-semibold"
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
                className="gap-2 rounded-full px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-zinc-950 font-bold"
                onClick={() => setFocusState('active')}
              >
                <Play className="h-4 w-4 fill-current" />
                <span>Resume</span>
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="gap-2 rounded-full px-6 py-3 font-semibold"
                onClick={() => setFocusState('inactive')}
              >
                <Square className="h-4 w-4 fill-current" />
                <span>End</span>
              </Button>
            </>
          )}
        </div>

        {/* Subtext */}
        <p className="flex items-center justify-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400 pt-1">
          <Coffee className="h-3.5 w-3.5 text-amber-500" />
          <span>Distraction blocklist automatically enforced during active focus sessions.</span>
        </p>
      </CardContent>
    </Card>
  );
}
