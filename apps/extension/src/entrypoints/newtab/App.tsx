import type { FC } from 'react';

export const App: FC = () => {
  return (
    <div className="flex flex-col min-h-screen p-8 space-y-6 max-w-7xl mx-auto">
      <header className="flex items-center justify-between border-b pb-4">
        <div>
          <h1 className="text-2xl font-bold text-primary">Web Wellbeing Dashboard</h1>
          <p className="text-sm text-muted-foreground">Your homepage productivity companion</p>
        </div>
      </header>
      <main className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Today's Usage</h2>
          <p className="text-3xl font-extrabold text-primary">0h 0m</p>
        </div>
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-2">Focus Mode</h2>
          <p className="text-sm text-muted-foreground">Ready to start deep work session</p>
        </div>
        <div className="p-6 rounded-xl border bg-card text-card-foreground shadow-sm">
          <h2 className="text-lg font-semibold mb-2">AI Daily Companion</h2>
          <p className="text-sm text-muted-foreground">Set your intentions for today</p>
        </div>
      </main>
    </div>
  );
};
