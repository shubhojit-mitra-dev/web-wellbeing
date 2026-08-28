import { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@web-wellbeing/ui';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error | undefined;
}

export class DashboardErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught dashboard component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-[400px] w-full flex-col items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-100 text-red-600 dark:bg-red-950/60 dark:text-red-400">
            <AlertTriangle className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-bold text-zinc-900 dark:text-zinc-100">
            Dashboard View Error
          </h2>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400 max-w-md">
            {this.state.error?.message ||
              'An unexpected error occurred while rendering this dashboard view.'}
          </p>
          <Button
            variant="outline"
            size="sm"
            className="mt-6 gap-2"
            onClick={() => this.setState({ hasError: false, error: undefined })}
          >
            <RefreshCw className="h-4 w-4" />
            <span>Try Again</span>
          </Button>
        </div>
      );
    }

    return this.props.children;
  }
}
