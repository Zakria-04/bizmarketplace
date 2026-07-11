export type CategoryKey =
  | "restaurants"
  | "retail"
  | "beauty"
  | "services";

export type Recommendation = {
  id: string;
  name: string;
  slug: string;
  description: string;
  logoUrl?: string | null;
  categories: CategoryKey[];
  sponsored?: boolean;
};

export type RecommendationSection = {
  category: CategoryKey;
  slug: string;
  titleKey: CategoryKey;
};