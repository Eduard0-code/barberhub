import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:8081',
    },
  },
  build: {
    outDir: isVercel ? 'dist' : '../backend/src/main/resources/static',
    emptyOutDir: true,
  },
})
