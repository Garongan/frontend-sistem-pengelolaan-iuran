/* eslint-disable no-undef */
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: import.meta.env.VITE_HOST_URL,
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace('^/api/', ''),
  //     },
  //   },
  // },
});
