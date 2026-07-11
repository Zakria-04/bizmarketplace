import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

export default function Hero() {
  const t = useTranslations("LandingPage.Hero");

  return (
    <div className="flex items-center justify-end px-3 pb-8 pt-4 sm:px-6 lg:min-h-125 lg:p-6">
      <div className="w-full rounded-3xl p-3 sm:max-w-2xl lg:border lg:border-gray-200/20 lg:bg-white/10 lg:p-6 lg:shadow-sm lg:backdrop-blur-sm">
        <h1 className="text-2xl leading-tight font-bold text-gray-900 sm:text-3xl lg:text-4xl">
          {t.rich("title", {
            highlight: (children) => (
              <span className="text-emerald-600">{children}</span>
            ),
          })}
        </h1>

        <p className="mt-4 max-w-xl text-sm leading-6 text-gray-700 sm:text-base">
          {t("description")}
        </p>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Link href="/">
            <div className="rounded-xl bg-emerald-600 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-700 hover:scale-105 active:scale-95 transition">
              {t("exploreCta")}
            </div>
          </Link>

          <Link
            href="/"
            className="rounded-xl border border-emerald-600 bg-white/60 px-6 py-3 text-sm font-medium text-emerald-600  hover:bg-white/80 hover:scale-105 active:scale-95 transition"
          >
            {t("listCta")}
          </Link>
        </div>
      </div>
    </div>
  );
}
