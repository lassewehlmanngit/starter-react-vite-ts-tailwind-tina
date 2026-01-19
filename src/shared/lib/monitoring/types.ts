export interface MonitoringConfig {
  dsn?: string;
  environment?: string;
  enabled: boolean;
  tracesSampleRate?: number;
}

export interface ErrorContext {
  location: string;
  language: string;
  page: string;
  url?: string;
  userAgent?: string;
}

