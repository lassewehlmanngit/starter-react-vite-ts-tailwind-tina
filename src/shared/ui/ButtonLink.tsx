import React from 'react';
import { Link, type LinkProps } from 'react-router-dom';
import { cn } from '@/shared/lib/cn';
import { buttonClassName, type ButtonSize, type ButtonVariant } from './Button';

export interface ButtonLinkProps extends LinkProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading = false,
  className,
  children,
  ...props
}) => {
  return (
    <Link
      {...props}
      className={cn(
        buttonClassName({ variant, size, isLoading }),
        className,
      )}
      aria-busy={isLoading || undefined}
    />
  );
};

