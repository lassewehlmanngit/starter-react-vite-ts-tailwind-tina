import React from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLang } from '@/shared/config/i18n';
import { SiteHeader } from '@/widgets/navigation/SiteHeader';
import { SiteFooter } from '@/widgets/navigation/SiteFooter';
import { CookieBanner } from '@/widgets/privacy/CookieBanner';
import { Toaster } from '@/shared/ui/Toaster';

export interface MarketingLayoutProps {
  lang: SupportedLang;
  children: React.ReactNode;
}

export const MarketingLayout: React.FC<MarketingLayoutProps> = ({ lang, children }) => {
  const { t } = useTranslation('common');

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-primary-foreground"
      >
        {t('navigation.skipToContent')}
      </a>

      <SiteHeader lang={lang} />

      <main id="main-content" className="min-h-[60dvh]">
        {children}
      </main>

      <SiteFooter lang={lang} />
      <CookieBanner lang={lang} />
      <Toaster />
    </div>
  );
};

