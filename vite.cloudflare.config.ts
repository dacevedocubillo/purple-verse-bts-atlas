import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Static export for Cloudflare Pages at the root of the domain.
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
  vite: { base: "/" },
});
