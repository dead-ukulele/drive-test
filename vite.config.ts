import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import * as path from 'node:path'

export default defineConfig({
  base: process.env.VITE_BASE ?? '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [vue(), tailwindcss()],
})
