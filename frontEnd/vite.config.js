import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // react-three-fiber pulls its own React-using deps; force a single React copy
  // so hooks resolve against one instance (fixes "Invalid hook call" in dev).
  resolve: {
    dedupe: ["react", "react-dom"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "react/jsx-runtime"],
  },
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
