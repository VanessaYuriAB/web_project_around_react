import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
  },
  base: '/web_project_around_react/', // 👈 Caminho correto para GitHub Pages / Já configurado, mas não é utilizado no npm run dev, apenas para npm run build e npm run preview
  build: {
    outDir: 'dist', // onde o Vite colocará os arquivos após o build (padrão já é "dist")
    assetsDir: 'assets', //subpasta onde vão os arquivos estáticos (JS, CSS, imagens etc.)
  },
});
