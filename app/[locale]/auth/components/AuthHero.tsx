"use client";

import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import { FiSearch, FiShield, FiStar } from "react-icons/fi";

import Brand from "./Brand";
import GrowthOverviewCard from "./GrowthOverviewCard";

type FeatureProps = {
  icon: IconType;
  title: string;
  description: string;
};

function Feature({ icon: Icon, title, description }: FeatureProps) {
  return (
    <div className="flex items-start gap-4">
      <div className="grid size-11 shrink-0 place-items-center rounded-2xl border border-emerald-100/20 bg-white/10 shadow-sm backdrop-blur-sm">
        <Icon className="size-5 text-emerald-200" />
      </div>

      <div>
        <h2 className="font-semibold text-white">{title}</h2>

        <p className="mt-1 max-w-sm text-sm leading-6 text-emerald-50/75">
          {description}
        </p>
      </div>
    </div>
  );
}

export default function AuthHero() {
  const t = useTranslations("Auth");

  return (
    <section className="relative hidden h-dvh overflow-hidden bg-[#022c22] lg:sticky lg:top-0 lg:flex cursor-default">
      {/* Main background */}
      <div className="absolute inset-0 bg-[linear-gradient(145deg,#022c22_0%,#065f46_55%,#d1fae5_100%)]" />

      {/* Background glow effects */}
      <div className="absolute -inset-s-32 top-32 size-105 rounded-full bg-emerald-400/20 blur-3xl" />

      <div className="absolute inset-e-0 top-0 size-125 rounded-full bg-teal-200/25 blur-3xl" />

      <div className="absolute inset-e-20 bottom-0 size-80 rounded-full bg-lime-200/15 blur-3xl" />

      {/* Subtle dark overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-e from-transparent via-emerald-950/5 to-emerald-950/20" />

      <div className="relative z-10 flex w-full flex-col px-10 py-9 xl:px-16 xl:py-12">
        <Brand light />

        <div className="mt-14 max-w-xl">
          <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
            {t("hero.title")}
          </h1>

          <p className="mt-5 max-w-lg text-base leading-7 text-emerald-50/80 xl:text-lg">
            {t("hero.description")}
          </p>
        </div>

        <div className="mt-9 space-y-5">
          <Feature
            icon={FiShield}
            title={t("hero.trusted.title")}
            description={t("hero.trusted.description")}
          />

          <Feature
            icon={FiStar}
            title={t("hero.recommendations.title")}
            description={t("hero.recommendations.description")}
          />

          <Feature
            icon={FiSearch}
            title={t("hero.discovery.title")}
            description={t("hero.discovery.description")}
          />
        </div>

        <div className="perspective-[1000px] absolute inset-e-12 bottom-12 z-20">
          <div
            className="
              origin-right opacity-95
              transform-3d
              transform-[rotateY(-10deg)_rotateX(4deg)_rotateZ(-1deg)]
              transition-transform duration-500
              hover:transform-[rotateY(-6deg)_rotateX(2deg)_rotateZ(0deg)_translateY(-4px)]
              rtl:origin-left
              rtl:transform-[rotateY(10deg)_rotateX(4deg)_rotateZ(1deg)]
              rtl:hover:transform-[rotateY(6deg)_rotateX(2deg)_rotateZ(0deg)_translateY(-4px)]
            "
          >
            <GrowthOverviewCard />
          </div>
        </div>
      </div>
    </section>
  );
}
