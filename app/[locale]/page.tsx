import Image from "next/image";

import Header from "@/components/Header";
import Hero from "@/components/Hero";

import landingPageBg from "@/assets/images/landingPageBg.png";
import landingPageBgMobile from "@/assets/images/landingPageBgMobile.png";
import Categories from "@/components/Categories";
import RenderCards from "@/components/RenderCards";
import { demoRecommendations } from "@/assets/data/demoRecommendations";
import BusinessHelpRecommendations from "@/components/BusinessHelpRecommendations";

export default function LandingPage() {
  return (
    <main>
      <section className="relative overflow-hidden">
        {/* Desktop background */}
        <Image
          src={landingPageBg}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="-z-10 hidden object-cover object-center md:block"
          sizes="(min-width: 768px) 100vw, 100vw"
        />

        {/* Mobile background */}
        <Image
          src={landingPageBgMobile}
          alt=""
          fill
          priority
          aria-hidden="true"
          className="-z-10 object-cover object-center md:hidden"
          sizes="(min-width: 768px) 100vw, 100vw"
        />

        <div className="px-3 py-4.5">
          <Header />
        </div>
        <Hero />
      </section>
      {/* <Categories /> */}
      <RenderCards recommendations={demoRecommendations} />
      <BusinessHelpRecommendations recommendations={demoRecommendations} />
    </main>
  );
}
