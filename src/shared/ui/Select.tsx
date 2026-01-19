import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'children'> {
  invalid?: boolean;
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, invalid = false, options, ...props }, ref) => {
    return (
      <select
        ref={ref}
        className={cn(
          'w-full min-h-touch rounded-lg border bg-background px-3 py-2 text-sm text-foreground shadow-sm outline-none',
          invalid ? 'border-destructive' : 'border-border',
          'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-50',
          className,
        )}
        aria-invalid={invalid || undefined}
        {...props}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} disabled={opt.disabled}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  },
);
Select.displayName = 'Select';

