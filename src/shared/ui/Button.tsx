import React from 'react';
import { cn } from '@/shared/lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive';
export type ButtonSize = 'sm' | 'md' | 'lg';

export const buttonClassName = ({
  variant,
  size,
  isLoading,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  isLoading: boolean;
}): string => {
  const base =
    'inline-flex min-h-touch min-w-touch items-center justify-center gap-2 rounded-lg font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50';

  const sizes: Record<ButtonSize, string> = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-sm',
    lg: 'px-5 py-3 text-base',
  };

  const variants: Record<ButtonVariant, string> = {
    primary: 'bg-primary text-primary-foreground hover:opacity-90',
    secondary: 'bg-secondary text-secondary-foreground hover:opacity-90',
    outline: 'border border-border bg-transparent text-foreground hover:bg-muted',
    ghost: 'bg-transparent text-foreground hover:bg-muted',
    destructive: 'bg-destructive text-destructive-foreground hover:opacity-90',
  };

  const loading = isLoading ? 'cursor-wait' : '';

  return cn(base, sizes[size], variants[variant], loading);
};

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading = false, leftIcon, rightIcon, className, children, disabled, ...props }, ref) => {
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        type={props.type ?? 'button'}
        className={cn(buttonClassName({ variant, size, isLoading }), className)}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        aria-busy={isLoading || undefined}
        {...props}
      >
        {leftIcon ? <span aria-hidden="true">{leftIcon}</span> : null}
        {isLoading ? <Spinner aria-hidden="true" /> : null}
        <span className={cn(isLoading && 'opacity-90')}>{children}</span>
        {rightIcon ? <span aria-hidden="true">{rightIcon}</span> : null}
      </button>
    );
  },
);
Button.displayName = 'Button';

const Spinner: React.FC<React.SVGProps<SVGSVGElement>> = (props) => {
  return (
    <svg
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      className="animate-spin"
      {...props}
    >
      <path
        d="M12 2a10 10 0 0 1 10 10"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
};

