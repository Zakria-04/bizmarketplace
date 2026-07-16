import type { ListingPrimaryCta } from "@/types/listing.type";

export const LISTING_TAG_OPTIONS = [
  "restaurants",
  "retail",
  "beauty",
  "services",
  "website-builder",
  "online-store",
] as const;

export type ListingTag = (typeof LISTING_TAG_OPTIONS)[number];

export const PRIMARY_CTA_OPTIONS = [
  "website",
  "whatsapp",
  "instagram",
  "facebook",
] as const satisfies readonly ListingPrimaryCta[];
