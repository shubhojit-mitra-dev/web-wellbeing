import * as React from 'react';
import { cn } from './utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  isLoading?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = 'default',
      size = 'default',
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref,
  ) => {
    const baseStyles =
      'inline-flex flex-row items-center justify-center whitespace-nowrap shrink-0 rounded-md text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer';

    const variantStyles = {
      default:
        'bg-primary text-white hover:bg-primary-active active:bg-primary-active shadow-sm font-medium',
      destructive: 'bg-red-600 text-white hover:bg-red-700 active:bg-red-800',
      outline:
        'border border-hairline dark:border-hairline-dark bg-transparent hover:bg-surface-card/60 dark:hover:bg-surface-dark-elevated text-ink dark:text-on-dark',
      secondary:
        'bg-surface-card dark:bg-surface-dark-elevated text-ink dark:text-on-dark hover:bg-surface-cream-strong dark:hover:bg-hairline-dark border border-hairline dark:border-hairline-dark',
      ghost:
        'bg-transparent hover:bg-surface-card/60 dark:hover:bg-surface-dark-elevated text-body dark:text-muted-soft',
      link: 'text-primary underline-offset-4 hover:underline p-0 h-auto font-medium',
    };

    const sizeStyles = {
      default: 'h-10 px-4 py-2 gap-2',
      sm: 'h-8 px-3 text-xs gap-1.5',
      lg: 'h-12 px-6 text-base gap-2.5',
      icon: 'h-10 w-10 p-0 justify-center rounded-full',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading && (
          <svg
            className="h-4 w-4 shrink-0 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';
