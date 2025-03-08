import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  server: {
    // port: 3030,
    host: 'localhost',
    https: false,
  },
  // preview:{
  //   port:8080
  // },
  plugins: [react()],
  base: '/Frontend',
});
