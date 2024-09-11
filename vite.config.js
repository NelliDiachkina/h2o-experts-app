import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import FullReload from 'vite-plugin-full-reload';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

export default defineConfig(({ command }) => {
  return {
    define: {
      [command === 'serve' ? 'global' : '_global']: {},
    },
    build: {
      sourcemap: true,
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return 'vendor';
            }
          },
          entryFileNames: '[name].[hash].js', // Унікальні імена для точок входу
          chunkFileNames: '[name].[hash].js', // Унікальні імена для чанків
        },
      },
      outDir: 'dist',
    },
    plugins: [
      react(),
      FullReload(['./src/**/*.{jsx,tsx,css}']),
      ViteImageOptimizer({
        exclude: /^sprite.svg$/,
        png: {
          quality: 60,
        },
        jpeg: {
          quality: 60,
        },
        jpg: {
          quality: 60,
        },
        webp: {
          quality: 60,
        },
      }),
    ],
    base: '/',
    resolve: {
      alias: {
        src: '/src',
        components: '/src/components',
        pages: '/src/pages',
        assets: '/src/assets',
      },
    },
  };
});
