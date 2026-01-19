import * as Sentry from '@sentry/react';
import type { ErrorContext, MonitoringConfig } from './types';

let isInitialized = false;

export const initSentry = (config: MonitoringConfig): void => {
  if (isInitialized || !config.enabled || !config.dsn) return;

  Sentry.init({
    dsn: config.dsn,
    environment: config.environment || 'production',
    integrations: [Sentry.browserTracingIntegration()],
    tracesSampleRate: config.tracesSampleRate ?? 0.1,
    beforeSend(event, hint) {
      const original = hint.originalException;
      if (original instanceof Error) {
        const message = original.message || '';
        if (message.includes('Failed to fetch') || message.includes('NetworkError')) return null;
      }
      return event;
    },
  });

  isInitialized = true;
};

export const setErrorContext = (context: ErrorContext): void => {
  if (!isInitialized) return;

  Sentry.setContext('page', {
    location: context.location,
    language: context.language,
    page: context.page,
    url: context.url || window.location.href,
  });

  if (context.userAgent) {
    Sentry.setContext('browser', { userAgent: context.userAgent });
  }
};

export const captureException = (error: Error, context?: ErrorContext): void => {
  if (!isInitialized) {
    // Always keep a signal in dev, but avoid noisy logs in prod.
    if (import.meta.env.DEV) console.error('[Sentry not initialized]', error);
    return;
  }

  if (context) setErrorContext(context);
  Sentry.captureException(error);
};

