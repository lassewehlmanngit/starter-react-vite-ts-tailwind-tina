import React from 'react';
import { cn } from '@/shared/lib/cn';
import { Text } from './Typography';

// Single Testimonial Card
export interface TestimonialProps {
  quote: string;
  author: {
    name: string;
    title?: string;
    company?: string;
    avatar?: string;
  };
  rating?: number;
  variant?: 'default' | 'bordered' | 'filled';
  className?: string;
}

const variantClasses = {
  default: 'bg-background',
  bordered: 'bg-background border border-border',
  filled: 'bg-muted',
};

export const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  rating,
  variant = 'bordered',
  className,
}) => {
  return (
    <figure
      className={cn('rounded-lg p-6', variantClasses[variant], className)}
    >
      {/* Rating stars */}
      {rating !== undefined && (
        <div className="mb-4 flex gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                'h-5 w-5',
                i < rating ? 'text-warning' : 'text-muted',
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      {/* Quote */}
      <blockquote className="mb-4">
        <Text className="text-foreground italic">"{quote}"</Text>
      </blockquote>

      {/* Author */}
      <figcaption className="flex items-center gap-3">
        {author.avatar ? (
          <img
            src={author.avatar}
            alt=""
            className="h-10 w-10 rounded-full object-cover"
            aria-hidden="true"
          />
        ) : (
          <div
            className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground"
            aria-hidden="true"
          >
            {author.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <Text className="font-semibold text-foreground">{author.name}</Text>
          {(author.title || author.company) && (
            <Text size="sm" className="text-muted-foreground">
              {author.title}
              {author.title && author.company && ' at '}
              {author.company}
            </Text>
          )}
        </div>
      </figcaption>
    </figure>
  );
};

// Testimonial Grid
export interface TestimonialGridProps {
  columns?: 1 | 2 | 3;
  children: React.ReactNode;
  className?: string;
}

const gridColumnClasses = {
  1: '',
  2: 'md:grid-cols-2',
  3: 'md:grid-cols-2 lg:grid-cols-3',
};

export const TestimonialGrid: React.FC<TestimonialGridProps> = ({
  columns = 3,
  children,
  className,
}) => {
  return (
    <div className={cn('grid gap-6', gridColumnClasses[columns], className)}>
      {children}
    </div>
  );
};

// Featured Testimonial (larger, single highlight)
export interface FeaturedTestimonialProps extends TestimonialProps {
  logo?: string;
}

export const FeaturedTestimonial: React.FC<FeaturedTestimonialProps> = ({
  quote,
  author,
  rating,
  logo,
  className,
}) => {
  return (
    <figure
      className={cn(
        'mx-auto max-w-3xl rounded-xl bg-muted p-8 text-center md:p-12',
        className,
      )}
    >
      {logo && (
        <img
          src={logo}
          alt=""
          className="mx-auto mb-6 h-8 opacity-60"
          aria-hidden="true"
        />
      )}

      {rating !== undefined && (
        <div className="mb-4 flex justify-center gap-1" aria-label={`Rating: ${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <svg
              key={i}
              className={cn(
                'h-6 w-6',
                i < rating ? 'text-warning' : 'text-muted-foreground/30',
              )}
              fill="currentColor"
              viewBox="0 0 20 20"
              aria-hidden="true"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
          ))}
        </div>
      )}

      <blockquote className="mb-6">
        <Text size="lg" className="text-foreground italic leading-relaxed">
          "{quote}"
        </Text>
      </blockquote>

      <figcaption className="flex flex-col items-center gap-2">
        {author.avatar && (
          <img
            src={author.avatar}
            alt=""
            className="h-14 w-14 rounded-full object-cover"
            aria-hidden="true"
          />
        )}
        <div>
          <Text className="font-semibold text-foreground">{author.name}</Text>
          {(author.title || author.company) && (
            <Text size="sm" className="text-muted-foreground">
              {author.title}
              {author.title && author.company && ', '}
              {author.company}
            </Text>
          )}
        </div>
      </figcaption>
    </figure>
  );
};
