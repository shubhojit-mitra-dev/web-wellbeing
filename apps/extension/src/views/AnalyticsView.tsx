import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Analytics & Usage Insights
        </h1>
        <p className="text-sm text-[#6c6a64] dark:text-[#a09d96] mt-1.5">
          Explore historical browsing trends, productivity distributions, and category breakdowns.
        </p>
      </div>

      <Card className="bg-[#181715] text-[#faf9f5] border-[#2d2b27]">
        <CardHeader className="border-b border-[#2d2b27] py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base text-[#faf9f5] font-serif flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-[#cc785c]" />
            <span>Historical Usage Trends</span>
          </CardTitle>
          <span className="text-xs font-mono text-[#a09d96]">analytics_timeseries.json</span>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-t border-[#2d2b27] mt-4 text-center px-4 font-mono">
          <div className="rounded-md bg-[#1f1e1b] border border-[#2d2b27] p-6 text-xs text-[#a09d96] max-w-lg space-y-2">
            <p className="text-[#5db8a6] font-semibold">
              ✓ Interactive Analytics & Usage Visualizations
            </p>
            <p className="text-[#a09d96]">
              Historical screen-time graphs, domain breakdowns, and category productivity heatmaps.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
