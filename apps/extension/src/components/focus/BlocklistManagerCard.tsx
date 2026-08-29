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
    <Card className="relative overflow-hidden border border-hairline dark:border-hairline-dark bg-surface-card/50 dark:bg-surface-dark rounded-xl shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-hairline/60 dark:border-hairline-dark/60 px-6 py-4">
        <CardTitle className="flex items-center gap-2.5 text-lg font-serif font-normal tracking-tight text-ink dark:text-on-dark">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10 text-primary">
            <Shield className="h-4 w-4 fill-current" />
          </div>
          <span>Distraction Blocklist</span>
        </CardTitle>
        <Badge
          variant="outline"
          className="text-primary dark:text-primary border-primary/30 font-medium"
        >
          {blockedDomains.length} Domains
        </Badge>
      </CardHeader>

      <CardContent className="space-y-4 p-6">
        {/* Input Form */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-soft" />
            <input
              type="text"
              value={newDomain}
              onChange={(e) => setNewDomain(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Add domain (e.g. reddit.com)..."
              className="w-full rounded-md border border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark-elevated pl-9 pr-3 py-2 text-sm text-ink dark:text-on-dark placeholder:text-muted-soft focus:outline-none focus:ring-2 focus:ring-primary/40"
            />
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={handleAdd}
            className="gap-1 bg-primary hover:bg-primary-active text-white rounded-md font-medium"
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
              className="group flex items-center gap-1.5 rounded-md border border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark-elevated px-3 py-1.5 text-xs font-medium text-body dark:text-on-dark transition-colors hover:border-primary/40"
            >
              <span>{domain}</span>
              <button
                onClick={() => removeBlockedDomain(domain)}
                className="rounded-full p-0.5 text-muted-soft hover:bg-red-500/10 hover:text-red-500 transition-colors"
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
