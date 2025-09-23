import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import injectHTML from 'vite-plugin-html-inject';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), injectHTML()],
});
