import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { readFileSync } from 'node:fs';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss(), {
    name: 'demand-radar-assets',
    generateBundle() {
      const assets: Record<string, string> = {
        'index.html': 'web/browser-index.html', 'app.js': 'web/browser-app.js',
        'style.css': 'web/style.css', 'client.js': 'web/client.js',
        'storage.js': 'web/storage.js', 'engine.js': 'core.mjs',
      };
      for (const [name, source] of Object.entries(assets)) {
        this.emitFile({ type: 'asset', fileName: `radar/${name}`, source: readFileSync(path.resolve(__dirname, 'radar', source), 'utf8') });
      }
    },
  }],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3001,
    proxy: { '/radar': { target: process.env.RADAR_DEV_PROXY_ORIGIN || 'http://127.0.0.1:4320', changeOrigin: true } },
    // Desktop agent editing can temporarily disable HMR to avoid UI flicker.
    hmr: process.env.DISABLE_HMR !== 'true',
  },
});
