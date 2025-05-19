import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
      plugins: [vue()],
      build: {
        rollupOptions: {
          input: './resources/js/app.js', // Atau './src/main.ts' atau path file entry point Anda
        },
        outDir: 'build', // Direktori output build
      },
    });
