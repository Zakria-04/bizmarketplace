import Image from "next/image";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";
import type { Recommendation } from "@/types/recommendation";

type RecommendationCardProps = {
  recommendation: Recommendation;
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const t = useTranslations("LandingPage.Recommendations");

  return (
    <Link
      href={`/recommendations/${recommendation.slug}`}
      className="group block h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative flex h-36 items-center justify-center bg-gray-50">
        {recommendation.logoUrl ? (
          <Image
            src={recommendation.logoUrl}
            alt={`${recommendation.name} logo`}
            fill
            sizes="(min-width: 1280px) 280px, 300px"
            className="object-contain p-8"
          />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-2xl font-bold text-emerald-700">
            {recommendation.name.charAt(0)}
          </span>
        )}

        {recommendation.sponsored && (
          <span className="absolute inset-s-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-600 shadow-sm">
            {t("sponsored")}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900">{recommendation.name}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {recommendation.description}
        </p>

        <span className="mt-4 inline-block text-sm font-semibold text-emerald-600">
          {t("learnMore")}
        </span>
      </div>
    </Link>
  );
}
