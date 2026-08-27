import type { FC } from 'react';

export const App: FC = () => {
  return (
    <div className="flex flex-col h-full p-4 space-y-4">
      <header className="flex items-center justify-between border-b pb-2">
        <h1 className="text-lg font-bold text-primary">Web Wellbeing</h1>
        <span className="text-xs text-muted-foreground">v1.0.0</span>
      </header>
      <main className="flex-1 flex flex-col items-center justify-center text-center">
        <p className="text-sm font-medium">Quick Glance Popup</p>
        <p className="text-xs text-muted-foreground mt-1">
          Tracking engine & statistics status ready.
        </p>
      </main>
      <footer className="border-t pt-2 text-center text-xs text-muted-foreground">
        Press Ctrl+Shift+F to toggle Focus Mode
      </footer>
    </div>
  );
};
