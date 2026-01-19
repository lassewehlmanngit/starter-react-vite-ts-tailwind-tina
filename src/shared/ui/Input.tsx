import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, invalid = false, startAdornment, endAdornment, type = 'text', ...props }, ref) => {
    return (
      <div
        className={cn(
          'relative flex items-center rounded-lg border bg-background shadow-sm',
          invalid ? 'border-destructive' : 'border-border',
          'focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background',
        )}
      >
        {startAdornment ? <span className="pl-3 text-muted-foreground">{startAdornment}</span> : null}
        <input
          ref={ref}
          type={type}
          className={cn(
            'w-full min-h-touch bg-transparent px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground outline-none disabled:cursor-not-allowed disabled:opacity-50',
            startAdornment ? 'pl-2' : '',
            endAdornment ? 'pr-2' : '',
            className,
          )}
          aria-invalid={invalid || undefined}
          {...props}
        />
        {endAdornment ? <span className="pr-3 text-muted-foreground">{endAdornment}</span> : null}
      </div>
    );
  },
);
Input.displayName = 'Input';

