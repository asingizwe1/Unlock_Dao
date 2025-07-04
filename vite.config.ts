// vite.config.ts
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

import { NodeGlobalsPolyfillPlugin } from "@esbuild-plugins/node-globals-polyfill";
import { NodeModulesPolyfillPlugin } from "@esbuild-plugins/node-modules-polyfill";
// @ts-ignore
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
  const config: UserConfig = {
    server: {
      host: "::",
      port: 8080,
      proxy: {
        // ← this rule forwards /api/delegation-graph → Unlock subgraph
        "/api/delegation-graph": {
          target: "https://api.thegraph.com/subgraphs/name/unlock-protocol/unlock",
          changeOrigin: true,
          rewrite: (path) =>
            path.replace(/^\/api\/delegation-graph/, ""),
        },
      },
    },

    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        events: "events",
        buffer: "buffer",
        process: "process/browser",
      },
    },

    optimizeDeps: {
      esbuildOptions: {
        define: { global: "globalThis" },
        plugins: [
          NodeGlobalsPolyfillPlugin({ buffer: true, process: true }) as any,
          NodeModulesPolyfillPlugin() as any,
        ],
      },
    },

    plugins: [
      react(),
      mode === "development" && componentTagger(),
    ].filter(Boolean),
  };

  return config;
});