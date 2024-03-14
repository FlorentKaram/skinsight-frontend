import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: process.env.NODE_ENV === "dev" ? "/dev/" : "/",
  optimizeDeps: {
    include: ["@emotion/styled"],
  },
  server: {
    proxy: {
      // Ajoute "/dev" à la fin de chaque requête
      "/api": {
        target: "https://sample-restaurant.com/dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
