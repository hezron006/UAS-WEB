import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  proxy: {
    '/api': {
      target: 'https://uas-snowy.vercel.app',
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, ''),
    },
  }
  
})


