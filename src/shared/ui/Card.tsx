import React from 'react';
import { cn } from '@/shared/lib/cn';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<CardProps> = ({ className, ...props }) => {
  return (
    <div
      className={cn('rounded-xl border border-border bg-background shadow-sm', className)}
      {...props}
    />
  );
};

export interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardHeader: React.FC<CardHeaderProps> = ({ className, ...props }) => {
  return <div className={cn('px-6 pt-6', className)} {...props} />;
};

export interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardContent: React.FC<CardContentProps> = ({ className, ...props }) => {
  return <div className={cn('px-6 py-4', className)} {...props} />;
};

export interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}
export const CardFooter: React.FC<CardFooterProps> = ({ className, ...props }) => {
  return <div className={cn('px-6 pb-6 pt-2', className)} {...props} />;
};

