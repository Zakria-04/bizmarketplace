import { useTranslations } from "next-intl";

export default function DashboardHeader() {
  const t = useTranslations("Dashboard");

  return (
    <header className="mb-8">
      <p className="text-sm font-medium text-emerald-700">{t("welcome")}</p>

      <h1 className="mt-1 text-2xl font-bold text-slate-900 sm:text-3xl">
        {t("title")}
      </h1>

      <p className="mt-2 text-sm text-slate-600">{t("description")}</p>
    </header>
  );
}
