import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: '.',
      filename: 'sw.js',
      injectRegister: 'inline',
      manifest: {
        name: 'Kids Learning Hub',
        short_name: 'Kids Hub',
        description: 'Unified React + TypeScript PWA Kids Learning Hub',
        theme_color: '#4cc9f0',
        background_color: '#7209b7',
        display: 'standalone',
        orientation: 'landscape-primary',
        start_url: '/index.html',
        // Custom Apple extensions inside compiled manifest
        // @ts-ignore
        'apple-mobile-web-app-capable': 'yes',
        // @ts-ignore
        'apple-mobile-web-app-status-bar-style': 'black-translucent',
        // @ts-ignore
        'apple-touch-icon': '/assets/icon-192.png',
        icons: [
          {
            src: '/assets/icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: '/assets/icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      },
      injectManifest: {
        injectionPoint: 'self.__WB_MANIFEST',
        // Aggressively cache all resource patterns in dist folder
        globPatterns: ['**/*.{js,css,html,mp3,wav,png,svg,json}']
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    host: true,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  }
});
