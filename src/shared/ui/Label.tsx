import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({ className, required, children, ...props }) => {
  return (
    <label className={cn('text-sm font-medium text-foreground', className)} {...props}>
      {children}
      {required ? <span className="ml-1 text-destructive" aria-hidden="true">*</span> : null}
    </label>
  );
};

