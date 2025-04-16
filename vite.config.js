import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

export default defineConfig({
  plugins: [
    react({
      include: "**/*.{jsx,tsx}", // Add this line
    }),
    cssInjectedByJsPlugin(),
  ],
  css: {
    postcss: "./postcss.config.js",
  },
  resolve: {
    alias: {
      styles: path.resolve(__dirname, "src/styles"),
    },
  },
  build: {
    lib: {
      entry: "src/index.js",
      name: "ReactComponentLibrary",
      fileName: (format) => `react-component-library.${format}.js`,
      formats: ["es"],
    },
    rollupOptions: {
      external: ["react", "react-dom"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
    cssCodeSplit: false,
  },
});
