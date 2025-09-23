import { defineConfig } from 'vite';
import tailwindcss from '@tailwindcss/vite';
import injectHTML from 'vite-plugin-html-inject';
import { resolve } from 'path';

export default defineConfig({
  base: '/',
  plugins: [tailwindcss(), injectHTML()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        about: resolve(__dirname, 'src/pages/about-us/about-us.html'),
        devices: resolve(__dirname, 'src/pages/devices/devices.html'),
        services: resolve(__dirname, 'src/pages/services/services.html'),
        contacts: resolve(__dirname, 'src/pages/contacts/contacts.html'),
        d_fend: resolve(__dirname, 'src/pages/d-fend/d-fend.html'),
        privacy: resolve(__dirname, 'src/pages/privacy/privacy.html'),
      },
    },
  },
});
