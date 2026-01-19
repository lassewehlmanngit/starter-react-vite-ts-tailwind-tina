import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { ErrorBoundary } from './ErrorBoundary';
import { ContactProvider } from '@/features/contact/ContactProvider';

export interface AppProvidersProps {
  children: React.ReactNode;
}

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <ErrorBoundary>
      <HelmetProvider>
        <ContactProvider>{children}</ContactProvider>
      </HelmetProvider>
    </ErrorBoundary>
  );
};

