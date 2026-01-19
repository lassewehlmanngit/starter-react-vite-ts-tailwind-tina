# Marketing Site Starter (React + Vite + TypeScript + Tailwind + TinaCMS)

A production-ready starter for content-driven marketing and service websites.

## Features

- **React 18** with TypeScript
- **Vite 6** for fast builds and HMR
- **Tailwind CSS 3.4** with semantic design tokens
- **TinaCMS** (Tina Cloud) for visual content editing
- **React Router v6** with language-prefixed routes (`/:lang/*`)
- **react-i18next** for internationalization (DE/EN out of the box)
- **react-helmet-async** for SEO meta tags
- **Sentry** integration for error monitoring
- **Vitest + Playwright** for unit and E2E testing
- **Render Static Site** deployment ready

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Copy environment file
cp env.example .env.local

# 3. Start development server (with TinaCMS local mode)
npm run dev

# 4. Open http://localhost:3000
#    TinaCMS admin: http://localhost:3000/admin/index.html
```

## Project Structure

```
├── content/              # Markdown/JSON content (Tina-managed)
│   ├── pages/{lang}/     # Page content by language
│   ├── blog/{lang}/      # Blog posts by language
│   └── globals/{lang}/   # Navigation, footer, settings
├── public/               # Static assets
│   └── locales/{lang}/   # i18n translation files
├── scripts/              # Build scripts (sitemap, robots, static paths)
├── src/
│   ├── app/              # App shell, providers, router
│   ├── features/         # Feature modules (location, contact)
│   ├── pages/            # Route-level page components
│   ├── shared/           # Shared utilities, UI, config
│   └── widgets/          # Layout components (header, footer, cookie)
├── tests/                # Vitest + Playwright tests
└── tina/                 # TinaCMS configuration
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with TinaCMS |
| `npm run dev:vite` | Start Vite only (no Tina) |
| `npm run build` | Production build (requires Tina Cloud credentials) |
| `npm run build:local` | Production build without Tina Cloud |
| `npm run preview` | Preview production build |
| `npm run test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |

## Content Management

### Local Development (No Auth)

In local mode, TinaCMS runs without authentication. Edit content at `/admin/index.html` and changes are saved directly to your `content/` folder.

### Production (Tina Cloud)

1. Create a project at [app.tina.io](https://app.tina.io)
2. Connect your GitHub repository
3. Add `TINA_CLIENT_ID` and `TINA_TOKEN` to your environment
4. Deploy — editors can now use the visual editor

## Adding Content

### New Page

1. Create `content/pages/{lang}/{slug}.md` with frontmatter:

```markdown
---
title: "Page Title"
description: "SEO description"
---

Your content here...
```

2. Add route in `src/app/router/AppRouter.tsx` if needed

### New Blog Post

Create `content/blog/{lang}/{slug}.md`:

```markdown
---
title: "Post Title"
description: "Post excerpt"
date: "2026-01-15"
author: "Your Name"
tags: ["tag1", "tag2"]
---

Post content...
```

## Deployment on Render

### Static Site Setup

1. Create a new **Static Site** on [render.com](https://render.com)
2. Connect your repository
3. Configure:
   - **Build Command**: `npm ci && npm run build`
   - **Publish Directory**: `dist`
4. Add environment variables from `env.example`
5. Add rewrite rule for SPA routing:
   - Source: `/*`
   - Destination: `/index.html`
   - Action: Rewrite

### Environment Variables

Required for production:

| Variable | Description |
|----------|-------------|
| `VITE_BASE_URL` | Your site's public URL |
| `TINA_CLIENT_ID` | Tina Cloud client ID |
| `TINA_TOKEN` | Tina Cloud read-only token |

Optional:

| Variable | Description |
|----------|-------------|
| `VITE_SENTRY_DSN` | Sentry error tracking |
| `VITE_GTM_ID` | Google Tag Manager |

## Design System

### CSS Variables (Tokens)

Defined in `src/shared/styles/tokens.css`:

```css
:root {
  --background: 0 0% 100%;
  --foreground: 222.2 84% 4.9%;
  --primary: 221.2 83.2% 53.3%;
  --primary-foreground: 210 40% 98%;
  /* ... */
}
```

### Tailwind Usage

```tsx
<div className="bg-background text-foreground">
  <button className="bg-primary text-primary-foreground">
    Click me
  </button>
</div>
```

### cn() Helper

Merge Tailwind classes safely:

```tsx
import { cn } from '@/shared/lib/cn';

<div className={cn('base-class', conditional && 'conditional-class')} />
```

## Internationalization

### Adding a Language

1. Add locale files in `public/locales/{lang}/`
2. Add content in `content/pages/{lang}/`
3. Update `SUPPORTED_LANGS` in `src/shared/config/i18n.ts`
4. Update `languages` array in build scripts

### Using Translations

```tsx
import { useTranslation } from 'react-i18next';

function Component() {
  const { t } = useTranslation('common');
  return <h1>{t('welcome')}</h1>;
}
```

## License

MIT
