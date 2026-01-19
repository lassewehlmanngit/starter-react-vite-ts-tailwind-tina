import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
  direction?: 'vertical' | 'horizontal';
  gap?: 'sm' | 'md' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between';
  wrap?: boolean;
}

const gapClassName: Record<NonNullable<StackProps['gap']>, string> = {
  sm: 'gap-2',
  md: 'gap-4',
  lg: 'gap-6',
};

const alignClassName: Record<NonNullable<StackProps['align']>, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
};

const justifyClassName: Record<NonNullable<StackProps['justify']>, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
};

export const Stack: React.FC<StackProps> = ({
  direction = 'vertical',
  gap = 'md',
  align = 'stretch',
  justify = 'start',
  wrap = false,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex',
        direction === 'vertical' ? 'flex-col' : 'flex-row',
        gapClassName[gap],
        alignClassName[align],
        justifyClassName[justify],
        wrap ? 'flex-wrap' : 'flex-nowrap',
        className,
      )}
      {...props}
    />
  );
};

