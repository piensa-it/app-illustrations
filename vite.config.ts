import react from "@vitejs/plugin-react-swc";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [
    react(),
    dts({
      tsconfigPath: "./tsconfig.app.json",
      include: ["src"],
      exclude: ["src/**/*.test.*", "src/test/**", "src/**/*.stories.*"],
      rollupTypes: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(dirname, "src/index.ts"),
      name: "PiensaItIllustrations",
    },
    rollupOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: [
        {
          format: "es",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].es.js",
          chunkFileNames: "chunks/[name]-[hash].es.js",
          exports: "named",
        },
        {
          format: "cjs",
          preserveModules: true,
          preserveModulesRoot: "src",
          entryFileNames: "[name].cjs.js",
          chunkFileNames: "chunks/[name]-[hash].cjs.js",
          exports: "named",
        },
      ],
    },
    sourcemap: true,
    copyPublicDir: false,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/test/setup.ts"],
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
