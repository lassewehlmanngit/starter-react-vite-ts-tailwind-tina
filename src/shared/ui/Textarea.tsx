import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, invalid = false, ...props }, ref) => {
  return (
    <textarea
      ref={ref}
      className={cn(
        'w-full rounded-lg border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground shadow-sm outline-none',
        'min-h-[6rem]',
        invalid ? 'border-destructive' : 'border-border',
        'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      aria-invalid={invalid || undefined}
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

