"use client";

import { useLocale, useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import { useHorizontalCarousel } from "@/hooks/useHorizontalCarousel";
import type { RecommendationSection } from "@/types/recommendation";

import CarouselControls from "./CarouselControls";
import RecommendationCard from "./RecommendationCard";
import { ListingType } from "@/types/listing.type";

type RecommendationRowProps = {
  section: RecommendationSection;
  recommendations: ListingType[];
};

export default function RecommendationRow({
  section,
  recommendations,
}: RecommendationRowProps) {
  const t = useTranslations("LandingPage.Recommendations");
  const locale = useLocale();

  const {
    containerRef,
    handleScroll,
    goBack,
    goForward,
    canGoBack,
    canGoForward,
    hasOverflow,
  } = useHorizontalCarousel(recommendations.length);

  const isRtl = locale === "ar" || locale === "he";

  return (
    <section>
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
            {t(section.titleKey)}
          </h2>

          <p className="mt-1 text-sm text-gray-500">{t("description")}</p>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          {/* <Link
            href={`/categories/${section.slug}`}
            className="text-sm font-semibold text-emerald-600 hover:text-emerald-700"
          >
            {t("viewAll")}
          </Link> */}

          {hasOverflow && (
            <CarouselControls
              isRtl={isRtl}
              canGoBack={canGoBack}
              canGoForward={canGoForward}
              previousLabel={t("previous")}
              nextLabel={t("next")}
              onBack={goBack}
              onForward={goForward}
            />
          )}
        </div>
      </div>

      <ul
        ref={containerRef}
        onScroll={handleScroll}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-4 scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {recommendations.map((recommendation) => (
          <li
            key={recommendation._id}
            className="w-57.5 shrink-0 snap-start sm:w-75 lg:w-[calc((100%-2rem)/4)] xl:w-[calc((100%-3rem)/5)]"
          >
            <RecommendationCard recommendation={recommendation} />
          </li>
        ))}
      </ul>
    </section>
  );
}
