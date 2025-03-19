import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { TanStackRouterVite } from '@tanstack/router-plugin/vite'
import path from 'path'

const isTest = process.env.NODE_ENV === 'test'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [!isTest && TanStackRouterVite({}), react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@api': path.resolve(__dirname, 'src/api'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@config': path.resolve(__dirname, 'src/config'),
      '@interfaces': path.resolve(__dirname, 'src/interfaces'),
      '@routes': path.resolve(__dirname, 'src/routes'),
      '@schema': path.resolve(__dirname, 'src/schema'),
    },
  },
})
