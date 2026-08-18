import { defineConfig } from 'vite';
import { BASE_PATH } from './src/config/appConfig';

export default defineConfig({
  base: BASE_PATH || '/',
  server: {
    port: 5173
  }
});
