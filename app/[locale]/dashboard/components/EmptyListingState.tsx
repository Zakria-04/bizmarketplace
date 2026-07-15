import { useTranslations } from "next-intl";
import { FiPlus } from "react-icons/fi";

import { Link } from "@/i18n/navigation";

export default function EmptyListingState() {
  const t = useTranslations("Dashboard");

  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-8 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
        <FiPlus className="size-5" />
      </div>

      <h3 className="mt-4 font-semibold text-slate-900">{t("empty.title")}</h3>

      <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
        {t("empty.description")}
      </p>

      <Link
        href="/dashboard/listing/create"
        className="mt-5 inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
      >
        <FiPlus />
        {t("actions.create")}
      </Link>
    </div>
  );
}
