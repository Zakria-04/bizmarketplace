import { getTranslations } from "next-intl/server";
import { FiArrowRight } from "react-icons/fi";

import { Link } from "@/i18n/navigation";
import ListingForm from "../components/ListingForm";

export default async function CreateListingPage() {
  const t = await getTranslations("Dashboard.createListing");

  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:py-12">
        <Link
          href="/dashboard"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-emerald-700"
        >
          <FiArrowRight />
          {t("back")}
        </Link>

        <header className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            {t("title")}
          </h1>

          <p className="mt-2 text-sm text-slate-600">{t("description")}</p>
        </header>

        <ListingForm mode="create" />
      </div>
    </main>
  );
}
