import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { Clock, Zap, Target, ShieldCheck } from 'lucide-react';

export default function OverviewView() {
  return (
    <div className="space-y-6">
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Good day, Developer 👋
        </h1>
        <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
          Here is your web wellbeing & focus summary for today.
        </p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Total Screen Time
            </CardTitle>
            <Clock className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">3h 42m</div>
            <p className="text-xs font-medium text-emerald-600 dark:text-emerald-400 mt-1.5 flex items-center gap-1">
              <span>-12% vs yesterday</span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Focus Score
            </CardTitle>
            <Zap className="h-4 w-4 text-amber-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">84 / 100</div>
            <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400 mt-1.5">
              High productivity streak
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Daily Goal Progress
            </CardTitle>
            <Target className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">75%</div>
            <p className="text-xs font-medium text-blue-600 dark:text-blue-400 mt-1.5">
              45 mins remaining
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
              Distractions Blocked
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-extrabold text-zinc-900 dark:text-zinc-50">14 Sites</div>
            <p className="text-xs font-medium text-purple-600 dark:text-purple-400 mt-1.5">
              Saved ~28 mins
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Panels */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Today&apos;s Activity Breakdown</CardTitle>
          </CardHeader>
          <CardContent className="h-64 flex items-center justify-center border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4">
            <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
              Chart component will be mounted here in Phase 17
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Development
              </span>
              <span className="text-sm font-bold text-emerald-500 dark:text-emerald-400">
                1h 50m
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Documentation
              </span>
              <span className="text-sm font-bold text-teal-500 dark:text-teal-400">45m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Communication
              </span>
              <span className="text-sm font-bold text-blue-500 dark:text-blue-400">35m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Social Media
              </span>
              <span className="text-sm font-bold text-amber-500 dark:text-amber-400">32m</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
