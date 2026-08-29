import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { BarChart3 } from 'lucide-react';

export default function AnalyticsView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-ink dark:text-on-dark">
          Analytics & Usage Insights
        </h1>
        <p className="text-sm text-muted dark:text-on-dark-soft mt-1.5">
          Explore historical browsing trends, productivity distributions, and category breakdowns.
        </p>
      </div>

      <Card className="bg-surface-dark text-on-dark border-hairline-dark">
        <CardHeader className="border-b border-hairline-dark py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base text-on-dark font-serif flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-primary" />
            <span>Historical Usage Trends</span>
          </CardTitle>
          <span className="text-xs font-mono text-on-dark-soft">analytics_timeseries.json</span>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-t border-hairline-dark mt-4 text-center px-4 font-mono">
          <div className="rounded-md bg-surface-dark-soft border border-hairline-dark p-6 text-xs text-on-dark-soft max-w-lg space-y-2">
            <p className="text-accent-teal font-semibold">
              ✓ Interactive Analytics & Usage Visualizations
            </p>
            <p className="text-on-dark-soft">
              Historical screen-time graphs, domain breakdowns, and category productivity heatmaps.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
