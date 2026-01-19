import frontMatter from 'front-matter';
import type { SupportedLang } from '@/shared/config/i18n';
import type { ContentPage, PageMeta } from './types';

type FrontMatterAttributes = Partial<PageMeta> & Record<string, unknown>;

const pageModules = import.meta.glob('../../../../content/pages/*/*.md', { as: 'raw' });

const getPageKeyCandidates = (lang: SupportedLang, slug: string): string[] => {
  const safeSlug = slug.trim().toLowerCase();
  return [
    `../../../../content/pages/${lang}/${safeSlug}.md`,
    `../../../../content/pages/${lang}/${safeSlug}/index.md`,
  ];
};

export async function loadPageBySlug(lang: SupportedLang, slug: string): Promise<ContentPage> {
  const candidates = getPageKeyCandidates(lang, slug);
  const key = candidates.find((k) => Object.prototype.hasOwnProperty.call(pageModules, k));

  if (!key) {
    throw new Error(`Page not found: ${lang}/${slug}`);
  }

  const loader = pageModules[key];
  const raw = await loader();
  const parsed = frontMatter<FrontMatterAttributes>(raw);

  const title = typeof parsed.attributes.title === 'string' ? parsed.attributes.title : slug;
  const description = typeof parsed.attributes.description === 'string' ? parsed.attributes.description : undefined;

  return {
    slug,
    lang,
    meta: {
      title,
      description,
    },
    body: parsed.body,
  };
}

