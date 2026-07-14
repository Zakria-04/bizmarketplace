import { useTranslations } from "next-intl";

import type { ListingPrimaryCta, ListingType } from "@/types/listing.type";
import { Link } from "@/i18n/navigation";

type PrimaryCtaProps = {
  primaryCta?: ListingPrimaryCta;
  links: ListingType["links"];
};

const CTA_TRANSLATIONS = {
  website: "viewWebsite",
  whatsapp: "goToWhatsapp",
  instagram: "goToInstagram",
  facebook: "goToFacebook",
} as const;

export default function PrimaryCta({ primaryCta, links }: PrimaryCtaProps) {
  const t = useTranslations("LandingPage.Recommendations");

  if (!primaryCta) return null;

  const href = links[primaryCta];

  if (!href) return null;

  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-4 inline-block text-sm font-semibold text-emerald-600 transition hover:text-emerald-700"
    >
      {t(CTA_TRANSLATIONS[primaryCta])}
    </Link>
  );
}
