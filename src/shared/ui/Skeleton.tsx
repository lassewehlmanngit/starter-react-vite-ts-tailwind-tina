import React from 'react';
import { cn } from '@/shared/lib/cn';

export type SkeletonVariant = 'text' | 'circular' | 'rectangular';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: string | number;
  height?: string | number;
  lines?: number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  lines = 1,
  className,
}) => {
  const baseClasses = 'animate-pulse bg-muted';

  const variantClasses: Record<SkeletonVariant, string> = {
    text: 'h-4 rounded',
    circular: 'rounded-full',
    rectangular: 'rounded-lg',
  };

  const style: React.CSSProperties = {
    width: width ?? (variant === 'text' ? '100%' : undefined),
    height: height ?? (variant === 'circular' ? width : undefined),
  };

  if (variant === 'text' && lines > 1) {
    return (
      <div className={cn('space-y-2', className)}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={cn(baseClasses, variantClasses.text)}
            style={{
              ...style,
              // Make last line shorter for natural look
              width: i === lines - 1 ? '75%' : style.width,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={cn(baseClasses, variantClasses[variant], className)} style={style} />
  );
};

// Preset skeleton components for common use cases
export const SkeletonText: React.FC<{ lines?: number; className?: string }> = ({
  lines = 3,
  className,
}) => <Skeleton variant="text" lines={lines} className={className} />;

export const SkeletonAvatar: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className,
}) => <Skeleton variant="circular" width={size} height={size} className={className} />;

export const SkeletonCard: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('rounded-lg border border-border p-4', className)}>
    <Skeleton variant="rectangular" height={160} className="mb-4" />
    <Skeleton variant="text" className="mb-2" />
    <Skeleton variant="text" width="60%" />
  </div>
);

export const SkeletonButton: React.FC<{ className?: string }> = ({ className }) => (
  <Skeleton variant="rectangular" width={100} height={40} className={className} />
);
