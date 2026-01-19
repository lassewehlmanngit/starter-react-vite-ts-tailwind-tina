import React from 'react';
import { cn } from '@/shared/lib/cn';

export type IconButtonVariant = 'default' | 'ghost' | 'outline';
export type IconButtonSize = 'sm' | 'md' | 'lg';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  'aria-label': string; // Required for accessibility
}

const variants: Record<IconButtonVariant, string> = {
  default: 'bg-primary text-primary-foreground hover:opacity-90',
  ghost: 'bg-transparent text-foreground hover:bg-muted',
  outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
};

const sizes: Record<IconButtonSize, string> = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
};

export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ variant = 'ghost', size = 'md', className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn(
          'inline-flex min-h-touch min-w-touch items-center justify-center rounded-lg transition',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          variants[variant],
          sizes[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);
IconButton.displayName = 'IconButton';
