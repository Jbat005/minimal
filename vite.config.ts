import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

// Relative base ("./") makes the built site path-agnostic: it works opened via
// Live Server pointed at /dist, on a custom root domain, AND on a GitHub Pages
// project sub-path (jbat005.github.io/minimal/) — no reconfiguration needed.
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(import.meta.dirname, "./src"),
    },
  },
  build: {
    // Bundled app assets go to /static so they never collide with the
    // copied-through /assets folder of project images.
    assetsDir: "static",
  },
});
