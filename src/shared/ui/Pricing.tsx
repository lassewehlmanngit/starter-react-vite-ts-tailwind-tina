import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import { Heading, Text } from './Typography';
import { Badge } from './Badge';

// Pricing Card
export interface PricingFeature {
  text: string;
  included: boolean;
}

export interface PricingCardProps {
  name: string;
  description?: string;
  price: string | number;
  currency?: string;
  period?: string;
  features: (string | PricingFeature)[];
  cta?: React.ReactNode;
  popular?: boolean;
  badge?: string;
  className?: string;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  description,
  price,
  currency = '$',
  period = '/month',
  features,
  cta,
  popular = false,
  badge,
  className,
}) => {
  return (
    <div
      className={cn(
        'relative flex flex-col rounded-xl border bg-background p-6',
        popular ? 'border-primary shadow-lg' : 'border-border',
        className,
      )}
    >
      {/* Badge */}
      {(popular || badge) && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <Badge variant={popular ? 'default' : 'secondary'}>
            {badge || 'Most Popular'}
          </Badge>
        </div>
      )}

      {/* Header */}
      <div className="mb-6">
        <Heading level={3} className="mb-1 text-xl">
          {name}
        </Heading>
        {description && (
          <Text size="sm" className="text-muted-foreground">
            {description}
          </Text>
        )}
      </div>

      {/* Price */}
      <div className="mb-6">
        <div className="flex items-baseline gap-1">
          <span className="text-sm text-muted-foreground">{currency}</span>
          <span className="text-4xl font-bold tracking-tight text-foreground">
            {typeof price === 'number' ? price.toLocaleString() : price}
          </span>
          {period && (
            <span className="text-sm text-muted-foreground">{period}</span>
          )}
        </div>
      </div>

      {/* Features */}
      <ul className="mb-6 flex-1 space-y-3">
        {features.map((feature, index) => {
          const isString = typeof feature === 'string';
          const text = isString ? feature : feature.text;
          const included = isString ? true : feature.included;

          return (
            <li
              key={index}
              className={cn(
                'flex items-start gap-2 text-sm',
                !included && 'text-muted-foreground line-through',
              )}
            >
              <Check
                className={cn(
                  'mt-0.5 h-4 w-4 flex-shrink-0',
                  included ? 'text-success' : 'text-muted-foreground/50',
                )}
                aria-hidden="true"
              />
              <span>{text}</span>
            </li>
          );
        })}
      </ul>

      {/* CTA */}
      {cta && <div className="mt-auto">{cta}</div>}
    </div>
  );
};

// Pricing Grid
export interface PricingGridProps {
  columns?: 2 | 3 | 4;
  children: React.ReactNode;
  className?: string;
}

const gridColumnClasses = {
  2: 'md:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'md:grid-cols-2 xl:grid-cols-4',
};

export const PricingGrid: React.FC<PricingGridProps> = ({
  columns = 3,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        'grid gap-6 md:gap-8',
        gridColumnClasses[columns],
        className,
      )}
    >
      {children}
    </div>
  );
};

// Pricing Toggle (for monthly/yearly)
export interface PricingToggleProps {
  options: [string, string];
  value: 0 | 1;
  onChange: (value: 0 | 1) => void;
  discount?: string;
  className?: string;
}

export const PricingToggle: React.FC<PricingToggleProps> = ({
  options,
  value,
  onChange,
  discount,
  className,
}) => {
  return (
    <div className={cn('flex items-center justify-center gap-3', className)}>
      <span
        className={cn(
          'text-sm font-medium',
          value === 0 ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {options[0]}
      </span>
      <button
        type="button"
        role="switch"
        aria-checked={value === 1}
        onClick={() => onChange(value === 0 ? 1 : 0)}
        className={cn(
          'relative inline-flex h-6 w-11 items-center rounded-full transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          value === 1 ? 'bg-primary' : 'bg-muted',
        )}
      >
        <span
          className={cn(
            'inline-block h-4 w-4 transform rounded-full bg-background shadow transition-transform',
            value === 1 ? 'translate-x-6' : 'translate-x-1',
          )}
        />
      </button>
      <span
        className={cn(
          'text-sm font-medium',
          value === 1 ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {options[1]}
      </span>
      {discount && value === 1 && (
        <Badge variant="success" className="ml-1">
          {discount}
        </Badge>
      )}
    </div>
  );
};
