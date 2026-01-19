import React, { useCallback, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

export type DrawerSide = 'left' | 'right';

export interface DrawerProps {
  open: boolean;
  onClose: () => void;
  side?: DrawerSide;
  title?: string;
  children: React.ReactNode;
  className?: string;
}

const sideClasses: Record<DrawerSide, { panel: string; openAnim: string; closedAnim: string }> = {
  left: {
    panel: 'left-0 top-0 h-full',
    openAnim: 'translate-x-0',
    closedAnim: '-translate-x-full',
  },
  right: {
    panel: 'right-0 top-0 h-full',
    openAnim: 'translate-x-0',
    closedAnim: 'translate-x-full',
  },
};

export const Drawer: React.FC<DrawerProps> = ({
  open,
  onClose,
  side = 'left',
  title,
  children,
  className,
}) => {
  const drawerRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus trap
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key !== 'Tab' || !drawerRef.current) return;

      const focusableElements = drawerRef.current.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    },
    [onClose],
  );

  // Lock scroll and manage focus
  useEffect(() => {
    if (open) {
      previousActiveElement.current = document.activeElement as HTMLElement;
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', handleKeyDown);

      // Focus first focusable element or close button
      setTimeout(() => {
        const closeButton = drawerRef.current?.querySelector<HTMLElement>('[data-drawer-close]');
        closeButton?.focus();
      }, 0);
    } else {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
      previousActiveElement.current?.focus();
    }

    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

  const sideConfig = sideClasses[side];

  const content = (
    <div
      className={cn('fixed inset-0 z-50', !open && 'pointer-events-none')}
      role="presentation"
    >
      {/* Backdrop */}
      <div
        className={cn(
          'absolute inset-0 bg-background/80 backdrop-blur-sm transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        ref={drawerRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? 'drawer-title' : undefined}
        className={cn(
          'fixed z-10 w-full max-w-xs border-border bg-background shadow-lg transition-transform duration-300 ease-in-out',
          sideConfig.panel,
          side === 'left' ? 'border-r' : 'border-l',
          open ? sideConfig.openAnim : sideConfig.closedAnim,
          className,
        )}
      >
        {/* Header */}
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          {title && (
            <h2
              id="drawer-title"
              className="text-lg font-semibold leading-none tracking-tight text-foreground"
            >
              {title}
            </h2>
          )}
          <button
            type="button"
            data-drawer-close
            onClick={onClose}
            className="ml-auto rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">{children}</div>
      </div>
    </div>
  );

  return createPortal(content, document.body);
};
