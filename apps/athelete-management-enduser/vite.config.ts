/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import path from 'path';

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/athelete-management-enduser',

  server: {
    port: 3334,
    host: 'localhost',
  },

  preview: {
    port: 4333,
    host: 'localhost',
  },

  plugins: [react(), nxViteTsPaths()],

  build: {
    outDir: '../../dist/apps/athelete-management-enduser',
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src/'),
      '@assets': `${path.resolve(__dirname, './src/assets/')}`,
      '@components': `${path.resolve(__dirname, './src/components/')}`,
      '@hooks': `${path.resolve(__dirname, './src/hooks/')}`,
      '@layouts': `${path.resolve(__dirname, './src/layouts/')}`,
      '@pages': `${path.resolve(__dirname, './src/pages/')}`,
      '@routes': `${path.resolve(__dirname, './src/routes/')}`,
      '@store': `${path.resolve(__dirname, './src/store/')}`,
      '@utils': `${path.resolve(__dirname, './src/utils/')}`,
    },
  },
});
