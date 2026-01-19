import frontMatter from 'front-matter';
import type { SupportedLang } from '@/shared/config/i18n';
import type { BlogPost, BlogPostMeta, BlogPostSummary } from './types';

type FrontMatterAttributes = Partial<BlogPostMeta> & Record<string, unknown>;

const blogModules = import.meta.glob('../../../../content/blog/*/*.md', { as: 'raw' });

const toSlug = (path: string): { lang: string; slug: string } | null => {
  const match = path.match(/content\/blog\/([^/]+)\/([^/]+)\.md$/);
  if (!match) return null;
  return { lang: match[1] || '', slug: match[2] || '' };
};

const compareDatesDesc = (a?: string, b?: string): number => {
  if (!a && !b) return 0;
  if (!a) return 1;
  if (!b) return -1;
  return b.localeCompare(a);
};

export async function listBlogPosts(lang: SupportedLang): Promise<BlogPostSummary[]> {
  const entries = Object.keys(blogModules)
    .map((key) => ({ key, parsed: toSlug(key) }))
    .filter((x): x is { key: string; parsed: { lang: string; slug: string } } => Boolean(x.parsed))
    .filter((x) => x.parsed.lang === lang);

  const summaries = await Promise.all(
    entries.map(async ({ key, parsed }) => {
      const loader = blogModules[key];
      const raw = await loader();
      const fm = frontMatter<FrontMatterAttributes>(raw);
      const title = typeof fm.attributes.title === 'string' ? fm.attributes.title : parsed.slug;
      const excerpt = typeof fm.attributes.excerpt === 'string' ? fm.attributes.excerpt : undefined;
      const date = typeof fm.attributes.date === 'string' ? fm.attributes.date : undefined;

      const summary: BlogPostSummary = {
        slug: parsed.slug,
        title,
        excerpt,
        date,
      };

      return summary;
    }),
  );

  return summaries.sort((a, b) => compareDatesDesc(a.date, b.date));
}

export async function loadBlogPostBySlug(lang: SupportedLang, slug: string): Promise<BlogPost> {
  const safeSlug = slug.trim().toLowerCase();
  const key = `../../../../content/blog/${lang}/${safeSlug}.md`;
  const loader = blogModules[key];
  if (!loader) throw new Error(`Blog post not found: ${lang}/${slug}`);

  const raw = await loader();
  const fm = frontMatter<FrontMatterAttributes>(raw);

  const title = typeof fm.attributes.title === 'string' ? fm.attributes.title : slug;
  const description = typeof fm.attributes.description === 'string' ? fm.attributes.description : undefined;
  const excerpt = typeof fm.attributes.excerpt === 'string' ? fm.attributes.excerpt : undefined;
  const date = typeof fm.attributes.date === 'string' ? fm.attributes.date : undefined;

  return {
    slug,
    lang,
    meta: { title, description, excerpt, date },
    body: fm.body,
  };
}

