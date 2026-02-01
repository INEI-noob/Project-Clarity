import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // This MUST match your tsconfig.json "paths"
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    // Ensure this matches the 'directory' in wrangler.jsonc
    outDir: 'dist',
  },
});