import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// During development we proxy /api and /socket.io to the backend
// so the frontend can use relative URLs and cookies stay first-party.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
      "/socket.io": {
        target: "http://localhost:5000",
        ws: true,
        changeOrigin: true,
      },
    },
  },
});