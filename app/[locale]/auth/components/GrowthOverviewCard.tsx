"use client";

import { useTranslations } from "next-intl";
import { FiTrendingUp } from "react-icons/fi";

export default function GrowthOverviewCard() {
  const t = useTranslations("Auth.hero.growth");

  return (
    <div className="w-64 rounded-2xl border border-white/40 bg-white/88 p-4 shadow-[0_30px_70px_-20px_rgba(2,20,50,0.55)] backdrop-blur-xl">
      <div>
        <p className="text-xs font-medium text-slate-500">{t("analytics")}</p>

        <h3 className="mt-1 font-semibold text-slate-900">{t("title")}</h3>
      </div>

      <div className="relative mt-5 h-28 w-full" dir="ltr">
        <svg
          viewBox="0 0 240 100"
          className="h-full w-full overflow-visible"
          role="img"
          aria-label={t("chartLabel")}
        >
          <defs>
            <linearGradient id="growthArea" x1="0" y1="0" x2="0" y2="1">
              <stop
                offset="0%"
                stopColor="rgb(13 148 136)"
                stopOpacity="0.28"
              />

              <stop offset="100%" stopColor="rgb(13 148 136)" stopOpacity="0" />
            </linearGradient>
          </defs>

          <line
            x1="0"
            y1="78"
            x2="240"
            y2="78"
            stroke="rgb(226 232 240)"
            strokeWidth="1"
          />

          <line
            x1="0"
            y1="48"
            x2="240"
            y2="48"
            stroke="rgb(241 245 249)"
            strokeWidth="1"
          />

          <path
            d="M0 78 C25 74, 35 66, 55 69 C80 73, 88 52, 110 56 C133 60, 143 41, 166 45 C190 49, 204 25, 240 18 L240 100 L0 100 Z"
            fill="url(#growthArea)"
          />

          <path
            d="M0 78 C25 74, 35 66, 55 69 C80 73, 88 52, 110 56 C133 60, 143 41, 166 45 C190 49, 204 25, 240 18"
            fill="none"
            stroke="rgb(13 148 136)"
            strokeWidth="4"
            strokeLinecap="round"
          />

          <circle
            cx="240"
            cy="18"
            r="5"
            fill="white"
            stroke="rgb(13 148 136)"
            strokeWidth="3"
          />
        </svg>

        <div className="absolute right-0 top-0 flex -translate-y-1/2 translate-x-1/4 items-center gap-1.5 rounded-xl bg-slate-900 px-2.5 py-1.5 text-white shadow-lg">
          <span className="flex size-5 items-center justify-center rounded-md bg-emerald-500">
            <FiTrendingUp className="size-3.5" />
          </span>

          <span className="text-sm font-bold">+24%</span>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-between gap-3">
        <p className="text-xs text-slate-500">{t("description")}</p>

        <p className="shrink-0 text-xs font-medium text-emerald-700" dir="ltr">
          {t("period")}
        </p>
      </div>
    </div>
  );
}
