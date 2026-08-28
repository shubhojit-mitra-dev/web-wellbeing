import { useState, type KeyboardEvent } from 'react';
import { Shield, Plus, X, Globe } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@web-wellbeing/ui';
import { useFocusStore } from '../../stores/use-focus-store';

export function BlocklistManagerCard() {
  const { blockedDomains, addBlockedDomain, removeBlockedDomain } = useFocusStore();
  const [newDomain, setNewDomain] = useState('');

  const handleAdd = () => {
    if (newDomain.trim()) {
      addBlockedDomain(newDomain);
      setNewDomain('');
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <Card className="relative overflow-hidden border-zinc-200/80 dark:border-zinc-800/80 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-xl">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="flex items-center gap-2 text-base font-bold text-zinc-900 dark:text-zinc-100">
          <Shield className="h-5 w-5 text-purple-500" />
          <span>Distraction Blocklist</span>
        </CardTitle>
        <Badge
          variant="outline"
          className="text-purple-600 dark:text-purple-400 border-purple-500/30"
        >
          {blockedDomains.length} Domains
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 pt-2">
        {/* Input Form */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add domain (e.g. reddit.com)..."
              className="w-full rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/60 pl-9 pr-3 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
            />
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={handleAdd}
            className="gap-1 bg-purple-600 hover:bg-purple-500 text-white rounded-xl"
          >
            <Plus className="h-4 w-4" />
            <span>Add</span>
          </Button>
        </div>

        {/* Domain Tags Grid */}
        <div className="flex flex-wrap gap-2 pt-2 max-h-48 overflow-y-auto pr-1">
          {blockedDomains.map((domain) => (
            <div
              key={domain}
              className="group flex items-center gap-1.5 rounded-xl border border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/80 dark:bg-zinc-900/80 px-3 py-1.5 text-xs font-medium text-zinc-800 dark:text-zinc-200 transition-colors hover:border-purple-500/40"
            >
              <span>{domain}</span>
              <button
                onClick={() => removeBlockedDomain(domain)}
                className="rounded-full p-0.5 text-zinc-400 hover:bg-red-500/20 hover:text-red-500 transition-colors"
                aria-label={`Remove ${domain}`}
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
