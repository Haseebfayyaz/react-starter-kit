import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@comp": path.resolve(__dirname, "src/components"),
      "@auth": path.resolve(__dirname, "src/components/auth"),
      "@layout": path.resolve(__dirname, "src/components/layout"),
      "@/store": path.resolve(__dirname, "src/store")
    }
  }
})
