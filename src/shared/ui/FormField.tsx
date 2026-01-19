import React from 'react';
import { cn } from '@/shared/lib/cn';
import { Label } from './Label';

export interface FormFieldRenderProps {
  id: string;
  describedBy?: string;
  invalid: boolean;
}

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  description?: string;
  error?: string;
  className?: string;
  children: React.ReactNode | ((props: FormFieldRenderProps) => React.ReactNode);
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  required,
  description,
  error,
  className,
  children,
}) => {
  const generatedId = React.useId();
  const id = htmlFor ?? generatedId;
  const descriptionId = description ? `${id}-description` : undefined;
  const errorId = error ? `${id}-error` : undefined;
  const describedBy = [descriptionId, errorId].filter(Boolean).join(' ') || undefined;
  const invalid = Boolean(error);

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id} required={required}>
        {label}
      </Label>
      {description ? (
        <p id={descriptionId} className="text-sm text-muted-foreground">
          {description}
        </p>
      ) : null}
      {typeof children === 'function' ? children({ id, describedBy, invalid }) : children}
      {error ? (
        <p id={errorId} className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
};

