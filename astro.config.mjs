// @ts-check
import { defineConfig } from "astro/config";
import { newsOgImagesIntegration } from "./src/integrations/newsOgImages.ts";

// https://astro.build/config
export default defineConfig({
  site: "https://gocon.github.io",
  base: "/2026",
  integrations: [newsOgImagesIntegration()],
  i18n: {
    defaultLocale: "ja",
    locales: ["en", "ja"],
  },
  devToolbar: {
    enabled: false,
  },
});
