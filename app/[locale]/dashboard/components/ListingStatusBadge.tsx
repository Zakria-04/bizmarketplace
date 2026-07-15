import { useTranslations } from "next-intl";

export type ApprovalStatus = "pending" | "approved" | "rejected";

type ListingStatusBadgeProps = {
  status: ApprovalStatus;
};

const approvalStatusStyles: Record<ApprovalStatus, string> = {
  pending: "bg-amber-50 text-amber-700",
  approved: "bg-emerald-50 text-emerald-700",
  rejected: "bg-red-50 text-red-700",
};

export default function ListingStatusBadge({
  status,
}: ListingStatusBadgeProps) {
  const t = useTranslations("Dashboard");

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${approvalStatusStyles[status]}`}
    >
      {t(`status.${status}`)}
    </span>
  );
}
