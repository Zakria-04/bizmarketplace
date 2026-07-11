import type { StaticImageData } from "next/image";

export type BusinessCategory = "restaurants" | "retail" | "beauty" | "services";

export type BusinessHelpGroup = "online-store" | "website-builder";

export type RecommendationTag = BusinessCategory | BusinessHelpGroup;

export type Recommendation = {
  id: string;
  name: string;
  slug: string;
  description: string;
  tags: RecommendationTag[];
  logo?: StaticImageData | string;
  coverImage?: StaticImageData | string ;
  sponsored?: boolean;
};

export type RecommendationSection = {
  category: BusinessCategory;
  slug: string;
  titleKey: BusinessCategory;
};
