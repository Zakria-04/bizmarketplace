"use client";
import { RECOMMENDATION_SECTIONS } from "@/assets/data/recommendationSections";

import RecommendationRow from "./recommendations/RecommendationRow";
import { useListingStore } from "@/store/listingStore";
import { useEffect } from "react";
import { ListingType } from "@/types/listing.type";



export default function RenderCards() {
  const { listings, getAllListings } = useListingStore();

  // Fetch listings when the component mounts
  useEffect(() => {
    getAllListings();
  }, [getAllListings]);

  return (
    <div className="mx-auto max-w-7xl space-y-12 px-4 py-12 sm:px-6 lg:px-8">
      {RECOMMENDATION_SECTIONS.map((section) => {
        const sectionRecommendations = listings.filter((recommendation) =>
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
