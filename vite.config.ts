import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import * as path from 'path'
// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [vue(), eslintPlugin({ cache: false })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      broliSize: false,
      chunkSizeWarningLimit: 4000
    },
    base: '/echart-practice/'
  }
})
