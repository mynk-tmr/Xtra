import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";
import tailwindConfig from "./tailwind.config";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  css: {
    postcss: {
      plugins: [
        tailwindcss({
          config: tailwindConfig,
        }),
        autoprefixer,
      ],
    },
  },
});
