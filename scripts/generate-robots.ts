import * as fs from 'fs';
import * as path from 'path';

async function generateRobots() {
  const baseUrl = process.env.VITE_BASE_URL || 'https://example.com';
  const outputPath = path.join(process.cwd(), 'public', 'robots.txt');
  const sitemapUrl = `${baseUrl}/sitemap.xml`;

  const isProduction = process.env.NODE_ENV === 'production';

  const robotsContent = isProduction
    ? `# robots.txt for ${baseUrl}
User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/

# Sitemap
Sitemap: ${sitemapUrl}
`
    : `# robots.txt for ${baseUrl} (Development/Staging)
User-agent: *
Disallow: /

# Sitemap
Sitemap: ${sitemapUrl}
`;

  fs.writeFileSync(outputPath, robotsContent, 'utf-8');
  console.log(`✅ robots.txt generated: ${outputPath}`);
}

const isMainModule = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-robots.ts');
if (isMainModule) {
  generateRobots().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { generateRobots };

