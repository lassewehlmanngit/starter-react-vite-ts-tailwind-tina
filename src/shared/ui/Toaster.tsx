import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Toast } from './Toast';
import { toastStore, type ToastData } from '@/shared/lib/toast';

export interface ToasterProps {
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

const positionClasses: Record<NonNullable<ToasterProps['position']>, string> = {
  'top-right': 'top-4 right-4',
  'top-left': 'top-4 left-4',
  'bottom-right': 'bottom-4 right-4',
  'bottom-left': 'bottom-4 left-4',
  'top-center': 'top-4 left-1/2 -translate-x-1/2',
  'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
};

export const Toaster: React.FC<ToasterProps> = ({ position = 'bottom-right' }) => {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  useEffect(() => {
    const unsubscribe = toastStore.subscribe(setToasts);
    return () => {
      unsubscribe();
    };
  }, []);

  if (toasts.length === 0) return null;

  return createPortal(
    <div
      className={`fixed z-[100] flex flex-col gap-2 ${positionClasses[position]}`}
      aria-label="Notifications"
    >
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>,
    document.body,
  );
};
