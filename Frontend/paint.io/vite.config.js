import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react({
    jsxRuntime: 'classic' // 👈 disables use of `eval` in dev tools
  })],
  build: {
    sourcemap: false // ⛔ prevents inline scripts via source maps
  }
})
