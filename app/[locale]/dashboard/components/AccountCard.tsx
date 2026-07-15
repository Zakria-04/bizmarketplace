import { useTranslations } from "next-intl";
import { FiLogOut, FiTrash2 } from "react-icons/fi";

export default function AccountCard() {
  const t = useTranslations("Dashboard");

  return (
    <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-900">{t("account.title")}</h2>

      <p className="mt-1 text-sm text-slate-500">{t("account.description")}</p>

      <div className="mt-5 space-y-2">
        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-100"
        >
          <FiLogOut className="size-4" />
          {t("actions.logout")}
        </button>

        <button
          type="button"
          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
        >
          <FiTrash2 className="size-4" />
          {t("actions.deleteAccount")}
        </button>
      </div>
    </aside>
  );
}
