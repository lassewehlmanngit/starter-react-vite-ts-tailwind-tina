import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import { Markdown } from '@/shared/ui/Markdown';
import type { BlogPost } from '@/shared/lib/content/types';
import { loadBlogPostBySlug } from '@/shared/lib/content/blog';

export interface BlogPostPageProps {
  lang: SupportedLang;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({ lang }) => {
  const { slug } = useParams<{ slug: string }>();
  const normalizedSlug = useMemo(() => (slug ? slug.trim() : ''), [slug]);
  const [post, setPost] = useState<BlogPost | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    if (!normalizedSlug) {
      setError('Missing slug');
      setPost(null);
      return;
    }

    loadBlogPostBySlug(lang, normalizedSlug)
      .then((data) => {
        if (cancelled) return;
        setPost(data);
        setError(null);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load blog post');
        setPost(null);
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

  if (!post) {
    return (
      <div className="container py-12">
        <p className="text-white/70">{lang === 'de' ? 'Laden…' : 'Loading…'}</p>
      </div>
    );
  }

  return (
    <div className="container py-12">
      <Seo title={post.meta.title} description={post.meta.excerpt || post.meta.description} />
      <article className="prose prose-invert mx-auto max-w-3xl">
        <h1>{post.meta.title}</h1>
        {post.meta.date ? <p className="text-sm text-white/60">{post.meta.date}</p> : null}
        <Markdown>{post.body}</Markdown>
      </article>
    </div>
  );
};

