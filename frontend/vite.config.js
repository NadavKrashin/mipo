import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      devOptions: {
        enabled: true,
      },
      workbox: {
        cleanupOutdatedCaches: false,
      },
      manifest: {
        name: "MiPo?",
        short_name: "MiPo?",
        icons: [
          {
            src: "/MiPo-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/MiPo-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/MiPo-180.png",
            sizes: "180x180",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/MiPo-120.png",
            sizes: "120x120",
            type: "image/png",
            purpose: "any",
          },
        ],
        display: "standalone",
        orientation: "portrait",
        background_color: "#1976d2",
        theme_color: "#1976d2",
      },
    }),
  ],
});
