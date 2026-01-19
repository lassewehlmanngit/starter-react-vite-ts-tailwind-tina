import React from 'react';
import { cn } from '@/shared/lib/cn';

export type ProgressVariant = 'linear' | 'circular';

export interface ProgressProps {
  variant?: ProgressVariant;
  value?: number;
  max?: number;
  indeterminate?: boolean;
  size?: number;
  strokeWidth?: number;
  className?: string;
  'aria-label'?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  variant = 'linear',
  value = 0,
  max = 100,
  indeterminate = false,
  size = 40,
  strokeWidth = 4,
  className,
  'aria-label': ariaLabel,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  if (variant === 'circular') {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={ariaLabel}
        className={cn('inline-flex', className)}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className={cn(indeterminate && 'animate-spin')}
        >
          {/* Background circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            className="text-muted"
          />
          {/* Progress circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={indeterminate ? circumference * 0.75 : strokeDashoffset}
            className="text-primary transition-all duration-300"
            style={{
              transformOrigin: 'center',
              transform: 'rotate(-90deg)',
            }}
          />
        </svg>
      </div>
    );
  }

  // Linear progress
  return (
    <div
      role="progressbar"
      aria-valuenow={indeterminate ? undefined : value}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-label={ariaLabel}
      className={cn('relative h-2 w-full overflow-hidden rounded-full bg-muted', className)}
    >
      <div
        className={cn(
          'h-full rounded-full bg-primary transition-all duration-300',
          indeterminate && 'animate-progress-indeterminate',
        )}
        style={{
          width: indeterminate ? '50%' : `${percentage}%`,
        }}
      />
    </div>
  );
};

// Spinner component for simpler loading states
export const Spinner: React.FC<{ size?: number; className?: string }> = ({
  size = 24,
  className,
}) => (
  <Progress
    variant="circular"
    indeterminate
    size={size}
    strokeWidth={3}
    aria-label="Loading"
    className={className}
  />
);
