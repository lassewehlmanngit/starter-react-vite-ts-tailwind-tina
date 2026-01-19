// tina/config.ts
import { defineConfig } from "tinacms";
var branch = process.env.GITHUB_BRANCH || process.env.RENDER_GIT_BRANCH || process.env.VERCEL_GIT_COMMIT_REF || process.env.HEAD || "main";
var clientId = process.env.TINA_PUBLIC_CLIENT_ID || process.env.VITE_TINA_CLIENT_ID || null;
var token = process.env.TINA_TOKEN || process.env.VITE_TINA_TOKEN || null;
var config_default = defineConfig({
  branch,
  clientId,
  token,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads"
    }
  },
  schema: {
    collections: [
      {
        name: "page",
        label: "Pages",
        path: "content/pages",
        format: "md",
        ui: {
          filename: {
            slugify: (values) => {
              const raw = typeof values?.title === "string" ? values.title : "page";
              return raw.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
            }
          }
        },
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      {
        name: "post",
        label: "Blog",
        path: "content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true
          },
          {
            type: "string",
            name: "excerpt",
            label: "Excerpt"
          },
          {
            type: "datetime",
            name: "date",
            label: "Date"
          },
          {
            type: "string",
            name: "description",
            label: "Description"
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true
          }
        ]
      },
      // Globals: navigation
      {
        name: "navigation",
        label: "Navigation",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/navigation"
        },
        fields: [
          {
            type: "string",
            name: "logo",
            label: "Logo Path"
          },
          {
            type: "object",
            name: "items",
            label: "Nav Items",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "Link", required: true }
            ]
          }
        ]
      },
      // Globals: footer
      {
        name: "footer",
        label: "Footer",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/footer"
        },
        fields: [
          {
            type: "string",
            name: "copyright",
            label: "Copyright Text"
          },
          {
            type: "object",
            name: "links",
            label: "Footer Links",
            list: true,
            fields: [
              { type: "string", name: "label", label: "Label", required: true },
              { type: "string", name: "href", label: "Link", required: true }
            ]
          },
          {
            type: "object",
            name: "social",
            label: "Social Links",
            list: true,
            fields: [
              { type: "string", name: "platform", label: "Platform", required: true },
              { type: "string", name: "url", label: "URL", required: true }
            ]
          }
        ]
      },
      // Globals: settings
      {
        name: "settings",
        label: "Site Settings",
        path: "content/globals",
        format: "json",
        match: {
          include: "**/settings"
        },
        fields: [
          { type: "string", name: "siteName", label: "Site Name", required: true },
          { type: "string", name: "siteDescription", label: "Site Description" },
          { type: "string", name: "defaultOgImage", label: "Default OG Image" },
          { type: "string", name: "gtmId", label: "GTM ID" },
          { type: "string", name: "sentryDsn", label: "Sentry DSN" }
        ]
      }
    ]
  }
});
export {
  config_default as default
};
