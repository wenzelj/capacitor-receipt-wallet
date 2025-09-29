import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // Point to the folder where your `index.html` is.
  root: 'src',
  plugins: [
    tailwindcss(),
  ],
  build: {
    // The output directory will be `dist` in the project root.
    outDir: '../dist',
  },
});