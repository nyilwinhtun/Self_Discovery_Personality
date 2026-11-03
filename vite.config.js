import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // GitHub Pages project-site URL: https://<owner>.github.io/Self_Discovery_Personality/
  // Vite rewrites built asset URLs to include this repository path.
  base: '/Self_Discovery_Personality/',
  plugins: [react(), tailwindcss()],
})
