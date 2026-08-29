import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { Settings } from 'lucide-react';

export default function SettingsView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-ink dark:text-on-dark">
          Settings & Preferences
        </h1>
        <p className="text-sm text-muted dark:text-on-dark-soft mt-1.5">
          Manage extension tracking rules, Supabase sync options, and BYOK AI keys.
        </p>
      </div>

      <Card className="bg-surface-card/50 dark:bg-surface-dark border-hairline dark:border-hairline-dark">
        <CardHeader className="border-b border-hairline/60 dark:border-hairline-dark/60 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-serif flex items-center gap-2">
            <Settings className="h-4 w-4 text-primary" />
            <span>Configuration & Privacy Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-t border-hairline/60 dark:border-hairline-dark/60 mt-4 text-center px-4">
          <div className="rounded-md bg-canvas dark:bg-surface-dark-elevated border border-hairline dark:border-hairline-dark p-6 text-xs text-muted dark:text-on-dark-soft max-w-lg space-y-2">
            <p className="text-primary font-semibold text-sm font-serif">
              Extension Settings & Custom API Key Integration
            </p>
            <p className="text-body dark:text-on-dark-soft">
              Configure local tracking exclusion rules, cloud sync preferences, and custom
              OpenAI/Anthropic API credentials.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
