import React from 'react';
import { cn } from '@/shared/lib/cn';
import { Heading, Text } from './Typography';

export type HeroVariant = 'default' | 'centered' | 'split';
export type HeroSize = 'sm' | 'md' | 'lg';

export interface HeroProps {
  variant?: HeroVariant;
  size?: HeroSize;
  title: string;
  subtitle?: string;
  description?: string;
  actions?: React.ReactNode;
  media?: React.ReactNode;
  backgroundImage?: string;
  overlay?: boolean;
  className?: string;
  children?: React.ReactNode;
}

const sizeClasses: Record<HeroSize, string> = {
  sm: 'py-12 md:py-16',
  md: 'py-16 md:py-24',
  lg: 'py-24 md:py-32 lg:py-40',
};

const variantClasses: Record<HeroVariant, string> = {
  default: 'text-left',
  centered: 'text-center mx-auto',
  split: 'text-left',
};

export const Hero: React.FC<HeroProps> = ({
  variant = 'default',
  size = 'md',
  title,
  subtitle,
  description,
  actions,
  media,
  backgroundImage,
  overlay = true,
  className,
  children,
}) => {
  const hasMedia = !!media;
  const isSplit = variant === 'split' && hasMedia;

  return (
    <section
      className={cn(
        'relative overflow-hidden bg-background',
        sizeClasses[size],
        className,
      )}
    >
      {/* Background image */}
      {backgroundImage && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${backgroundImage})` }}
            aria-hidden="true"
          />
          {overlay && (
            <div
              className="absolute inset-0 bg-background/80"
              aria-hidden="true"
            />
          )}
        </>
      )}

      <div className="container relative">
        {isSplit ? (
          <div className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Content */}
            <div className={variantClasses[variant]}>
              {subtitle && (
                <Text
                  size="sm"
                  className="mb-3 font-semibold uppercase tracking-wider text-primary"
                >
                  {subtitle}
                </Text>
              )}
              <Heading level={1} className="mb-4">
                {title}
              </Heading>
              {description && (
                <Text size="lg" className="mb-6 text-muted-foreground">
                  {description}
                </Text>
              )}
              {actions && (
                <div className="flex flex-wrap gap-3">{actions}</div>
              )}
              {children}
            </div>

            {/* Media */}
            <div className="relative">{media}</div>
          </div>
        ) : (
          <div
            className={cn(
              'max-w-3xl',
              variantClasses[variant],
              variant === 'centered' && 'mx-auto',
            )}
          >
            {subtitle && (
              <Text
                size="sm"
                className={cn(
                  'mb-3 font-semibold uppercase tracking-wider text-primary',
                  variant === 'centered' && 'mx-auto',
                )}
              >
                {subtitle}
              </Text>
            )}
            <Heading level={1} className="mb-4">
              {title}
            </Heading>
            {description && (
              <Text size="lg" className="mb-6 text-muted-foreground">
                {description}
              </Text>
            )}
            {actions && (
              <div
                className={cn(
                  'flex flex-wrap gap-3',
                  variant === 'centered' && 'justify-center',
                )}
              >
                {actions}
              </div>
            )}
            {media && <div className="mt-8">{media}</div>}
            {children}
          </div>
        )}
      </div>
    </section>
  );
};
