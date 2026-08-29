import * as React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'warning' | 'coral';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantStyles = {
    default:
      'border-transparent bg-surface-card dark:bg-surface-dark-elevated text-ink dark:text-on-dark',
    secondary:
      'border-transparent bg-surface-soft dark:bg-surface-dark-soft text-body dark:text-muted-soft',
    coral: 'border-transparent bg-primary text-white font-medium',
    success:
      'border-transparent bg-accent-teal/15 text-accent-teal dark:bg-accent-teal/20 dark:text-accent-teal',
    destructive:
      'border-transparent bg-red-500/15 text-red-600 dark:bg-red-500/20 dark:text-red-400',
    warning:
      'border-transparent bg-accent-amber/15 text-amber-600 dark:bg-accent-amber/20 dark:text-accent-amber',
    outline: 'border-hairline dark:border-hairline-dark bg-transparent text-ink dark:text-on-dark',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary',
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
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-teal opacity-75" />
        )}
        <span
          className={cn(
            'relative inline-flex h-2.5 w-2.5 rounded-full',
            active ? 'bg-accent-teal' : 'bg-muted-soft',
          )}
        />
      </span>
      {label && (
        <span className="text-xs font-medium text-muted dark:text-muted-soft">{label}</span>
      )}
    </div>
  );
}
