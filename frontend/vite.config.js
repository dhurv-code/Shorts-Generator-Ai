import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forward API calls to the backend FastAPI server
      '/video': {
        target: 'https://shorts-generator-ai.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      // Serve uploaded and generated files from backend
      '/uploads': {
        target: 'https://shorts-generator-ai.onrender.com',
        changeOrigin: true,
        secure: false,
      },
      '/outputs': {
        target: 'https://shorts-generator-ai.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
