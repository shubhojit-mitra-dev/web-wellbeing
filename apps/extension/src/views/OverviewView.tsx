import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { Clock, Zap, Target, ShieldCheck, Terminal } from 'lucide-react';

export default function OverviewView() {
  return (
    <div className="space-y-8">
      {/* Editorial Header Section */}
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Good day, Developer 👋
        </h1>
        <p className="text-sm text-[#6c6a64] dark:text-[#a09d96] mt-1.5 font-sans">
          Here is your web wellbeing & focus summary for today.
        </p>
      </div>

      {/* Top Stat Cards Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-[#efe9de]/70 dark:bg-[#181715]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-[#6c6a64] dark:text-[#a09d96]">
              Total Screen Time
            </CardTitle>
            <Clock className="h-4 w-4 text-[#5db8a6]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-[#141413] dark:text-[#faf9f5]">
              3h 42m
            </div>
            <p className="text-xs font-medium text-[#5db8a6] mt-1.5 flex items-center gap-1">
              <span>-12% vs yesterday</span>
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#efe9de]/70 dark:bg-[#181715]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-[#6c6a64] dark:text-[#a09d96]">
              Focus Score
            </CardTitle>
            <Zap className="h-4 w-4 text-[#cc785c]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-[#141413] dark:text-[#faf9f5]">
              84 / 100
            </div>
            <p className="text-xs font-medium text-[#6c6a64] dark:text-[#a09d96] mt-1.5">
              High productivity streak
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#efe9de]/70 dark:bg-[#181715]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-[#6c6a64] dark:text-[#a09d96]">
              Daily Goal Progress
            </CardTitle>
            <Target className="h-4 w-4 text-[#e8a55a]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-[#141413] dark:text-[#faf9f5]">
              75%
            </div>
            <p className="text-xs font-medium text-[#e8a55a] mt-1.5">45 mins remaining</p>
          </CardContent>
        </Card>

        <Card className="bg-[#efe9de]/70 dark:bg-[#181715]">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium uppercase tracking-wider text-[#6c6a64] dark:text-[#a09d96]">
              Distractions Blocked
            </CardTitle>
            <ShieldCheck className="h-4 w-4 text-[#cc785c]" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-mono font-bold text-[#141413] dark:text-[#faf9f5]">
              14 Sites
            </div>
            <p className="text-xs font-medium text-[#cc785c] mt-1.5">Saved ~28 mins</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Panels */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* Dark Code / Product Mockup Surface Card for Activity Breakdown */}
        <Card className="md:col-span-2 bg-[#181715] text-[#faf9f5] border-[#2d2b27]">
          <CardHeader className="border-b border-[#2d2b27] py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base text-[#faf9f5] font-serif flex items-center gap-2">
              <Terminal className="h-4 w-4 text-[#cc785c]" />
              <span>Today&apos;s Activity Breakdown</span>
            </CardTitle>
            <span className="text-xs font-mono text-[#a09d96]">analytics_stream.json</span>
          </CardHeader>
          <CardContent className="h-64 flex flex-col items-center justify-center border-t border-[#2d2b27] mt-4 text-center px-4 font-mono">
            <div className="rounded-md bg-[#1f1e1b] border border-[#2d2b27] p-4 text-xs text-[#a09d96] max-w-md">
              <span className="text-[#5db8a6]">✓ TabActivityEngine</span> listening on 12 tabs...
              <br />
              <span className="text-[#cc785c]">⚡ Hourly chart visualization</span> will mount here
            </div>
          </CardContent>
        </Card>

        {/* Top Categories Panel */}
        <Card className="bg-[#efe9de]/70 dark:bg-[#181715]">
          <CardHeader className="border-b border-[#e6dfd8] dark:border-[#2d2b27] py-4">
            <CardTitle className="text-base font-serif">Top Categories</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">
                Development
              </span>
              <span className="text-sm font-mono font-semibold text-[#5db8a6]">1h 50m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">
                Documentation
              </span>
              <span className="text-sm font-mono font-semibold text-[#cc785c]">45m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">
                Communication
              </span>
              <span className="text-sm font-mono font-semibold text-[#e8a55a]">35m</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-[#141413] dark:text-[#faf9f5]">
                Social Media
              </span>
              <span className="text-sm font-mono font-semibold text-[#8e8b82]">32m</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
