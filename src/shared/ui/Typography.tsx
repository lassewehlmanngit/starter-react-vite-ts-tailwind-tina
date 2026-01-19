import React from 'react';
import { cn } from '@/shared/lib/cn';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
type TextTag = 'p' | 'span' | 'div';

const levelToTag: Record<HeadingLevel, HeadingTag> = {
  1: 'h1',
  2: 'h2',
  3: 'h3',
  4: 'h4',
  5: 'h5',
  6: 'h6',
};

const levelToClassName: Record<HeadingLevel, string> = {
  1: 'text-h1',
  2: 'text-h2',
  3: 'text-h3',
  4: 'text-h4',
  5: 'text-h5',
  6: 'text-h6',
};

export interface HeadingProps {
  level: HeadingLevel;
  className?: string;
  children: React.ReactNode;
  as?: HeadingTag;
}

export const Heading: React.FC<HeadingProps> = ({ level, className, children, as }) => {
  const Tag = as ?? levelToTag[level];
  return (
    <Tag className={cn('font-semibold tracking-tight text-foreground', levelToClassName[level], className)}>
      {children}
    </Tag>
  );
};

export type TextVariant = 'body' | 'muted' | 'small' | 'caption';
export type TextSize = 'xs' | 'sm' | 'base' | 'lg' | 'xl';

const textVariantClassName: Record<TextVariant, string> = {
  body: 'text-foreground',
  muted: 'text-muted-foreground',
  small: 'text-foreground',
  caption: 'text-muted-foreground',
};

const textSizeClassName: Record<TextSize, string> = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
};

export interface TextProps {
  variant?: TextVariant;
  size?: TextSize;
  className?: string;
  children: React.ReactNode;
  as?: TextTag;
}

export const Text: React.FC<TextProps> = ({ variant = 'body', size, className, children, as }) => {
  const Tag = as ?? 'p';
  // Default size based on variant if not specified
  const defaultSize = variant === 'small' ? 'sm' : variant === 'caption' ? 'xs' : 'base';
  const actualSize = size ?? defaultSize;
  return (
    <Tag className={cn('leading-[var(--leading-normal)]', textSizeClassName[actualSize], textVariantClassName[variant], className)}>
      {children}
    </Tag>
  );
};

export interface LeadProps {
  className?: string;
  children: React.ReactNode;
  as?: TextTag;
}

export const Lead: React.FC<LeadProps> = ({ className, children, as }) => {
  const Tag = as ?? 'p';
  return <Tag className={cn('text-lg text-foreground/90 leading-[var(--leading-relaxed)]', className)}>{children}</Tag>;
};

