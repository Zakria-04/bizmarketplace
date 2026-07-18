"use client";
import type { ChangeEvent } from "react";
import { useLocale, useTranslations } from "next-intl";
import { RiMenu3Line } from "react-icons/ri";

import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import Brand from "./Brand";

type Locale = (typeof routing.locales)[number];

const NAVIGATION_LINKS = [
  {
    translationKey: "home",
    href: "/",
  },
  {
    translationKey: "about",
    href: "/about",
  },
  {
    translationKey: "services",
    href: "/services",
  },
  // {
  //   translationKey: "contact",
  //   href: "/contact",
  // },
] as const;

const LANGUAGES: Array<{
  value: Locale;
  label: string;
  fontFamily?: string;
}> = [
  {
    value: "ar",
    label: "العربية",
    fontFamily: "--font-cairo",
  },
  {
    value: "he",
    label: "עברית",
    fontFamily: "--font-hebrew",
  },
];

export default function Header() {
  const t = useTranslations("LandingPage.Header");
  const locale = useLocale();

  const pathname = usePathname();
  const router = useRouter();

  function handleLocaleChange(event: ChangeEvent<HTMLSelectElement>) {
    const selectedLocale = event.target.value as Locale;

    router.replace(pathname, {
      locale: selectedLocale,
    });
  }

  return (
    <header>
      {/* Mobile header */}
      <div className="lg:hidden">
        <select
          value={locale}
          onChange={handleLocaleChange}
          aria-label="Select language"
          className="bg-transparent px-3 py-2 text-sm text-gray-700 outline-none cursor-pointer"
        >
          {LANGUAGES.map((language) => (
            <option
              key={language.value}
              value={language.value}
              style={{ fontFamily: `var(${language.fontFamily})` }}
            >
              {language.label}
            </option>
          ))}
        </select>
      </div>
      {/* <div className="rounded-3xl border border-gray-200/50 bg-white/30 shadow-sm backdrop-blur-sm lg:hidden">
        <div className="mx-auto flex h-13 max-w-7xl items-center justify-between px-4 sm:h-18 sm:px-6">
          <button
            type="button"
            aria-label="Open navigation menu"
            className="flex size-10 items-center justify-center rounded-lg text-gray-600 transition-colors hover:bg-gray-100/70 hover:text-gray-900 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600"
          >
            <RiMenu3Line className="size-7 sm:size-8" />
          </button>

          <Brand />
        </div>
      </div> */}

      {/* Desktop header */}
      <div className="hidden items-center justify-between lg:flex flex-row-reverse">
        <Brand />

        <div className="flex items-center gap-25">
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 hover:scale-105 active:scale-95 transition"
            >
              {t("listCta")}
            </Link>

            <Link href="/auth/signup">
              <div className="text-gray-800 hover:text-teal-600 transition text-sm">
                {t("signupCta")}
              </div>
            </Link>

            {/* Line Divider */}
            <div className="h-6 w-px bg-gray-300" />

            <select
              value={locale}
              onChange={handleLocaleChange}
              aria-label="Select language"
              className="bg-transparent px-3 py-2 text-sm text-gray-700 outline-none cursor-pointer"
            >
              {LANGUAGES.map((language) => (
                <option
                  key={language.value}
                  value={language.value}
                  style={{ fontFamily: `var(${language.fontFamily})` }}
                >
                  {language.label}
                </option>
              ))}
            </select>
          </div>

          {/* <nav aria-label="Main navigation">
            <ul className="flex items-center gap-6">
              {NAVIGATION_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium text-gray-700 transition-colors hover:text-emerald-600"
                  >
                    {t(`nav.${link.translationKey}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav> */}
        </div>
      </div>
    </header>
  );
}
