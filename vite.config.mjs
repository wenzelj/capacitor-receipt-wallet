import { defineConfig } from 'vite';
import { resolve } from 'path';
import tailwindcss from '@tailwindcss/vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  // Point to the folder where your `index.html` is.
  root: 'src',
  plugins: [
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: 'pages',
          dest: '.'
        }
      ]
    })
  ],
  build: {
    // The output directory will be `dist` in the project root.
    outDir: '../dist',
    emptyOutDir: true,
  },
});