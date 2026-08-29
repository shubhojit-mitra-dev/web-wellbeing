import { Card, CardHeader, CardTitle, CardContent, Button, Badge } from '@web-wellbeing/ui';
import { Settings, User, ShieldCheck, Database, LogOut, Key } from 'lucide-react';
import { useAuth } from '../context/AuthProvider';

export default function SettingsView() {
  const { user, openAuthModal, signOut } = useAuth();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl md:text-4xl font-normal tracking-tight text-ink dark:text-on-dark">
          Settings & Preferences
        </h1>
        <p className="text-sm text-muted dark:text-on-dark-soft mt-1.5">
          Manage extension tracking rules, Supabase cloud sync options, and account authentication.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Account & Supabase Authentication Card */}
        <Card className="bg-surface-card/50 dark:bg-surface-dark border-hairline dark:border-hairline-dark">
          <CardHeader className="border-b border-hairline/60 dark:border-hairline-dark/60 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-serif flex items-center gap-2">
              <User className="h-4 w-4 text-primary" />
              <span>Supabase Account & Sync</span>
            </CardTitle>
            <Badge variant={user ? 'success' : 'secondary'} className="font-medium">
              {user ? 'Cloud Active' : 'Local Only'}
            </Badge>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {user ? (
              <div className="space-y-4">
                <div className="rounded-md border border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark-elevated p-4">
                  <div className="text-xs text-muted dark:text-on-dark-soft font-medium">
                    Signed in as
                  </div>
                  <div className="font-mono text-sm font-semibold text-ink dark:text-on-dark mt-1">
                    {user.email}
                  </div>
                  <div className="text-[11px] text-muted-soft mt-1">User ID: {user.id}</div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-muted dark:text-on-dark-soft">
                    <ShieldCheck className="h-4 w-4 text-accent-teal" />
                    <span>Row Level Security (RLS) Active</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => void signOut()}
                    className="gap-1.5 border-hairline dark:border-hairline-dark text-red-600 dark:text-red-400"
                  >
                    <LogOut className="h-3.5 w-3.5" />
                    <span>Sign Out</span>
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-4 space-y-3">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Database className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-normal text-ink dark:text-on-dark">
                    Connect to Supabase Cloud
                  </h3>
                  <p className="text-xs text-muted dark:text-on-dark-soft mt-1 max-w-sm mx-auto">
                    Sync your web activity, focus sessions, and productivity goals securely across
                    all your browsers.
                  </p>
                </div>
                <Button
                  variant="default"
                  size="sm"
                  onClick={openAuthModal}
                  className="bg-primary hover:bg-primary-active text-white rounded-md font-medium px-6"
                >
                  Sign In or Create Account
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Configuration & Privacy Controls Card */}
        <Card className="bg-surface-card/50 dark:bg-surface-dark border-hairline dark:border-hairline-dark">
          <CardHeader className="border-b border-hairline/60 dark:border-hairline-dark/60 py-4 flex flex-row items-center justify-between">
            <CardTitle className="text-base font-serif flex items-center gap-2">
              <Settings className="h-4 w-4 text-primary" />
              <span>Privacy & Security Controls</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            <div className="rounded-md border border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark-elevated p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink dark:text-on-dark">
                  Tracking Privacy Level
                </span>
                <Badge variant="outline">Domain-Only</Badge>
              </div>
              <p className="text-xs text-muted dark:text-on-dark-soft">
                Only website hostnames are stored (e.g. github.com). Full URLs and query parameters
                are stripped before storage.
              </p>
            </div>

            <div className="rounded-md border border-hairline dark:border-hairline-dark bg-canvas dark:bg-surface-dark-elevated p-4 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ink dark:text-on-dark flex items-center gap-1.5">
                  <Key className="h-3.5 w-3.5 text-accent-amber" />
                  <span>BYOK AI Integration</span>
                </span>
                <Badge variant="outline">Local Only</Badge>
              </div>
              <p className="text-xs text-muted dark:text-on-dark-soft">
                Bring Your Own Key: OpenAI and Anthropic API keys are stored exclusively in
                chrome.storage.local and never transmitted to external servers.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
