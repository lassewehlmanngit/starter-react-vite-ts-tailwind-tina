import { defineConfig } from 'tinacms';

const branch =
  process.env.GITHUB_BRANCH ||
  process.env.RENDER_GIT_BRANCH ||
  process.env.VERCEL_GIT_COMMIT_REF ||
  process.env.HEAD ||
  'main';

/**
 * Starter defaults:
 * - Local Mode works with clientId/token = null.
 * - For Tina Cloud, set env vars (see .env.example / README).
 */
const clientId = process.env.TINA_PUBLIC_CLIENT_ID || process.env.VITE_TINA_CLIENT_ID || null;
const token = process.env.TINA_TOKEN || process.env.VITE_TINA_TOKEN || null;

export default defineConfig({
  branch,
  clientId,
  token,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      publicFolder: 'public',
      mediaRoot: 'uploads',
    },
  },
  schema: {
    collections: [
      {
        name: 'page',
        label: 'Pages',
        path: 'content/pages',
        format: 'md',
        ui: {
          filename: {
            slugify: (values) => {
              const raw = typeof values?.title === 'string' ? values.title : 'page';
              return raw
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            },
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
          },
          {
            type: 'image',
            name: 'featuredImage',
            label: 'Featured Image',
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
            description: 'If enabled, this page will not be published',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
      {
        name: 'post',
        label: 'Blog',
        path: 'content/blog',
        format: 'md',
        ui: {
          filename: {
            slugify: (values) => {
              const raw = typeof values?.title === 'string' ? values.title : 'post';
              return raw
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)/g, '');
            },
          },
        },
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'string',
            name: 'excerpt',
            label: 'Excerpt',
            ui: {
              component: 'textarea',
            },
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Publish Date',
            required: true,
          },
          {
            type: 'string',
            name: 'description',
            label: 'SEO Description',
          },
          {
            type: 'image',
            name: 'featuredImage',
            label: 'Featured Image',
          },
          {
            type: 'object',
            name: 'author',
            label: 'Author',
            fields: [
              { type: 'string', name: 'name', label: 'Name', required: true },
              { type: 'string', name: 'title', label: 'Title' },
              { type: 'image', name: 'avatar', label: 'Avatar' },
            ],
          },
          {
            type: 'string',
            name: 'tags',
            label: 'Tags',
            list: true,
            ui: {
              component: 'tags',
            },
          },
          {
            type: 'string',
            name: 'category',
            label: 'Category',
            options: [
              { value: 'news', label: 'News' },
              { value: 'tutorial', label: 'Tutorial' },
              { value: 'case-study', label: 'Case Study' },
              { value: 'announcement', label: 'Announcement' },
            ],
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Draft',
            description: 'If enabled, this post will not be published',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
      // Globals: navigation
      {
        name: 'navigation',
        label: 'Navigation',
        path: 'content/globals',
        format: 'json',
        match: {
          include: '**/navigation',
        },
        fields: [
          {
            type: 'string',
            name: 'logo',
            label: 'Logo Path',
          },
          {
            type: 'object',
            name: 'items',
            label: 'Nav Items',
            list: true,
            fields: [
              { type: 'string', name: 'label', label: 'Label', required: true },
              { type: 'string', name: 'href', label: 'Link', required: true },
            ],
          },
        ],
      },
      // Globals: footer
      {
        name: 'footer',
        label: 'Footer',
        path: 'content/globals',
        format: 'json',
        match: {
          include: '**/footer',
        },
        fields: [
          {
            type: 'string',
            name: 'copyright',
            label: 'Copyright Text',
          },
          {
            type: 'object',
            name: 'links',
            label: 'Footer Links',
            list: true,
            fields: [
              { type: 'string', name: 'label', label: 'Label', required: true },
              { type: 'string', name: 'href', label: 'Link', required: true },
            ],
          },
          {
            type: 'object',
            name: 'social',
            label: 'Social Links',
            list: true,
            fields: [
              { type: 'string', name: 'platform', label: 'Platform', required: true },
              { type: 'string', name: 'url', label: 'URL', required: true },
            ],
          },
        ],
      },
      // Globals: settings
      {
        name: 'settings',
        label: 'Site Settings',
        path: 'content/globals',
        format: 'json',
        match: {
          include: '**/settings',
        },
        fields: [
          { type: 'string', name: 'siteName', label: 'Site Name', required: true },
          { type: 'string', name: 'siteDescription', label: 'Site Description' },
          { type: 'string', name: 'defaultOgImage', label: 'Default OG Image' },
          { type: 'string', name: 'gtmId', label: 'GTM ID' },
          { type: 'string', name: 'sentryDsn', label: 'Sentry DSN' },
        ],
      },
    ],
  },
});

