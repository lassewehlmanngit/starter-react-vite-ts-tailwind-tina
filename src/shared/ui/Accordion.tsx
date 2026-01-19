import React, { createContext, useCallback, useContext, useId, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/shared/lib/cn';

// Context
interface AccordionContextValue {
  openItems: string[];
  toggleItem: (value: string) => void;
  type: 'single' | 'multiple';
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

const useAccordion = () => {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error('Accordion components must be used within Accordion');
  return ctx;
};

// Item context
interface AccordionItemContextValue {
  value: string;
  isOpen: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

const useAccordionItem = () => {
  const ctx = useContext(AccordionItemContext);
  if (!ctx) throw new Error('AccordionTrigger/Content must be used within AccordionItem');
  return ctx;
};

// Root
export interface AccordionProps {
  type?: 'single' | 'multiple';
  defaultValue?: string | string[];
  children: React.ReactNode;
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  type = 'single',
  defaultValue,
  children,
  className,
}) => {
  const [openItems, setOpenItems] = useState<string[]>(() => {
    if (!defaultValue) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const toggleItem = useCallback(
    (value: string) => {
      setOpenItems((prev) => {
        if (type === 'single') {
          return prev.includes(value) ? [] : [value];
        }
        return prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value];
      });
    },
    [type],
  );

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem, type }}>
      <div className={cn('divide-y divide-border rounded-lg border border-border', className)}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
};

// Item
export interface AccordionItemProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

export const AccordionItem: React.FC<AccordionItemProps> = ({ value, children, className }) => {
  const { openItems } = useAccordion();
  const baseId = useId();
  const isOpen = openItems.includes(value);

  return (
    <AccordionItemContext.Provider
      value={{
        value,
        isOpen,
        triggerId: `${baseId}-trigger`,
        contentId: `${baseId}-content`,
      }}
    >
      <div className={cn('', className)}>{children}</div>
    </AccordionItemContext.Provider>
  );
};

// Trigger
export interface AccordionTriggerProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionTrigger: React.FC<AccordionTriggerProps> = ({ children, className }) => {
  const { toggleItem } = useAccordion();
  const { value, isOpen, triggerId, contentId } = useAccordionItem();

  return (
    <button
      type="button"
      id={triggerId}
      aria-expanded={isOpen}
      aria-controls={contentId}
      onClick={() => toggleItem(value)}
      className={cn(
        'flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium transition-all',
        'hover:bg-muted/50',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset',
        className,
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          'h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200',
          isOpen && 'rotate-180',
        )}
        aria-hidden="true"
      />
    </button>
  );
};

// Content
export interface AccordionContentProps {
  children: React.ReactNode;
  className?: string;
}

export const AccordionContent: React.FC<AccordionContentProps> = ({ children, className }) => {
  const { isOpen, triggerId, contentId } = useAccordionItem();
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      aria-hidden={!isOpen}
      className={cn(
        'overflow-hidden transition-all duration-200 ease-in-out',
        isOpen ? 'animate-accordion-down' : 'animate-accordion-up',
      )}
      style={{
        height: isOpen ? contentRef.current?.scrollHeight : 0,
      }}
    >
      <div ref={contentRef} className={cn('px-4 pb-4 pt-0 text-sm text-muted-foreground', className)}>
        {children}
      </div>
    </div>
  );
};
