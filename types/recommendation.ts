import type { StaticImageData } from "next/image";

export type BusinessCategory = "restaurants" | "retail" | "beauty" | "services";

export type BusinessHelpGroup = "online-store" | "website-builder";

export type RecommendationTag = BusinessCategory | BusinessHelpGroup;

export type RecommendationSection = {
  category: BusinessCategory;
  slug: string;
  titleKey: BusinessCategory;
};
