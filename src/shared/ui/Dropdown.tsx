import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/shared/lib/cn';

// Context
interface DropdownContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  triggerRef: React.RefObject<HTMLButtonElement>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const DropdownContext = createContext<DropdownContextValue | null>(null);

const useDropdown = () => {
  const ctx = useContext(DropdownContext);
  if (!ctx) throw new Error('Dropdown components must be used within Dropdown');
  return ctx;
};

// Root
export interface DropdownProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({ children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  const [activeIndex, setActiveIndex] = useState(-1);
  const id = useId();
  const triggerId = `dropdown-trigger-${id}`;
  const contentId = `dropdown-content-${id}`;
  const triggerRef = useRef<HTMLButtonElement>(null);

  return (
    <DropdownContext.Provider
      value={{ open, setOpen, triggerId, contentId, triggerRef, activeIndex, setActiveIndex }}
    >
      <div className="relative inline-block">{children}</div>
    </DropdownContext.Provider>
  );
};

// Trigger
export interface DropdownTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const DropdownTrigger: React.FC<DropdownTriggerProps> = ({ children, className }) => {
  const { open, setOpen, triggerId, contentId, triggerRef } = useDropdown();

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown' || e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setOpen(true);
    }
  };

  return (
    <button
      ref={triggerRef}
      id={triggerId}
      type="button"
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      onClick={() => setOpen(!open)}
      onKeyDown={handleKeyDown}
      className={cn(
        'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition',
        'bg-secondary text-secondary-foreground hover:opacity-90',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        className,
      )}
    >
      {children}
    </button>
  );
};

// Content
export interface DropdownContentProps {
  children: React.ReactNode;
  className?: string;
  align?: 'start' | 'center' | 'end';
}

export const DropdownContent: React.FC<DropdownContentProps> = ({
  children,
  className,
  align = 'start',
}) => {
  const { open, setOpen, contentId, triggerId, triggerRef, setActiveIndex } = useDropdown();
  const contentRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        contentRef.current &&
        !contentRef.current.contains(target) &&
        triggerRef.current &&
        !triggerRef.current.contains(target)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, setOpen, triggerRef]);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const items = contentRef.current?.querySelectorAll<HTMLElement>('[role="menuitem"]');
      if (!items?.length) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        const currentIndex = Array.from(items).findIndex((el) => el === document.activeElement);
        const nextIndex = currentIndex < items.length - 1 ? currentIndex + 1 : 0;
        items[nextIndex]?.focus();
        setActiveIndex(nextIndex);
      }

      if (e.key === 'ArrowUp') {
        e.preventDefault();
        const currentIndex = Array.from(items).findIndex((el) => el === document.activeElement);
        const prevIndex = currentIndex > 0 ? currentIndex - 1 : items.length - 1;
        items[prevIndex]?.focus();
        setActiveIndex(prevIndex);
      }

      if (e.key === 'Home') {
        e.preventDefault();
        items[0]?.focus();
        setActiveIndex(0);
      }

      if (e.key === 'End') {
        e.preventDefault();
        items[items.length - 1]?.focus();
        setActiveIndex(items.length - 1);
      }
    },
    [setOpen, setActiveIndex, triggerRef],
  );

  // Focus first item on open
  useEffect(() => {
    if (open) {
      setTimeout(() => {
        const firstItem = contentRef.current?.querySelector<HTMLElement>('[role="menuitem"]');
        firstItem?.focus();
      }, 0);
    } else {
      setActiveIndex(-1);
    }
  }, [open, setActiveIndex]);

  if (!open) return null;

  const alignClasses = {
    start: 'left-0',
    center: 'left-1/2 -translate-x-1/2',
    end: 'right-0',
  };

  const content = (
    <div
      ref={contentRef}
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      onKeyDown={handleKeyDown}
      className={cn(
        'absolute top-full z-50 mt-1 min-w-[8rem] overflow-hidden rounded-lg border border-border bg-background p-1 shadow-md',
        'animate-in fade-in-0 zoom-in-95 duration-150',
        alignClasses[align],
        className,
      )}
    >
      {children}
    </div>
  );

  return content;
};

// Item
export interface DropdownItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  disabled?: boolean;
  className?: string;
}

export const DropdownItem: React.FC<DropdownItemProps> = ({
  children,
  onSelect,
  disabled = false,
  className,
}) => {
  const { setOpen, triggerRef } = useDropdown();

  const handleClick = () => {
    if (disabled) return;
    onSelect?.();
    setOpen(false);
    triggerRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      role="menuitem"
      tabIndex={disabled ? -1 : 0}
      aria-disabled={disabled || undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        'relative flex cursor-pointer select-none items-center rounded-md px-3 py-2 text-sm outline-none transition-colors',
        'hover:bg-muted focus:bg-muted',
        disabled && 'pointer-events-none opacity-50',
        className,
      )}
    >
      {children}
    </div>
  );
};

// Separator
export const DropdownSeparator: React.FC<{ className?: string }> = ({ className }) => (
  <div className={cn('-mx-1 my-1 h-px bg-border', className)} />
);
