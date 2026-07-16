import type { StaticImageData } from "next/image";

export type BusinessCategory =
  | "restaurants"
  | "retail"
  | "services"
  | "marketing"
  | "suppliers"
  | "printing";

export type BusinessHelpGroup = "online-store" | "website-builder";

export type RecommendationTag = BusinessCategory | BusinessHelpGroup;

export type RecommendationSection = {
  category: BusinessCategory;
  slug: string;
  titleKey: BusinessCategory;
};
