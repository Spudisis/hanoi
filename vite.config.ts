
import path from 'path';
import checker from 'vite-plugin-checker';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths(),  checker({
    typescript: true, 
  }),],
  resolve: {
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
})
