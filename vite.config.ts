import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      includeAssets: ['robots.txt'],//, 'favicon.svg', 'favicon.ico', 'apple-touch-icon.png'],
      manifest: {
        name: 'Whatsapp Yottabyte Message and Chat Analyser',
        short_name: 'WhYMCA',
        description: 'WhYMCA (Whatsapp Yottabyte Message and Chat Analyser) reads Whatsapp chat exports and gives you plenty of options to analyse the results',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        // icons: [
        //   {
        //     src: 'pwa-192x192.png',
        //     sizes: '192x192',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //   },
        //   {
        //     src: 'pwa-512x512.png',
        //     sizes: '512x512',
        //     type: 'image/png',
        //     purpose: 'any maskable',
        //   }
        // ]
      }
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
