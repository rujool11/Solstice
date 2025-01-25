import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://backend:5000', // changed to //backend for docker, else //locallost/ 172.0.0.1
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, 'api')
      }
    }
  }
})
