// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.DEPLOY_PRIME_URL,
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
