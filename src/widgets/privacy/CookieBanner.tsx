import React, { useEffect, useState } from 'react';
import type { SupportedLang } from '@/shared/config/i18n';
import { cn } from '@/shared/lib/cn';

type CookieConsent = 'accepted' | 'rejected';

const STORAGE_KEY = 'cookie_consent_v1';

export interface CookieBannerProps {
  lang: SupportedLang;
  className?: string;
}

const setGtagConsent = (consent: CookieConsent): void => {
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void }).gtag;
  if (!gtag) return;

  const analytics_storage = consent === 'accepted' ? 'granted' : 'denied';
  gtag('consent', 'update', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage,
  });
};

export const CookieBanner: React.FC<CookieBannerProps> = ({ lang, className }) => {
  const [consent, setConsent] = useState<CookieConsent | null>(null);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored === 'accepted' || stored === 'rejected') setConsent(stored);
    } catch {
      // ignore
    }
  }, []);

  const updateConsent = (next: CookieConsent): void => {
    setConsent(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      // ignore
    }
    setGtagConsent(next);
  };

  if (consent) return null;

  return (
    <section
      aria-label={lang === 'de' ? 'Cookie-Einstellungen' : 'Cookie preferences'}
      className={cn(
        'fixed inset-x-0 bottom-0 z-50 border-t border-white/10 bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/70',
        className,
      )}
    >
      <div className="container flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-white/80">
          {lang === 'de'
            ? 'Wir verwenden Cookies, um die Nutzung zu messen und die Website zu verbessern. Sie können zustimmen oder ablehnen.'
            : 'We use cookies to measure usage and improve the website. You can accept or reject.'}
        </p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => updateConsent('rejected')}
            className="rounded-lg bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/15"
          >
            {lang === 'de' ? 'Ablehnen' : 'Reject'}
          </button>
          <button
            type="button"
            onClick={() => updateConsent('accepted')}
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90"
          >
            {lang === 'de' ? 'Akzeptieren' : 'Accept'}
          </button>
        </div>
      </div>
    </section>
  );
};

