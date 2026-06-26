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
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/apexcharts') || id.includes('node_modules/react-apexcharts')) {
            return 'vendor-charts';
          }
          if (id.includes('node_modules/lucide-react') || id.includes('node_modules/react-day-picker') || id.includes('node_modules/swiper')) {
            return 'vendor-ui';
          }
        },
      },
    },
  },
})
