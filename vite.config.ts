import { defineConfig } from 'vite'
import solidPlugin from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    solidPlugin(),
    VitePWA({
      includeManifestIcons: true,
      manifest: {
        name: 'Whatsapp Yottabyte Message and Chat Analyser',
        short_name: 'WhYMCA',
        description: 'WhYMCA (Whatsapp Yottabyte Message and Chat Analyser) reads Whatsapp chat exports and gives you plenty of options to analyse the results',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        'categories': ['whatsapp', 'chat', 'conversion'],
        icons: [
          {
            src: 'favicon-152.png',
            sizes: '152x152',
            type: 'image/png',
          },
          {
            src: 'favicon-167.png',
            sizes: '167x167',
            type: 'image/png',
          },
          {
            src: 'favicon-180.png',
            sizes: '180x180',
            type: 'image/png',
          },
          {
            src: 'favicon-196.png',
            sizes: '196x196',
            type: 'image/png',
          },
          {
            src: 'favicon.svg',
            sizes: 'any',
            purpose: 'any maskable',
          }
        ]
      }
    }),
  ],
  build: {
    target: 'esnext',
    polyfillDynamicImport: false,
  },
});
