import Image from "next/image";
import { useTranslations } from "next-intl";

import PrimaryCta from "./PrimaryCta";
import type { ListingType } from "@/types/listing.type";

type RecommendationCardProps = {
  recommendation: ListingType;
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const t = useTranslations("LandingPage.Recommendations");

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-200 hover:-translate-y-1 hover:shadow-lg">
      <div className="relative flex h-36 items-center justify-center bg-gray-50">
        {recommendation.images?.length > 0 ? (
          <Image
            src={recommendation.images[0].url}
            alt={`${recommendation.title} cover image`}
            fill
            sizes="(min-width: 1280px) 280px, 300px"
            className="object-contain p-8"
          />
        ) : (
          <span className="flex size-16 items-center justify-center rounded-2xl bg-emerald-100 text-2xl font-bold text-emerald-700">
            {recommendation.title.charAt(0)}
          </span>
        )}

        {recommendation.sponsored && (
          <span className="absolute inset-s-3 top-3 rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-gray-600 shadow-sm">
            {t("sponsored")}
          </span>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-bold text-gray-900">{recommendation.title}</h3>

        <p className="mt-2 line-clamp-2 text-sm leading-6 text-gray-500">
          {recommendation.description}
        </p>

        <PrimaryCta
          primaryCta={recommendation.primaryCta}
          links={recommendation.links}
        />
      </div>
    </article>
  );
}
