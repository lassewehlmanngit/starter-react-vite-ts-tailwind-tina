import React, { Component, type ErrorInfo, type ReactNode } from 'react';
import { AlertTriangle, Home, RefreshCw } from 'lucide-react';
import { captureException, setErrorContext } from '@/shared/lib/monitoring/sentry';
import { useParams } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';

export interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundaryClass extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    setErrorContext({
      location: window.location.pathname,
      language: document.documentElement.lang || 'en',
      page: window.location.pathname,
      url: window.location.href,
      userAgent: navigator.userAgent,
    });
    captureException(error, {
      location: window.location.pathname,
      language: document.documentElement.lang || 'en',
      page: window.location.pathname,
      url: window.location.href,
    });

    if (this.props.onError) this.props.onError(error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = (): void => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return <ErrorFallback error={this.state.error} onReset={this.handleReset} />;
    }
    return this.props.children;
  }
}

export const ErrorBoundary: React.FC<ErrorBoundaryProps> = (props) => {
  return <ErrorBoundaryClass {...props} />;
};

interface ErrorFallbackProps {
  error: Error | null;
  onReset: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, onReset }) => {
  const { lang } = useParams<{ lang: SupportedLang }>();
  const activeLang: SupportedLang = lang === 'de' || lang === 'en' ? lang : 'en';

  const handleGoHome = (): void => {
    window.location.href = `/${activeLang}`;
  };

  const handleReload = (): void => {
    window.location.reload();
  };

  return (
    <div className="min-h-dvh bg-background text-foreground flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-xl border border-white/10 bg-white/5 p-6 shadow-xl">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-red-500/15 text-red-200">
            <AlertTriangle className="h-6 w-6" aria-hidden="true" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-semibold">
              {activeLang === 'de' ? 'Etwas ist schiefgelaufen' : 'Something went wrong'}
            </h1>
            <p className="mt-1 text-sm text-white/70">
              {activeLang === 'de'
                ? 'Es ist ein unerwarteter Fehler aufgetreten. Bitte versuchen Sie es erneut.'
                : 'An unexpected error occurred. Please try again.'}
            </p>
          </div>
        </div>

        {import.meta.env.DEV && error ? (
          <div className="mt-4 rounded-lg border border-white/10 bg-black/20 p-3">
            <p className="text-xs font-mono text-red-200 break-all">{error.toString()}</p>
          </div>
        ) : null}

        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            onClick={onReset}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            <RefreshCw className="h-5 w-5" aria-hidden="true" />
            {activeLang === 'de' ? 'Erneut versuchen' : 'Try again'}
          </button>

          <button
            type="button"
            onClick={handleGoHome}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/15"
          >
            <Home className="h-5 w-5" aria-hidden="true" />
            {activeLang === 'de' ? 'Startseite' : 'Home'}
          </button>

          <button
            type="button"
            onClick={handleReload}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-lg bg-white/10 px-4 py-3 text-sm font-medium hover:bg-white/15"
          >
            <RefreshCw className="h-5 w-5" aria-hidden="true" />
            {activeLang === 'de' ? 'Neu laden' : 'Reload'}
          </button>
        </div>
      </div>
    </div>
  );
};

