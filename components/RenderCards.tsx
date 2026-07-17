"use client";

import { useEffect } from "react";

import { RECOMMENDATION_SECTIONS } from "@/assets/data/recommendationSections";
import { useListingStore } from "@/store/listingStore";

import RecommendationRow from "./recommendations/RecommendationRow";
import RecommendationsSkeleton from "./recommendations/RecommendationsSkeleton";

export default function RenderCards() {
  const { listings, isLoading, getAllListings } = useListingStore();

  useEffect(() => {
    getAllListings();
  }, [getAllListings]);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {isLoading ? (
        <RecommendationsSkeleton />
      ) : (
        RECOMMENDATION_SECTIONS.map((section) => {
          const sectionRecommendations = listings.filter((listing) =>
            listing.tags.includes(section.category),
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
        })
      )}
    </div>
  );
}
