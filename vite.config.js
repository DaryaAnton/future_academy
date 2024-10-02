import { resolve } from 'path';
import { defineConfig } from 'vite';
import legacy from '@vitejs/plugin-legacy';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

const root = resolve(__dirname, 'src');
const outDir = resolve(__dirname, 'dist');

const pages = {
  index: resolve(root, 'index.html'),
  about: resolve(root, 'about/about.html'),
};

export default defineConfig({
  root,
  base: './',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11'],
    }),
    ViteImageOptimizer({
      png: {
        quality: 70,
      },
      jpeg: {
        quality: 70,
      },
      jpg: {
        quality: 70,
      },
    }),
  ],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        ...pages,
      },
      output: {
        assetFileNames: ({ name }) => {
          name = name.toLowerCase();

          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? '')) {
            return 'assets/images/[name]-[hash][extname]';
          }

          if (/\.css$/.test(name ?? '')) {
            return 'assets/styles/[name]-[hash][extname]';
          }

          return 'assets/[name]-[hash][extname]';
        },
      },
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src'),
      },
      {
        find: '~bootstrap',
        replacement: resolve(__dirname, 'node_modules/bootstrap'),
      },
    ],
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  server: {
    port: 8080,
    hot: true,
    strictPort: true,
    host: true,
    origin: 'http://0.0.0.0:8080',
  },
});
