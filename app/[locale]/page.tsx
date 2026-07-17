import Image from "next/image";

import Header from "@/components/Header";
import Hero from "@/components/Hero";

import landingPageBg from "@/assets/images/landingPageBg.png";
import landingPageBgMobile from "@/assets/images/landingPageBgMobile.png";
import Categories from "@/components/Categories";
import RenderCards from "@/components/RenderCards";
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
          className="-z-10 object-cover object-right md:object-center"
          sizes="(min-width: 768px) 100vw, 100vw"
        />

        <div className="px-2 py-1 lg:px-3 lg:py-4.5">
          <Header />
        </div>
        <Hero />
      </section>
      {/* <Categories /> */}
      <RenderCards />
      {/* <BusinessHelpRecommendations  /> */}
    </main>
  );
}
