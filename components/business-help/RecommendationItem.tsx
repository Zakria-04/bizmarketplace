import Image, { StaticImageData } from "next/image";

import { Link } from "@/i18n/navigation";
import type { Recommendation } from "@/types/recommendation";

type RecommendationItemProps = {
  recommendation: Recommendation;
  sponsoredLabel: string;
};

export default function RecommendationItem({
  recommendation,
  sponsoredLabel,
}: RecommendationItemProps) {
  const { name, slug, description, logo, sponsored } = recommendation;

  return (
    <Link
      href={`/recommendations/${slug}`}
      className="flex items-center gap-4 py-5 transition hover:bg-white sm:px-3"
    >
      <RecommendationLogo name={name} logo={logo} />

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h4 className="font-semibold text-slate-900">{name}</h4>

          {sponsored && (
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
              {sponsoredLabel}
            </span>
          )}
        </div>

        <p className="mt-1 line-clamp-2 text-sm leading-5 text-slate-500">
          {description}
        </p>
      </div>
    </Link>
  );
}

type RecommendationLogoProps = {
  name: string;
  logo?: string | StaticImageData;
};

function RecommendationLogo({ name, logo }: RecommendationLogoProps) {
  return (
    <div className="">
      {logo ? (
        <Image
          src={logo}
          alt={`${name} logo`}
          width={44}
          height={44}
          className="size-9 object-contain rounded-xl"
        />
      ) : (
        <div className="relative flex size-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-white">
          <span className="text-lg font-bold text-slate-700">
            {name.charAt(0).toUpperCase()}
          </span>
        </div>
      )}
    </div>
  );
}
