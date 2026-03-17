import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]___[hash:base64:5]"
    },
    preprocessorOptions: {
      scss: {
        additionalData: `@use '/src/styles/helpers/index' as *;`,
        api: "modern-compiler"
      }
    },
    devSourcemap: true
  },
  build: {
    target: "esnext"
  },
  server: {
    port: 3000
  },
  preview: {
    port: 3000
  }
});
