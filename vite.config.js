import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    proxy: {
      // Proxy all /api calls to Express backend
      '/api': 'http://localhost:3000'
    }
  }
});
