import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}

const gapClassName: Record<NonNullable<GridProps['gap']>, string> = {
  sm: 'gap-3',
  md: 'gap-6',
  lg: 'gap-10',
};

const columnsClassName: Record<NonNullable<GridProps['columns']>, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
};

export const Grid: React.FC<GridProps> = ({ columns = 2, gap = 'md', className, ...props }) => {
  return <div className={cn('grid', columnsClassName[columns], gapClassName[gap], className)} {...props} />;
};

