import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Separate static export: keep Lovable's existing server build unchanged.
export default defineConfig({
  nitro: false,
  tanstackStart: {
    server: { entry: "server" },
    prerender: {
      enabled: true,
      autoSubfolderIndex: true,
      crawlLinks: true,
      failOnError: true,
    },
  },
  vite: { base: "/purple-verse-bts-atlas/" },
});
