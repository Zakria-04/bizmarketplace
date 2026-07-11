import { RECOMMENDATION_SECTIONS } from "@/assets/data/recommendationSections";
import type { Recommendation } from "@/types/recommendation";

import RecommendationRow from "./recommendations/RecommendationRow";

type RenderCardsProps = {
  recommendations: Recommendation[];
};

export default function RenderCards({ recommendations }: RenderCardsProps) {
  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {RECOMMENDATION_SECTIONS.map((section) => {
        const sectionRecommendations = recommendations.filter(
          (recommendation) =>
            recommendation.tags.includes(section.category),
        );

        if (sectionRecommendations.length === 0) {
          return null;
        }

        return (
          <RecommendationRow
            key={section.category}
            section={section}
            recommendations={sectionRecommendations}
          />
        );
      })}
    </div>
  );
}
