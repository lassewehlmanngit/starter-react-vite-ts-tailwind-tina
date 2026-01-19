import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Markdown } from '@/shared/ui/Markdown';
import type { ContentPage } from '@/shared/lib/content/types';
import { loadPageBySlug } from '@/shared/lib/content/pages';

export interface GenericPageProps {
  lang: SupportedLang;
}

export const GenericPage: React.FC<GenericPageProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const normalizedSlug = useMemo(() => (slug && slug.trim().length > 0 ? slug.trim() : 'home'), [slug]);

  const [page, setPage] = useState<ContentPage | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    loadPageBySlug(lang, normalizedSlug)
      .then((data) => {
        if (cancelled) return;
        setPage(data);
        setError(null);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        const message = e instanceof Error ? e.message : 'Failed to load page';
        setError(message);
        setPage(null);
      });

    return () => {
      cancelled = true;
    };
  }, [lang, normalizedSlug]);

  if (error) {
    return (
      <div className="container py-12">
        <Seo title="Not found" />
        <h1 className="text-2xl font-semibold">{lang === 'de' ? 'Nicht gefunden' : 'Not found'}</h1>
        <p className="mt-2 text-white/75">{error}</p>
      </div>
    );
  }

  if (!page) {
    return (
      <div className="container py-12">
        <p className="text-white/70">{lang === 'de' ? 'Laden…' : 'Loading…'}</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Seo title={page.meta.title} description={page.meta.description} />
      <article className="prose prose-invert max-w-3xl">
        <h1>{page.meta.title}</h1>
        <Markdown>{page.body}</Markdown>
      </article>
    </div>
  );
};

