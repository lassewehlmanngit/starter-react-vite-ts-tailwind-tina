import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { SupportedLang } from '@/shared/config/i18n';
import { Seo } from '@/shared/ui/Seo';
import type { BlogPostSummary } from '@/shared/lib/content/types';
import { listBlogPosts } from '@/shared/lib/content/blog';

export interface BlogIndexPageProps {
  lang: SupportedLang;
}

export const BlogIndexPage: React.FC<BlogIndexPageProps> = ({ lang }) => {
  const [posts, setPosts] = useState<BlogPostSummary[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    listBlogPosts(lang)
      .then((items) => {
        if (cancelled) return;
        setPosts(items);
        setError(null);
      })
      .catch((e: unknown) => {
        if (cancelled) return;
        setError(e instanceof Error ? e.message : 'Failed to load blog posts');
        setPosts(null);
      });

    return () => {
      cancelled = true;
    };
  }, [lang]);

  return (
    <div className="container py-12">
      <Seo
        title={lang === 'de' ? 'Blog' : 'Blog'}
        description={lang === 'de' ? 'Artikel und Updates.' : 'Articles and updates.'}
      />
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-semibold">{lang === 'de' ? 'Blog' : 'Blog'}</h1>

        {error ? <p className="mt-4 text-sm text-red-200">{error}</p> : null}

        {!posts ? (
          <p className="mt-4 text-white/70">{lang === 'de' ? 'Laden…' : 'Loading…'}</p>
        ) : posts.length === 0 ? (
          <p className="mt-4 text-white/70">{lang === 'de' ? 'Noch keine Beiträge.' : 'No posts yet.'}</p>
        ) : (
          <ul className="mt-6 space-y-4">
            {posts.map((post) => (
              <li key={post.slug} className="rounded-xl border border-white/10 bg-white/5 p-4">
                <Link to={`/${lang}/blog/${post.slug}`} className="text-lg font-semibold hover:underline">
                  {post.title}
                </Link>
                {post.excerpt ? <p className="mt-2 text-sm text-white/75">{post.excerpt}</p> : null}
                {post.date ? <p className="mt-2 text-xs text-white/60">{post.date}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

