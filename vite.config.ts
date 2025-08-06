// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import { resolve, dirname } from 'node:path'
// import { fileURLToPath } from 'url'
// import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
// import { vuestic } from '@vuestic/compiler/vite'

// // https://vitejs.dev/config/
// export default defineConfig({
//   build: {
//     sourcemap: true,
//   },
//   plugins: [
//     vuestic({
//       devtools: true,
//       cssLayers: true,
//     }),
//     vue(),
//     VueI18nPlugin({
//       include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
//     }),
//   ],
//   resolve: {
//     alias: {
//       '@': resolve(__dirname, './src'), // addedd
//     },
//   },
// })
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve, dirname } from 'node:path'
import { fileURLToPath } from 'url'
import VueI18nPlugin from '@intlify/unplugin-vue-i18n/vite'
import { vuestic } from '@vuestic/compiler/vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  plugins: [
    vuestic({
      devtools: true,
      cssLayers: true,
    }),
    vue(),
    VueI18nPlugin({
      include: resolve(dirname(fileURLToPath(import.meta.url)), './src/i18n/locales/**'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
})
