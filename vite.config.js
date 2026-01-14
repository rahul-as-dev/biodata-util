import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr()
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
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react')) return 'vendor-react';
            if (id.includes('framer-motion')) return 'vendor-motion';
            if (id.includes('lucide-react')) return 'vendor-icons';
            if (id.includes('@react-pdf')) return 'vendor-pdf';
            return 'vendor';
          }
        }
      }
    }
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
})