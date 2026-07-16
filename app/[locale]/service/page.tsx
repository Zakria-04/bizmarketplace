import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  FiArrowLeft,
  FiBriefcase,
  FiFileText,
  FiImage,
  FiMessageCircle,
  FiStar,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";

import { Link } from "@/i18n/navigation";

type ServiceKey = "freeListing" | "sponsored" | "homepageAds" | "directContact";

type StepKey = "createAccount" | "submitListing" | "reachCustomers";

const SERVICES: Array<{
  key: ServiceKey;
  icon: IconType;
  iconStyle: string;
}> = [
  {
    key: "freeListing",
    icon: FiBriefcase,
    iconStyle: "bg-emerald-100 text-emerald-700",
  },
  {
    key: "sponsored",
    icon: FiStar,
    iconStyle: "bg-amber-100 text-amber-700",
  },
  {
    key: "homepageAds",
    icon: FiImage,
    iconStyle: "bg-violet-100 text-violet-700",
  },
  {
    key: "directContact",
    icon: FiMessageCircle,
    iconStyle: "bg-sky-100 text-sky-700",
  },
];

const STEPS: Array<{
  key: StepKey;
  icon: IconType;
}> = [
  {
    key: "createAccount",
    icon: FiUserPlus,
  },
  {
    key: "submitListing",
    icon: FiFileText,
  },
  {
    key: "reachCustomers",
    icon: FiTrendingUp,
  },
];

export default function ServicesPage() {
  const t = useTranslations("ServicesPage");

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-slate-950">
        <div className="absolute -start-28 -top-28 size-80 rounded-full bg-emerald-500/20 blur-3xl" />
        <div className="absolute -bottom-32 -end-20 size-96 rounded-full bg-violet-500/15 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="max-w-3xl">
            <span className="inline-flex rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2 text-sm font-medium text-emerald-300">
              {t("hero.badge")}
            </span>

            <h1 className="mt-6 text-4xl leading-tight font-bold text-white sm:text-5xl lg:text-6xl">
              {t("hero.title")}
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-8 text-slate-300 sm:text-lg">
              {t("hero.description")}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 font-semibold text-white transition hover:bg-emerald-400"
              >
                {t("hero.primaryCta")}
                <FiArrowLeft />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10"
              >
                {t("hero.secondaryCta")}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-emerald-600">
            {t("services.label")}
          </p>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            {t("services.title")}
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            {t("services.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {SERVICES.map(({ key, icon: Icon, iconStyle }) => (
            <article
              key={key}
              className="group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-xl hover:shadow-slate-200/60 sm:p-8"
            >
              <div
                className={`flex size-13 items-center justify-center rounded-xl ${iconStyle}`}
              >
                <Icon className="text-2xl" />
              </div>

              <h3 className="mt-6 text-xl font-bold">
                {t(`services.items.${key}.title`)}
              </h3>

              <p className="mt-3 leading-7 text-slate-600">
                {t(`services.items.${key}.description`)}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="font-semibold text-emerald-600">
              {t("process.label")}
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              {t("process.title")}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {STEPS.map(({ key, icon: Icon }, index) => (
              <article
                key={key}
                className="relative rounded-2xl border border-slate-200 bg-white p-7"
              >
                <span className="absolute top-6 end-6 text-5xl font-bold text-slate-100">
                  {index + 1}
                </span>

                <div className="flex size-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                  <Icon className="text-xl" />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {t(`process.steps.${key}.title`)}
                </h3>

                <p className="mt-3 leading-7 text-slate-600">
                  {t(`process.steps.${key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-emerald-600 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("cta.title")}</h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-50">
            {t("cta.description")}
          </p>

          <Link
            href="/auth/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-emerald-700 transition hover:bg-emerald-50"
          >
            {t("cta.button")}
            <FiArrowLeft />
          </Link>
        </div>
      </section>
    </main>
  );
}
