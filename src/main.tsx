import '@fontsource/inter/latin.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './app/App';
import './shared/styles/globals.css';
import './shared/config/i18n';
import { initSentry } from './shared/lib/monitoring/sentry';

const sentryDsn = import.meta.env.VITE_SENTRY_DSN as string | undefined;
const environment = (import.meta.env.VITE_ENVIRONMENT || import.meta.env.MODE || 'development') as string;

if (sentryDsn) {
  initSentry({
    dsn: sentryDsn,
    environment,
    enabled: true,
    tracesSampleRate: environment === 'production' ? 0.1 : 1.0,
  });
}

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Root element #root not found');

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
