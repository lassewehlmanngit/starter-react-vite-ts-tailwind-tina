import React from 'react';
import { useTranslation } from 'react-i18next';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { ButtonLink } from '@/shared/ui/ButtonLink';

export interface HomePageProps {
  lang: SupportedLang;
}

export const HomePage: React.FC<HomePageProps> = ({ lang }) => {
  const { t } = useTranslation('common');

  return (
    <div className="container py-12">
      <Seo
        title={lang === 'de' ? 'Startseite' : 'Home'}
        description={
          lang === 'de'
            ? 'Ein Starter für Marketing-Websites: React, Vite, TypeScript, Tailwind und TinaCMS.'
            : 'A production-ready starter for marketing websites: React, Vite, TypeScript, Tailwind, and TinaCMS.'
        }
      />

      <div className="mx-auto max-w-3xl">
        <p className="text-sm font-medium text-white/70">{t('brandTagline')}</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          {lang === 'de' ? 'Marketing Site Starter' : 'Marketing Site Starter'}
        </h1>
        <p className="mt-4 text-lg leading-relaxed text-white/80">
          {lang === 'de'
            ? 'Diese Seite ist absichtlich minimal: Inhalte kommen aus TinaCMS und werden bei Bedarf erweitert.'
            : 'This page is intentionally minimal: content comes from TinaCMS and can be extended as needed.'}
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <ButtonLink to={`/${lang}/about`} variant="primary">
            {lang === 'de' ? 'Beispielseite ansehen' : 'View example page'}
          </ButtonLink>
          <ButtonLink to={`/${lang}/blog`} variant="secondary">
            {lang === 'de' ? 'Zum Blog' : 'Go to blog'}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
};

