import * as React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'warning';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantStyles = {
    default:
      'border-transparent bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300',
    secondary: 'border-transparent bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100',
    success:
      'border-transparent bg-green-100 dark:bg-green-950/60 text-green-800 dark:text-green-300',
    destructive: 'border-transparent bg-red-100 dark:bg-red-950/60 text-red-800 dark:text-red-300',
    warning:
      'border-transparent bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300',
    outline: 'border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500',
        variantStyles[variant],
        className,
      )}
      {...props}
    />
  );
}

export function StatusIndicator({ active = false, label }: { active?: boolean; label?: string }) {
  return (
    <div className="inline-flex items-center gap-2">
      <span className="relative flex h-2.5 w-2.5">
        {active && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
        )}
        <span
          className={cn(
            'relative inline-flex h-2.5 w-2.5 rounded-full',
            active ? 'bg-emerald-500' : 'bg-zinc-400 dark:bg-zinc-600',
          )}
        />
      </span>
      {label && (
        <span className="text-xs font-medium text-zinc-600 dark:text-zinc-400">{label}</span>
      )}
    </div>
  );
}
