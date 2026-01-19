import React, { useEffect, useRef, useState } from 'react';
import { cn } from '@/shared/lib/cn';

export type ImageFit = 'cover' | 'contain' | 'fill' | 'none';
export type ImageLoading = 'lazy' | 'eager';

export interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  fit?: ImageFit;
  loading?: ImageLoading;
  priority?: boolean;
  placeholder?: 'blur' | 'empty';
  blurDataUrl?: string;
  aspectRatio?: string;
  sizes?: string;
  srcSet?: string;
  className?: string;
  containerClassName?: string;
  onLoad?: () => void;
  onError?: () => void;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  fit = 'cover',
  loading = 'lazy',
  priority = false,
  placeholder = 'empty',
  blurDataUrl,
  aspectRatio,
  sizes,
  srcSet,
  className,
  containerClassName,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const containerRef = useRef<HTMLDivElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || loading === 'eager') {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0,
      },
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [priority, loading]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  const fitClasses: Record<ImageFit, string> = {
    cover: 'object-cover',
    contain: 'object-contain',
    fill: 'object-fill',
    none: 'object-none',
  };

  // Calculate aspect ratio style
  const aspectStyle = aspectRatio
    ? { aspectRatio }
    : width && height
      ? { aspectRatio: `${width}/${height}` }
      : undefined;

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', containerClassName)}
      style={aspectStyle}
    >
      {/* Blur placeholder */}
      {placeholder === 'blur' && blurDataUrl && !isLoaded && (
        <img
          src={blurDataUrl}
          alt=""
          aria-hidden="true"
          className={cn(
            'absolute inset-0 h-full w-full scale-110 blur-lg',
            fitClasses[fit],
          )}
        />
      )}

      {/* Skeleton placeholder */}
      {placeholder === 'empty' && !isLoaded && !hasError && (
        <div
          className="absolute inset-0 animate-pulse bg-muted"
          aria-hidden="true"
        />
      )}

      {/* Error state */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted">
          <span className="text-sm text-muted-foreground">Failed to load image</span>
        </div>
      )}

      {/* Main image */}
      {isInView && !hasError && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? 'eager' : loading}
          decoding={priority ? 'sync' : 'async'}
          sizes={sizes}
          srcSet={srcSet}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'h-full w-full transition-opacity duration-300',
            fitClasses[fit],
            isLoaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
        />
      )}
    </div>
  );
};

// Avatar variant
export interface AvatarImageProps {
  src?: string;
  alt: string;
  fallback?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const avatarSizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-12 w-12',
  xl: 'h-16 w-16',
};

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  alt,
  fallback,
  size = 'md',
  className,
}) => {
  const [hasError, setHasError] = useState(false);

  const initials = fallback || alt.charAt(0).toUpperCase();

  if (!src || hasError) {
    return (
      <div
        className={cn(
          'flex items-center justify-center rounded-full bg-primary text-primary-foreground font-medium',
          avatarSizes[size],
          className,
        )}
        aria-label={alt}
      >
        {initials}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setHasError(true)}
      className={cn('rounded-full object-cover', avatarSizes[size], className)}
    />
  );
};
