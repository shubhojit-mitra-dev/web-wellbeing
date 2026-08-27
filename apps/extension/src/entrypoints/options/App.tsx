import type { FC } from 'react';

export const App: FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <h1 className="text-2xl font-bold text-primary">Web Wellbeing Settings</h1>
      <p className="text-sm text-muted-foreground">
        Configure tracking preferences, privacy options, and AI integrations.
      </p>
    </div>
  );
};
