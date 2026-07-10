import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["he", "ar"],
  defaultLocale: "he",
  localePrefix: "as-needed",
  //   localeDetection: false,
  localeCookie: {
    name: "NEXT_LOCALE",
    maxAge: 60 * 60 * 24 * 365, // 1 year
  },
});
