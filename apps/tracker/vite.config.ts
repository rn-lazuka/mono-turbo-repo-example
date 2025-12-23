import path from 'path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@assets': '/src/assets',
      '@enums': '/src/enums',
      '@features': '/src/features',
      '@pages': '/src/pages',
      '@shared': '/src/shared',
      '@store': '/src/store',
      '@styles': '/src/styles',
      '@types': '/src/types',
      '@yup/ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
