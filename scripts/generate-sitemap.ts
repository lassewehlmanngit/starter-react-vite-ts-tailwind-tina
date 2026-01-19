import * as fs from 'fs';
import * as path from 'path';

interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const LANGS = ['de', 'en'] as const;

const scanMarkdownSlugs = (dir: string): string[] => {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const slugs: string[] = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      slugs.push(...scanMarkdownSlugs(fullPath));
      continue;
    }

    if (!entry.isFile()) continue;
    if (!entry.name.endsWith('.md')) continue;

    const slug = entry.name.replace(/\.md$/, '');
    // home is handled as `/${lang}`
    if (slug === 'home' || slug === 'index') continue;
    slugs.push(slug);
  }

  return slugs;
};

async function generateSitemap() {
  const baseUrl = process.env.VITE_BASE_URL || 'https://example.com';
  const contentDir = path.join(process.cwd(), 'content');
  const outputPath = path.join(process.cwd(), 'public', 'sitemap.xml');

  const urls: SitemapUrl[] = [];

  for (const lang of LANGS) {
    urls.push({
      loc: `${baseUrl}/${lang}`,
      changefreq: 'daily',
      priority: 1.0,
    });

    const pagesDir = path.join(contentDir, 'pages', lang);
    const pageSlugs = scanMarkdownSlugs(pagesDir);
    for (const slug of pageSlugs) {
      urls.push({
        loc: `${baseUrl}/${lang}/${slug}`,
        changefreq: 'weekly',
        priority: 0.8,
      });
    }

    const blogDir = path.join(contentDir, 'blog', lang);
    const blogSlugs = scanMarkdownSlugs(blogDir);
    for (const slug of blogSlugs) {
      urls.push({
        loc: `${baseUrl}/${lang}/blog/${slug}`,
        changefreq: 'monthly',
        priority: 0.6,
      });
    }
  }

  const now = new Date().toISOString().split('T')[0];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (url) => `  <url>
    <loc>${url.loc}</loc>
    <lastmod>${url.lastmod || now}</lastmod>
    <changefreq>${url.changefreq || 'weekly'}</changefreq>
    <priority>${url.priority ?? 0.5}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>`;

  fs.writeFileSync(outputPath, xml, 'utf-8');
  console.log(`✅ Sitemap generated: ${urls.length} URLs written to ${outputPath}`);
}

const isMainModule = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-sitemap.ts');
if (isMainModule) {
  generateSitemap().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { generateSitemap };

