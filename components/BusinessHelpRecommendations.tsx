// components/landing/BusinessHelpRecommendations.tsx

"use client";

import { useTranslations } from "next-intl";

import BusinessHelpSection, {
  type BusinessHelpSectionData,
} from "./business-help/BusinessHelpSection";

import type { BusinessHelpGroup, Recommendation } from "@/types/recommendation";

const MAX_VISIBLE_RECOMMENDATIONS = 3;

type BusinessHelpRecommendationsProps = {
  recommendations: Recommendation[];
};

export default function BusinessHelpRecommendations({
  recommendations,
}: BusinessHelpRecommendationsProps) {
  const t = useTranslations("LandingPage.BusinessHelp");

  const sections: BusinessHelpSectionData[] = [
    {
      key: "online-store",
      title: t("onlineStore.title"),
      description: t("onlineStore.description"),
      href: "/business-help/online-store",
    },
    {
      key: "website-builder",
      title: t("websiteBuilder.title"),
      description: t("websiteBuilder.description"),
      href: "/business-help/website-builder",
    },
  ];

  const getRecommendationsByGroup = (group: BusinessHelpGroup) =>
    recommendations
      .filter((recommendation) => recommendation.tags.includes(group))
      .slice(0, MAX_VISIBLE_RECOMMENDATIONS);

  const labels = {
    sponsored: t("sponsored"),
    empty: t("empty"),
    viewAll: t("viewAll"),
  };

  return (
    <section className="bg-slate-50 px-4 py-14 sm:px-6 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 max-w-2xl">
          <p className="mb-2 text-sm font-semibold text-emerald-700">
            {t("eyebrow")}
          </p>

          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("title")}
          </h2>

          <p className="mt-3 leading-7 text-slate-600">{t("description")}</p>
        </header>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {sections.map((section) => (
            <BusinessHelpSection
              key={section.key}
              section={section}
              recommendations={getRecommendationsByGroup(section.key)}
              labels={labels}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
