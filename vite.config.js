import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import tailwindcss from '@tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), // Vue 3 plugin for Vite
    tailwindcss(), // Tailwind CSS v4 plugin
    vueDevTools(), // Vue DevTools integration
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)), // Path alias for src directory
    },
  },
});