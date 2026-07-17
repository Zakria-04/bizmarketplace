import { RECOMMENDATION_SECTIONS } from "@/assets/data/recommendationSections";

const SKELETON_CARDS = [1, 2, 3, 4];

function ListingCardSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-2xl border border-slate-200 bg-white p-3 shadow-sm"
    >
      {/* Image */}
      <div className="aspect-16/10 animate-pulse rounded-xl bg-linear-to-br from-slate-200 via-slate-100 to-slate-200" />

      <div className="space-y-4 px-1 pb-1 pt-4">
        {/* Title */}
        <div className="h-5 w-2/3 animate-pulse rounded-md bg-slate-200" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-slate-100" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-slate-100" />
        </div>

        {/* Tags */}
        <div className="flex gap-2">
          <div className="h-6 w-16 animate-pulse rounded-full bg-slate-100" />
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
        </div>

        {/* CTA */}
        <div className="h-10 w-full animate-pulse rounded-xl bg-slate-200" />
      </div>
    </div>
  );
}

export default function RecommendationsSkeleton() {
  return (
    <div aria-busy="true" className="space-y-12">
      {RECOMMENDATION_SECTIONS.map((section) => (
        <section key={section.category} className="space-y-5">
          {/* Section title */}
          <div className="flex items-center justify-between">
            <div className="h-7 w-48 animate-pulse rounded-lg bg-slate-200" />
            <div className="h-5 w-16 animate-pulse rounded-md bg-slate-100" />
          </div>

          {/* Cards */}
          <div className="grid grid-flow-col auto-cols-[85%] gap-5 overflow-hidden sm:auto-cols-[45%] lg:grid-flow-row lg:grid-cols-4">
            {SKELETON_CARDS.map((card) => (
              <ListingCardSkeleton
                key={`${section.category}-${card}`}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}