import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'section' | 'div' | 'main' | 'aside';
  container?: boolean;
}

export const Section: React.FC<SectionProps> = ({ as = 'section', container = true, className, children, ...props }) => {
  const Tag = as;
  return (
    <Tag className={cn('py-12 sm:py-16', className)} {...props}>
      {container ? <div className="container">{children}</div> : children}
    </Tag>
  );
};

