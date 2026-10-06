import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// BASE_PATH is set by the Pages workflow ("/nota-site/" for a project page, "/" for a custom domain).
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
