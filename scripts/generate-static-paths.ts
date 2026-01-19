import * as fs from 'fs';
import * as path from 'path';

/**
 * Copies the built dist/index.html to language subdirectories (de/index.html, en/index.html).
 * This improves compatibility with static hosts where `/de` and `/en` may map to physical paths.
 */
async function generateStaticPaths() {
  const distDir = path.join(process.cwd(), 'dist');
  const indexHtmlPath = path.join(distDir, 'index.html');
  const languages = ['de', 'en'];

  if (!fs.existsSync(distDir)) {
    console.error('❌ Build directory (dist) not found. Run build first.');
    process.exit(1);
  }

  if (!fs.existsSync(indexHtmlPath)) {
    console.error('❌ dist/index.html not found.');
    process.exit(1);
  }

  console.log('🚀 Generating language entrypoints...');

  for (const lang of languages) {
    const langDir = path.join(distDir, lang);
    fs.mkdirSync(langDir, { recursive: true });
    fs.copyFileSync(indexHtmlPath, path.join(langDir, 'index.html'));
    console.log(`✅ Created: ${lang}/index.html`);
  }
}

const isMainModule = import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith('generate-static-paths.ts');
if (isMainModule) {
  generateStaticPaths().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}

export { generateStaticPaths };

