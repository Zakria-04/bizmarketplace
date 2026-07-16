import { useTranslations } from "next-intl";
import {
  FiCheckCircle,
  FiMapPin,
  FiMessageCircle,
  FiSearch,
  FiTrendingUp,
  FiUserPlus,
} from "react-icons/fi";

import { Link } from "@/i18n/navigation";

export default function AboutPage() {
  const t = useTranslations("About");

  const benefits = [
    {
      Icon: FiSearch,
      title: t("benefits.relevance.title"),
      description: t("benefits.relevance.description"),
    },
    {
      Icon: FiMessageCircle,
      title: t("benefits.contact.title"),
      description: t("benefits.contact.description"),
    },
    {
      Icon: FiMapPin,
      title: t("benefits.local.title"),
      description: t("benefits.local.description"),
    },
  ];

  const steps = [
    {
      Icon: FiUserPlus,
      title: t("steps.create.title"),
      description: t("steps.create.description"),
    },
    {
      Icon: FiCheckCircle,
      title: t("steps.review.title"),
      description: t("steps.review.description"),
    },
    {
      Icon: FiTrendingUp,
      title: t("steps.grow.title"),
      description: t("steps.grow.description"),
    },
  ];

  return (
    <main className="bg-white text-slate-900">
      <section className="relative overflow-hidden border-b border-slate-100 bg-slate-50">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.12),transparent_45%)]" />

        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-28">
          <div>
            <span className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
              {t("eyebrow")}
            </span>

            <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl">
              {t("title")}
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              {t("description")}
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/signup"
                className="inline-flex min-h-12 items-center justify-center rounded-xl bg-emerald-600 px-6 font-semibold text-white transition hover:bg-emerald-700"
              >
                {t("actions.addBusiness")}
              </Link>

              <Link
                href="/"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white px-6 font-semibold text-slate-700 transition hover:border-emerald-300 hover:text-emerald-700"
              >
                {t("actions.explore")}
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-8 rounded-full bg-emerald-200/30 blur-3xl" />

            <div className="relative rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                <FiTrendingUp className="size-6" />
              </div>

              <blockquote className="mt-6 text-xl leading-9 font-semibold text-slate-900">
                “{t("highlight.quote")}”
              </blockquote>

              <p className="mt-4 leading-7 text-slate-600">
                {t("highlight.description")}
              </p>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {[
                  t("highlight.clear"),
                  t("highlight.relevant"),
                  t("highlight.direct"),
                ].map((item) => (
                  <div
                    key={item}
                    className="rounded-xl bg-slate-50 p-3 text-center text-sm font-medium text-slate-700"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-semibold text-emerald-600">
            {t("benefits.eyebrow")}
          </p>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {t("benefits.title")}
          </h2>

          <p className="mt-4 leading-7 text-slate-600">
            {t("benefits.description")}
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {benefits.map(({ Icon, title, description }) => (
            <article
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-lg"
            >
              <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <Icon className="size-6" />
              </div>

              <h3 className="mt-5 text-xl font-semibold">{title}</h3>

              <p className="mt-3 leading-7 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <p className="font-semibold text-emerald-600">
              {t("steps.eyebrow")}
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {t("steps.title")}
            </h2>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {steps.map(({ Icon, title, description }, index) => (
              <article
                key={title}
                className="relative rounded-2xl border border-slate-200 bg-white p-6"
              >
                <span className="absolute top-5 inset-e-5 text-4xl font-bold text-slate-100">
                  {index + 1}
                </span>

                <div className="flex size-12 items-center justify-center rounded-xl bg-emerald-600 text-white">
                  <Icon className="size-6" />
                </div>

                <h3 className="mt-5 text-xl font-semibold">{title}</h3>

                <p className="mt-3 leading-7 text-slate-600">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-emerald-950 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="text-3xl font-bold sm:text-4xl">{t("cta.title")}</h2>

          <p className="mx-auto mt-4 max-w-2xl leading-7 text-emerald-100">
            {t("cta.description")}
          </p>

          <Link
            href="/auth/signup"
            className="mt-8 inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-6 font-semibold text-emerald-900 transition hover:bg-emerald-50"
          >
            {t("cta.button")}
          </Link>
        </div>
      </section>
    </main>
  );
}
