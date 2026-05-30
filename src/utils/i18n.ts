import { getPathByLocale, getRelativeLocaleUrl } from "astro:i18n";

export const DEFAULT_LOCALE = "ja";
export const LOCALES = ["ja", "en"] as const;
export type Locale = (typeof LOCALES)[number];

const EN_PREFIX = `/${getPathByLocale("en")}`;

/** Returns the page path without base URL and locale prefix. */
export function getPagePathWithoutLocale(pathname: string): string | undefined {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  let path = pathname.startsWith(base) ? pathname.slice(base.length) || "/" : pathname;

  if (path === EN_PREFIX) {
    path = "/";
  } else if (path.startsWith(`${EN_PREFIX}/`)) {
    path = path.slice(EN_PREFIX.length);
  }

  return path === "/" ? undefined : path.replace(/^\//, "");
}

/** Returns the localized URL for the page at the given pathname. */
export function getLocaleUrlForPage(locale: Locale, pathname: string): string {
  return getRelativeLocaleUrl(locale, getPagePathWithoutLocale(pathname));
}
