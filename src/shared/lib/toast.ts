export type ToastType = 'default' | 'success' | 'error' | 'warning';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
}

type ToastListener = (toasts: ToastData[]) => void;

class ToastStore {
  private toasts: ToastData[] = [];
  private listeners: Set<ToastListener> = new Set();
  private counter = 0;

  subscribe(listener: ToastListener) {
    this.listeners.add(listener);
    listener(this.toasts);
    return () => this.listeners.delete(listener);
  }

  private notify() {
    this.listeners.forEach((listener) => listener(this.toasts));
  }

  add(toast: Omit<ToastData, 'id'>) {
    const id = `toast-${++this.counter}`;
    const newToast: ToastData = { ...toast, id };
    this.toasts = [...this.toasts, newToast];
    this.notify();

    // Auto dismiss
    const duration = toast.duration ?? 5000;
    if (duration > 0) {
      setTimeout(() => this.dismiss(id), duration);
    }

    return id;
  }

  dismiss(id: string) {
    this.toasts = this.toasts.filter((t) => t.id !== id);
    this.notify();
  }

  dismissAll() {
    this.toasts = [];
    this.notify();
  }
}

export const toastStore = new ToastStore();

// Convenience functions
export const toast = (title: string, options?: Partial<Omit<ToastData, 'id' | 'title'>>) => {
  return toastStore.add({ title, type: 'default', ...options });
};

toast.success = (title: string, options?: Partial<Omit<ToastData, 'id' | 'title' | 'type'>>) => {
  return toastStore.add({ title, type: 'success', ...options });
};

toast.error = (title: string, options?: Partial<Omit<ToastData, 'id' | 'title' | 'type'>>) => {
  return toastStore.add({ title, type: 'error', ...options });
};

toast.warning = (title: string, options?: Partial<Omit<ToastData, 'id' | 'title' | 'type'>>) => {
  return toastStore.add({ title, type: 'warning', ...options });
};

toast.dismiss = (id: string) => toastStore.dismiss(id);
toast.dismissAll = () => toastStore.dismissAll();
