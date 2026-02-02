import path from "path"
import { fileURLToPath } from 'url'
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { visualizer } from 'rollup-plugin-visualizer'
import imageOptimizePlugin from 'vite-plugin-image-optimize'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    imageOptimizePlugin({
      png: {
        quality: 80,
      },
      jpeg: {
        quality: 80,
      },
      jpg: {
        quality: 80,
      },
      webp: {
        quality: 80,
      },
    }),
    visualizer({
      filename: 'dist/stats.html',
      open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  // Copy service worker
  publicDir: 'public',
  build: {
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Critical chunks that should be preloaded
          if (id.includes('src/main.jsx') || id.includes('src/App.jsx')) {
            return 'critical';
          }
          // Separate Supabase for pages that need it
          if (id.includes('@supabase')) {
            return 'supabase-vendor';
          }
          // Keep existing manual chunks
          if (id.includes('framer-motion') || id.includes('lucide-react')) {
            return 'ui-vendor';
          }
          if (id.includes('react')) {
            return 'react-vendor';
          }
          if (id.includes('react-router-dom')) {
            return 'router-vendor';
          }
          if (id.includes('clsx') || id.includes('tailwind-merge') || id.includes('class-variance-authority')) {
            return 'utils-vendor';
          }
          // Additional chunking for large libraries
          if (id.includes('motion-dom') || id.includes('motion-utils')) {
            return 'motion-vendor';
          }
          if (id.includes('react-markdown') || id.includes('remark-gfm')) {
            return 'markdown-vendor';
          }
        },
        // Optimize chunk file names
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable minification
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
    },
    // Enable source maps for production debugging
    sourcemap: false,
    // Optimize CSS
    cssCodeSplit: true,
    // Preload modules
    modulePreload: {
      polyfill: false
    },
    // Enable compression
    reportCompressedSize: true,
    // Optimize dependencies
    commonjsOptions: {
      include: [/node_modules/],
    },
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'framer-motion',
      'lucide-react',
      '@supabase/supabase-js'
    ]
  }
})
