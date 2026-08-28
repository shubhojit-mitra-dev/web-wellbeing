import { Play, Pause, Square, Zap, Coffee } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@web-wellbeing/ui';
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
    <Card className="relative overflow-hidden border-emerald-500/20 bg-gradient-to-b from-white to-zinc-50/50 dark:from-zinc-950 dark:to-zinc-900/50 shadow-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
          <Zap className="h-5 w-5 text-emerald-500" />
          <span>Focus Session</span>
        </CardTitle>
        <Badge variant={focusState === 'active' ? 'default' : 'secondary'}>
          {pomodoroPhase === 'work' ? 'Work Session' : 'Break Phase'}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6 pt-4 text-center">
        {/* Big MM:SS Display */}
        <div className="font-mono text-6xl font-extrabold tracking-wider text-zinc-900 dark:text-zinc-50 drop-shadow-sm">
          {formattedTime}
        </div>

        {/* Preset Chips */}
        {focusState === 'inactive' && (
          <div className="flex items-center justify-center gap-2">
            {presetDurations.map((duration) => (
              <button
                key={duration}
                onClick={() => setPlannedDurationMinutes(duration)}
                className={`rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
                  plannedDurationMinutes === duration
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-900/30 dark:bg-emerald-500 dark:text-zinc-950'
                    : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700'
                }`}
              >
                {duration}m
              </button>
            ))}
          </div>
        )}

        {/* Control Action Buttons */}
        <div className="flex items-center justify-center gap-3 pt-2">
          {focusState === 'inactive' && (
            <Button
              variant="default"
              size="lg"
              className="gap-2 px-8 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-lg shadow-emerald-950/30"
              onClick={() => setFocusState('active')}
            >
              <Play className="h-5 w-5 fill-current" />
              <span>Start Focus</span>
            </Button>
          )}

          {focusState === 'active' && (
            <>
              <Button
                variant="outline"
                size="lg"
                className="gap-2 px-6 border-zinc-300 dark:border-zinc-700"
                onClick={() => setFocusState('paused')}
              >
                <Pause className="h-5 w-5" />
                <span>Pause</span>
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="gap-2 px-6"
                onClick={() => setFocusState('inactive')}
              >
                <Square className="h-5 w-5 fill-current" />
                <span>End</span>
              </Button>
            </>
          )}

          {focusState === 'paused' && (
            <>
              <Button
                variant="default"
                size="lg"
                className="gap-2 px-6 bg-emerald-600 hover:bg-emerald-500 text-white"
                onClick={() => setFocusState('active')}
              >
                <Play className="h-5 w-5 fill-current" />
                <span>Resume</span>
              </Button>

              <Button
                variant="destructive"
                size="lg"
                className="gap-2 px-6"
                onClick={() => setFocusState('inactive')}
              >
                <Square className="h-5 w-5 fill-current" />
                <span>End</span>
              </Button>
            </>
          )}
        </div>

        {/* Footer Subtext */}
        <p className="text-xs text-zinc-500 dark:text-zinc-400 flex items-center justify-center gap-1.5">
          <Coffee className="h-3.5 w-3.5 text-amber-500" />
          <span>Distracting sites automatically blocked while active.</span>
        </p>
      </CardContent>
    </Card>
  );
}
