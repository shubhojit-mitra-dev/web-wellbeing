import { Card, CardHeader, CardTitle, CardContent } from '@web-wellbeing/ui';
import { Settings } from 'lucide-react';

export default function SettingsView() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-[#141413] dark:text-[#faf9f5]">
          Settings & Preferences
        </h1>
        <p className="text-sm text-[#6c6a64] dark:text-[#a09d96] mt-1.5">
          Manage extension tracking rules, Supabase sync options, and BYOK AI keys.
        </p>
      </div>

      <Card className="bg-[#efe9de]/50 dark:bg-[#181715] border-[#e6dfd8] dark:border-[#2d2b27]">
        <CardHeader className="border-b border-[#e6dfd8]/60 dark:border-[#2d2b27]/60 py-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-serif flex items-center gap-2">
            <Settings className="h-4 w-4 text-[#cc785c]" />
            <span>Configuration & Privacy Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="h-72 flex flex-col items-center justify-center border-t border-[#e6dfd8]/60 dark:border-[#2d2b27]/60 mt-4 text-center px-4">
          <div className="rounded-md bg-[#faf9f5] dark:bg-[#252320] border border-[#e6dfd8] dark:border-[#2d2b27] p-6 text-xs text-[#6c6a64] dark:text-[#a09d96] max-w-lg space-y-2">
            <p className="text-[#cc785c] font-semibold text-sm font-serif">
              Extension Settings & Custom API Key Integration
            </p>
            <p className="text-[#3d3d3a] dark:text-[#a09d96]">
              Configure local tracking exclusion rules, cloud sync preferences, and custom
              OpenAI/Anthropic API credentials.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
