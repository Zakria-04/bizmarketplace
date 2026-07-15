import { useTranslations } from "next-intl";
import { FiEdit3, FiExternalLink } from "react-icons/fi";

import { Link } from "@/i18n/navigation";

import ListingStatusBadge, { type ApprovalStatus } from "./ListingStatusBadge";

type ListingCardProps = {
  listing: {
    title: string;
    approvalStatus: ApprovalStatus;
  };
};

export default function ListingCard({ listing }: ListingCardProps) {
  const t = useTranslations("Dashboard");

  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="min-w-0">
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <h3 className="font-semibold text-slate-900">{listing.title}</h3>

            <ListingStatusBadge status={listing.approvalStatus} />
          </div>

          <p className="text-sm text-slate-500">
            {t(`listing.statusDescriptions.${listing.approvalStatus}`)}
          </p>
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          <Link
            href="/dashboard/listing/edit"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            <FiEdit3 />
            {t("actions.edit")}
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-emerald-700"
          >
            <FiExternalLink />
            {t("actions.view")}
          </Link>
        </div>
      </div>
    </div>
  );
}
