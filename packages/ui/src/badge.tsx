import * as React from 'react';
import { cn } from './utils';

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'success' | 'destructive' | 'outline' | 'warning' | 'coral';
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variantStyles = {
    default: 'border-transparent bg-[#efe9de] dark:bg-[#252320] text-[#141413] dark:text-[#faf9f5]',
    secondary:
      'border-transparent bg-[#f5f0e8] dark:bg-[#1f1e1b] text-[#3d3d3a] dark:text-[#a09d96]',
    coral: 'border-transparent bg-[#cc785c] text-white font-medium',
    success:
      'border-transparent bg-[#5db872]/15 text-[#5db872] dark:bg-[#5db872]/20 dark:text-[#5db872]',
    destructive:
      'border-transparent bg-[#c64545]/15 text-[#c64545] dark:bg-[#c64545]/20 dark:text-[#c64545]',
    warning:
      'border-transparent bg-[#e8a55a]/15 text-[#d4a017] dark:bg-[#e8a55a]/20 dark:text-[#e8a55a]',
    outline:
      'border-[#e6dfd8] dark:border-[#2d2b27] bg-transparent text-[#141413] dark:text-[#faf9f5]',
  };

  return (
    <div
      className={cn(
        'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-[#cc785c]',
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
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#5db8a6] opacity-75" />
        )}
        <span
          className={cn(
            'relative inline-flex h-2.5 w-2.5 rounded-full',
            active ? 'bg-[#5db8a6]' : 'bg-[#8e8b82]',
          )}
        />
      </span>
      {label && (
        <span className="text-xs font-medium text-[#6c6a64] dark:text-[#a09d96]">{label}</span>
      )}
    </div>
  );
}
