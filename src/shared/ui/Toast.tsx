import React from 'react';
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from 'lucide-react';
import { cn } from '@/shared/lib/cn';
import type { ToastData, ToastType } from '@/shared/lib/toast';
import { toast as toastFn } from '@/shared/lib/toast';

const icons: Record<ToastType, React.ReactNode> = {
  default: <Info className="h-5 w-5" />,
  success: <CheckCircle className="h-5 w-5" />,
  error: <AlertCircle className="h-5 w-5" />,
  warning: <AlertTriangle className="h-5 w-5" />,
};

const typeClasses: Record<ToastType, string> = {
  default: 'border-border bg-background text-foreground',
  success: 'border-success/30 bg-success/10 text-success',
  error: 'border-destructive/30 bg-destructive/10 text-destructive',
  warning: 'border-warning/30 bg-warning/10 text-warning',
};

export interface ToastProps {
  toast: ToastData;
}

export const Toast: React.FC<ToastProps> = ({ toast }) => {
  return (
    <div
      role="alert"
      aria-live="polite"
      className={cn(
        'pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-lg border p-4 shadow-lg',
        'animate-in slide-in-from-right-full duration-300',
        typeClasses[toast.type],
      )}
    >
      <span className="flex-shrink-0" aria-hidden="true">
        {icons[toast.type]}
      </span>
      <div className="flex-1 space-y-1">
        <p className="text-sm font-medium">{toast.title}</p>
        {toast.description && (
          <p className="text-sm opacity-80">{toast.description}</p>
        )}
      </div>
      <button
        type="button"
        onClick={() => toastFn.dismiss(toast.id)}
        className="flex-shrink-0 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        aria-label="Dismiss"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
};
