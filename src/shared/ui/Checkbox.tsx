import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label?: React.ReactNode;
}

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className, label, id, ...props }, ref) => {
    const checkboxId = id ?? React.useId();
    const labelId = `${checkboxId}-label`;

    return (
      <div className={cn('flex items-start gap-2', className)}>
        <input
          ref={ref}
          id={checkboxId}
          type="checkbox"
          className={cn(
            'mt-1 h-5 w-5 rounded border-border bg-background text-primary shadow-sm',
            'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-50',
          )}
          aria-labelledby={label ? labelId : undefined}
          {...props}
        />
        {label ? (
          <label id={labelId} htmlFor={checkboxId} className="text-sm leading-[var(--leading-normal)] text-foreground">
            {label}
          </label>
        ) : null}
      </div>
    );
  },
);
Checkbox.displayName = 'Checkbox';

