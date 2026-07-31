import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages base path. Change this to match your repository name.
// For example, if your repo is https://username.github.io/astra-web-page/
// then set base: '/astra-web-page/'
const base = process.env.VITE_BASE_PATH || '/ASTRA-WEB-PAGE/'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
