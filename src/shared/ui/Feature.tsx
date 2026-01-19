import React from 'react';
import { cn } from '@/shared/lib/cn';
import { Heading, Text } from './Typography';

// Feature Card
export interface FeatureCardProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  link?: {
    href: string;
    label: string;
  };
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
  link,
  className,
}) => {
  return (
    <div
      className={cn(
        'group rounded-lg border border-border bg-background p-6 transition-all hover:border-primary/50 hover:shadow-md',
        className,
      )}
    >
      {icon && (
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
          {icon}
        </div>
      )}
      <Heading level={3} className="mb-2 text-lg">
        {title}
      </Heading>
      <Text className="text-muted-foreground">{description}</Text>
      {link && (
        <a
          href={link.href}
          className="mt-4 inline-flex items-center text-sm font-medium text-primary hover:underline"
        >
          {link.label}
          <svg
            className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </a>
      )}
    </div>
  );
};

// Feature Grid
export type FeatureGridColumns = 2 | 3 | 4;

export interface FeatureGridProps {
  columns?: FeatureGridColumns;
  children: React.ReactNode;
  className?: string;
}

const columnClasses: Record<FeatureGridColumns, string> = {
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
  4: 'md:grid-cols-2 lg:grid-cols-4',
};

export const FeatureGrid: React.FC<FeatureGridProps> = ({
  columns = 3,
  children,
  className,
}) => {
  return (
    <div className={cn('grid gap-6', columnClasses[columns], className)}>
      {children}
    </div>
  );
};

// Feature Section (combines heading + grid)
export interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  description?: string;
  columns?: FeatureGridColumns;
  centered?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const FeatureSection: React.FC<FeatureSectionProps> = ({
  title,
  subtitle,
  description,
  columns = 3,
  centered = false,
  children,
  className,
}) => {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container">
        {(title || subtitle || description) && (
          <div
            className={cn(
              'mb-12',
              centered && 'mx-auto max-w-2xl text-center',
            )}
          >
            {subtitle && (
              <Text
                size="sm"
                className="mb-2 font-semibold uppercase tracking-wider text-primary"
              >
                {subtitle}
              </Text>
            )}
            {title && (
              <Heading level={2} className="mb-4">
                {title}
              </Heading>
            )}
            {description && (
              <Text size="lg" className="text-muted-foreground">
                {description}
              </Text>
            )}
          </div>
        )}
        <FeatureGrid columns={columns}>{children}</FeatureGrid>
      </div>
    </section>
  );
};
