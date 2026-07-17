import Image from "next/image";
import { useTranslations } from "next-intl";

import type { ListingType } from "@/types/listing.type";

import PrimaryCta from "./PrimaryCta";

type RecommendationCardProps = {
  recommendation: ListingType;
};

export default function RecommendationCard({
  recommendation,
}: RecommendationCardProps) {
  const t = useTranslations("LandingPage.Recommendations");

  const coverImage = recommendation.images?.[0]?.url;
  const titleInitial = recommendation.title.trim().charAt(0).toUpperCase();

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm transition duration-300 motion-safe:hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl focus-within:border-emerald-300 focus-within:shadow-xl">
      {/* Cover image */}
      <div className="relative aspect-16/10 shrink-0 overflow-hidden rounded-xl bg-slate-100">
        {coverImage ? (
          <Image
            src={coverImage}
            alt={recommendation.title}
            fill
            sizes="(min-width: 1024px) 280px, (min-width: 640px) 45vw, 85vw"
            className="object-cover transition duration-500 motion-safe:group-hover:scale-[1.04]"
          />
        ) : (
          <div className="flex size-full items-center justify-center bg-linear-to-br from-emerald-50 via-slate-50 to-emerald-100">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-emerald-700 shadow-sm ring-1 ring-emerald-100">
              {titleInitial}
            </span>
          </div>
        )}

        {/* Image overlay */}
        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/15 via-transparent to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

        {recommendation.sponsored && (
          <span className="absolute inset-s-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur-sm">
            {t("sponsored")}
          </span>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col px-1 pb-1 pt-4">
        <h3 className="line-clamp-1 text-lg font-bold text-slate-900">
          {recommendation.title}
        </h3>

        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-slate-500">
          {recommendation.description}
        </p>

        <div className="mt-auto pt-4">
          <PrimaryCta
            primaryCta={recommendation.primaryCta}
            links={recommendation.links}
          />
        </div>
      </div>
    </article>
  );
}
