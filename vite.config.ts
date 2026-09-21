import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Portafolio/',
  esbuild: { jsx: 'automatic' },
  plugins: [tailwindcss()],
})
