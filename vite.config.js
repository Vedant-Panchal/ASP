import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    host: "localhost",
    proxy: {
      "/titanurl": {
        target: "https://titanurl.vercel.app/", // Replace with your API server URL
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/titanurl/, ""),
      },
    },
  },
});
