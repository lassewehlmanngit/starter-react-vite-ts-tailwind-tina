import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface RadioOption {
  value: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: RadioOption[];
  className?: string;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({ name, value, onChange, options, className }) => {
  return (
    <div role="radiogroup" className={cn('space-y-2', className)}>
      {options.map((opt) => {
        const id = `${name}-${opt.value}`;
        const descriptionId = opt.description ? `${id}-desc` : undefined;

        return (
          <label
            key={opt.value}
            htmlFor={id}
            className={cn(
              'flex items-start gap-3 rounded-lg border px-3 py-2',
              opt.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer',
              value === opt.value ? 'border-primary bg-muted' : 'border-border bg-background',
            )}
          >
            <input
              id={id}
              type="radio"
              name={name}
              value={opt.value}
              checked={value === opt.value}
              onChange={() => onChange(opt.value)}
              disabled={opt.disabled}
              aria-describedby={descriptionId}
              className={cn(
                'mt-1 h-5 w-5 border-border bg-background text-primary',
                'focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
              )}
            />
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">{opt.label}</div>
              {opt.description ? (
                <div id={descriptionId} className="mt-1 text-sm text-muted-foreground">
                  {opt.description}
                </div>
              ) : null}
            </div>
          </label>
        );
      })}
    </div>
  );
};

