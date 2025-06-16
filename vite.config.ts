import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// @ ts-expect-error process is a nodejs global
const host = process.env.TAURI_DEV_HOST;

// https://vitejs.dev/config/
export default defineConfig(async () => ({
  plugins: [
    react(),
    tailwindcss(),
nodePolyfills({
      // Enable polyfills for specific globals and modules
      globals: {
        Buffer: true,
        global: true,
        process: true,
      },
      // Enable polyfills for Node.js built-in modules
      protocolImports: true,
      include: [
        'util',
        'util/types',
        'path',
        'fs',
        'crypto',
        'stream',
        'buffer'
      ]
    })
  ],

  // Define resolve aliases for Node.js modules
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "node:util": "util",
      "node:util/types": path.resolve(__dirname, "node_modules/util/types.js"),
      "node:path": "path",
      "node:fs": "fs",
      "node:crypto": "crypto",
      "node:stream": "stream",
      "node:buffer": "buffer",
    },
  },

  // Build configuration
  build: {
    rollupOptions: {
      external: [],
    },
  },

  // Development server configuration
  server: {
    port: 1420,
    strictPort: true,
    host: host || "localhost",
    open: true,
    hmr: host
      ? {
          protocol: "ws",
          host,
          port: 1421,
        }
      : true,
    watch: {
      ignored: ["**/src-tauri/**"],
    },
  },

  // Prevent vite from obscuring errors
  clearScreen: false,

  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom'],
    exclude: ['undici'],
  },

  // Define external dependencies
  define: {
    global: 'globalThis',
  },
}));
