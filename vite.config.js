import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss()
  ],
  esbuild: {
    // 1. Force the loader to 'jsx'
    loader: 'jsx',
    // 2. Updated Regex: Match BOTH .js and .jsx files in src
    include: /src\/.*\.[tj]sx?$/, 
    exclude: [],
    // 3. Keep automatic runtime to avoid "React is not defined"
    jsx: 'automatic',
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})