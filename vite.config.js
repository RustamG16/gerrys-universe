import { defineConfig } from 'vite';

// Relative base + hash routing: the build runs from any static folder or sub-path.
export default defineConfig({
  base: './',
  build: { chunkSizeWarningLimit: 1200 },
});
