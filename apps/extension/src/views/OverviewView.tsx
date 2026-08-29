import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { Clock, Zap, Target, ShieldCheck, Terminal } from 'lucide-react';

export default function OverviewView() {
  return (
    <div className="space-y-8">
      {/* Editorial Header Section */}
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-ink dark:text-on-dark">
          Good day, Developer 👋
        </h1>
        <p className="text-sm text-muted dark:text-on-dark-soft mt-1.5 font-sans">
          Here is your web wellbeing & focus summary for today.
        </p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-surface-card/70 dark:bg-surface-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted dark:text-on-dark-soft">
              Total Screen Time
            </CardTitle>
            <Clock className="h-4 w-4 text-accent-teal" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-ink dark:text-on-dark">3h 42m</div>
            <p className="text-xs font-medium text-accent-teal mt-1.5 flex items-center gap-1">
              <span>-12% vs yesterday</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-surface-card/70 dark:bg-surface-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted dark:text-on-dark-soft">
              Focus Score
            </CardTitle>
            <Zap className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-ink dark:text-on-dark">84 / 100</div>
            <p className="text-xs font-medium text-muted dark:text-on-dark-soft mt-1.5">
              High productivity streak
            </p>
          </CardContent>
        </Card>

        <Card className="bg-surface-card/70 dark:bg-surface-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted dark:text-on-dark-soft">
              Daily Goal Progress
            </CardTitle>
            <Target className="h-4 w-4 text-accent-amber" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-ink dark:text-on-dark">75%</div>
            <p className="text-xs font-medium text-accent-amber mt-1.5">45 mins remaining</p>
          </CardContent>
        </Card>

        <Card className="bg-surface-card/70 dark:bg-surface-dark">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-muted dark:text-on-dark-soft">
              Distractions Blocked
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-ink dark:text-on-dark">14 Sites</div>
            <p className="text-xs font-medium text-primary mt-1.5">Saved ~28 mins</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Panels */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Dark Code / Product Mockup Surface Card for Activity Breakdown */}
        <Card className="md:col-span-2 bg-surface-dark text-on-dark border-hairline-dark">
          <CardHeader className="border-b border-hairline-dark py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base text-on-dark font-serif flex items-center gap-2">
              <Terminal className="h-4 w-4 text-primary" />
              <span>Today&apos;s Activity Breakdown</span>
            </CardTitle>
            <span className="text-xs font-mono text-on-dark-soft">analytics_stream.json</span>
          </CardHeader>
          <CardContent className="h-64 flex flex-col items-center justify-center border-t border-hairline-dark mt-4 text-center px-4 font-mono">
            <div className="rounded-md bg-surface-dark-soft border border-hairline-dark p-4 text-xs text-on-dark-soft max-w-md">
              <span className="text-accent-teal">✓ TabActivityEngine</span> listening on 12 tabs...
              <br />
              <span className="text-primary">⚡ Hourly chart visualization</span> will mount here
            </div>
          </CardContent>
        </Card>

        {/* Top Categories Panel */}
        <Card className="bg-surface-card/70 dark:bg-surface-dark">
          <CardHeader className="border-b border-hairline dark:border-hairline-dark py-4">
            <CardTitle className="text-base font-serif">Top Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink dark:text-on-dark">Development</span>
              <span className="text-sm font-mono font-semibold text-accent-teal">1h 50m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink dark:text-on-dark">Documentation</span>
              <span className="text-sm font-mono font-semibold text-primary">45m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink dark:text-on-dark">Communication</span>
              <span className="text-sm font-mono font-semibold text-accent-amber">35m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-ink dark:text-on-dark">Social Media</span>
              <span className="text-sm font-mono font-semibold text-muted-soft">32m</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
