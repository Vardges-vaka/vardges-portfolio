import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3210,
    proxy: {
      "/Authentication": "http://localhost:3220",
      "/api": {
        target: "http://localhost:3220",
        changeOrigin: true,
      },
    },
  },
});
