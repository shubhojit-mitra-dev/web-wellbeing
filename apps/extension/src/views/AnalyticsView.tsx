import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';

export default function AnalyticsView() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Analytics & Usage Insights
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1">
          Detailed breakdown of your browsing patterns, trends, and category distribution.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Historical Usage Trends</CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex items-center justify-center border-t border-zinc-200/60 dark:border-zinc-800/60 mt-4">
          <p className="text-sm text-zinc-400 dark:text-zinc-500">
            Recharts analytics view will be mounted here
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
