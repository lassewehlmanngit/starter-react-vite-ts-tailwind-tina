import React from 'react';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Button } from './Button';

export type AlertVariant = 'info' | 'success' | 'warning' | 'destructive';

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: AlertVariant;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
}

const variantClassName: Record<AlertVariant, string> = {
  info: 'border-border bg-muted text-foreground',
  success: 'border-success/30 bg-success/10 text-foreground',
  warning: 'border-warning/30 bg-warning/10 text-foreground',
  destructive: 'border-destructive/30 bg-destructive/10 text-foreground',
};

export const Alert: React.FC<AlertProps> = ({
  variant = 'info',
  title,
  description,
  icon,
  onClose,
  className,
  ...props
}) => {
  const role: 'status' | 'alert' = variant === 'destructive' || variant === 'warning' ? 'alert' : 'status';

  return (
    <div
      role={role}
      className={cn('relative rounded-xl border p-4 shadow-sm', variantClassName[variant], className)}
      {...props}
    >
      <div className="flex items-start gap-3">
        {icon ? <div className="mt-0.5" aria-hidden="true">{icon}</div> : null}
        <div className="flex-1">
          {title ? <div className="text-sm font-semibold">{title}</div> : null}
          {description ? <div className="mt-1 text-sm text-muted-foreground">{description}</div> : null}
        </div>
      </div>
      {onClose ? (
        <div className="absolute right-2 top-2">
          <Button
            variant="ghost"
            size="sm"
            aria-label="Close"
            onClick={onClose}
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </Button>
        </div>
      ) : null}
    </div>
  );
};

