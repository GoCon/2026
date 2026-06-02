// @ts-check
import { defineConfig } from "astro/config";
import { newsOgImagesIntegration } from "./src/integrations/newsOgImages.ts";

export default defineConfig({
  site: process.env.DEPLOY_PRIME_URL,
  integrations: [newsOgImagesIntegration()],
  i18n: {
    defaultLocale: "ja",
    locales: ["ja", "en"],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
