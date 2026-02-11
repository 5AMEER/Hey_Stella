import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Hey_Stella/',
  server: {
    hmr: true,
    watch: {
      usePolling: false
    }
  }
})

