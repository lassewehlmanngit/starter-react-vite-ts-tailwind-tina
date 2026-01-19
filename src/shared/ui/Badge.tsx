import React from 'react';
import { cn } from '@/shared/lib/cn';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'destructive' | 'secondary';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const variantClassName: Record<BadgeVariant, string> = {
  default: 'bg-primary text-primary-foreground',
  secondary: 'bg-secondary text-secondary-foreground',
  success: 'bg-success text-success-foreground',
  warning: 'bg-warning text-warning-foreground',
  destructive: 'bg-destructive text-destructive-foreground',
};

export const Badge: React.FC<BadgeProps> = ({ variant = 'secondary', className, ...props }) => {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium',
        variantClassName[variant],
        className,
      )}
      {...props}
    />
  );
};

