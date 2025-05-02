/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';

export default defineConfig(() => ({
  root: __dirname,
  cacheDir: './node_modules/.vite/lms-frontend',
  server: {
    port: process.env.APPLICATION_PORT
      ? parseInt(process.env.APPLICATION_PORT)
      : 4200,
    host: process.env.VITE_HOST,
  },

  preview: {
    port: process.env.APPLICATION_PREVIEW_PORT
      ? parseInt(process.env.APPLICATION_PREVIEW_PORT)
      : 4300,
    host: process.env.VITE_HOST,
  },

  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [ nxViteTsPaths() ],
  // },
  build: {
    outDir: './dist/lms-frontend',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
 
}));
