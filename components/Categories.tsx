import type { IconType } from "react-icons";
import { FaBriefcase, FaShoppingBag, FaSpa, FaUtensils } from "react-icons/fa";
import { useTranslations } from "next-intl";

import { Link } from "@/i18n/navigation";

type Category = {
  key: "restaurants" | "retail" | "beauty" | "services";
  slug: string;
  icon: IconType;
  iconStyle: string;
};

const CATEGORIES: Category[] = [
  {
    key: "restaurants",
    slug: "restaurants-cafes",
    icon: FaUtensils,
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    key: "retail",
    slug: "retail-ecommerce",
    icon: FaShoppingBag,
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    key: "beauty",
    slug: "beauty-wellness",
    icon: FaSpa,
    iconStyle: "bg-pink-50 text-pink-600",
  },
  {
    key: "services",
    slug: "professional-services",
    icon: FaBriefcase,
    iconStyle: "bg-amber-50 text-amber-600",
  },
];

export default function Categories() {
  const t = useTranslations("LandingPage.Categories");

  return (
    <section className="mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-7">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {t("title")}
        </h2>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500 sm:text-base">
          {t("description")}
        </p>
      </div>

      <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {CATEGORIES.map(({ key, slug, icon: Icon, iconStyle }) => (
          <li key={key}>
            <Link
              href={`/categories/${slug}`}
              className="group flex min-h-24 items-center gap-3 rounded-2xl border border-gray-200 bg-white p-3 transition duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-lg sm:p-4"
            >
              <span
                className={`flex size-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105 sm:size-14 ${iconStyle}`}
              >
                <Icon className="size-5 sm:size-6" aria-hidden="true" />
              </span>

              <span className="text-sm font-semibold leading-5 text-gray-800 sm:text-base">
                {t(`items.${key}`)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
