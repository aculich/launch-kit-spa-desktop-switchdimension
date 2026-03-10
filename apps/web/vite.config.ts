import path from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  envDir: path.resolve(__dirname, '../..'),
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5167,
    host: '127.0.0.1',
    allowedHosts: ['launchkit.localhost'],
    proxy: {
      '/api': {
        target: 'http://localhost:3834',
        changeOrigin: true,
      },
    },
  },
})
