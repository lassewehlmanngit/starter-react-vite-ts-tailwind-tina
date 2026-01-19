import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { imagetools } from 'vite-imagetools';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
    },
    plugins: [
      react(),
      imagetools({
        defaultDirectives: (url) => {
          if (url.searchParams.has('avif')) return new URLSearchParams('format=avif');
          if (url.searchParams.has('webp')) return new URLSearchParams('format=webp');
          return new URLSearchParams('format=webp;quality=80');
        },
      }),
    ],
    // Serve content/ folder as static assets during dev
    publicDir: 'public',
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@content': path.resolve(__dirname, 'content'),
      },
    },
    define: {
      __APP_ENV__: JSON.stringify(env.VITE_ENVIRONMENT || mode),
    },
    build: {
      chunkSizeWarningLimit: 500,
      sourcemap: true,
      // Copy content/ to dist so it's available at runtime
      copyPublicDir: true,
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom'],
            'vendor-router': ['react-router-dom'],
            'vendor-i18n': ['i18next', 'react-i18next', 'i18next-browser-languagedetector', 'i18next-http-backend'],
            'vendor-ui': ['lucide-react'],
            'vendor-helmet': ['react-helmet-async'],
            'vendor-markdown': ['react-markdown'],
          },
        },
      },
    },
  };
});
