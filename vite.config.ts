import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({

  base: '',
  plugins: [react()],

  // Output the build to the docs folder
  build: {
    outDir: 'docs',
  },

  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
