import { FaArrowRight } from "react-icons/fa";

import { Link } from "@/i18n/navigation";
import type { BusinessHelpGroup } from "@/types/recommendation";

import RecommendationItem from "./RecommendationItem";
import { ListingType } from "@/types/listing.type";

export type BusinessHelpSectionData = {
  key: BusinessHelpGroup;
  title: string;
  description: string;
  href: string;
};

type BusinessHelpSectionLabels = {
  sponsored: string;
  empty: string;
  viewAll: string;
};

type BusinessHelpSectionProps = {
  section: BusinessHelpSectionData;
  recommendations: ListingType[];
  labels: BusinessHelpSectionLabels;
};

export default function BusinessHelpSection({
  section,
  recommendations,
  labels,
}: BusinessHelpSectionProps) {
  const hasRecommendations = recommendations.length > 0;

  return (
    <article>
      <header className="mb-5">
        <h3 className="text-xl font-bold text-slate-900">{section.title}</h3>

        <p className="mt-2 text-sm leading-6 text-slate-600">
          {section.description}
        </p>
      </header>

      <div className="divide-y divide-slate-200 border-y border-slate-200">
        {hasRecommendations ? (
          recommendations.map((recommendation) => (
            <RecommendationItem
              key={recommendation._id}
              recommendation={recommendation}
              sponsoredLabel={labels.sponsored}
            />
          ))
        ) : (
          <p className="py-6 text-sm text-slate-500">{labels.empty}</p>
        )}
      </div>

      <Link
        href={section.href}
        className="mt-5 inline-flex items-center gap-2 rounded-lg border border-slate-300 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-900 hover:bg-slate-900 hover:text-white"
      >
        {labels.viewAll}

        <FaArrowRight aria-hidden="true" className="text-xs rtl:rotate-180" />
      </Link>
    </article>
  );
}
