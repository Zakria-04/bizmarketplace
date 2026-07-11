import type { Recommendation } from "@/types/recommendation";
import shopifyLogo from "@/assets/images/business-logo/shopify.png";
import wixLogo from "@/assets/images/business-logo/wix.png";
import woocommerceLogo from "@/assets/images/business-logo/woocommerce.png";
import webflowLogo from "@/assets/images/business-logo/webflow.jpg";

export const demoRecommendations: Recommendation[] = [
  {
    id: "1",
    name: "Jelofy",
    slug: "jelofy",
    description: "Create a digital QR menu for your restaurant.",
    tags: ["restaurants", "retail"],
    coverImage: "",
    sponsored: true,
  },
  {
    id: "2",
    name: "OddMenu",
    slug: "oddmenu",
    description: "Digital menus and ordering tools for restaurants.",
    tags: ["restaurants"],
  },
  {
    id: "3",
    name: "Shopify",
    slug: "shopify",
    description: "Create and manage a professional online store.",
    tags: ["retail", "online-store"],
    logo: shopifyLogo,
    sponsored: true,
  },
  {
    id: "4",
    name: "Wix",
    slug: "wix",
    description: "Build a website or online store for your business.",
    tags: [
      "restaurants",
      "retail",
      "beauty",
      "services",
      "online-store",
      "website-builder",
    ],
    logo: wixLogo,
  },
  {
    id: "5",
    name: "Fresha",
    slug: "fresha",
    description: "Manage appointments and bookings for your business.",
    tags: ["beauty"],
  },
  {
    id: "6",
    name: "Canva",
    slug: "canva",
    description: "Create designs and social media content.",
    tags: ["restaurants", "retail", "beauty", "services"],
  },
  {
    id: "7",
    name: "WooCommerce",
    slug: "woocommerce",
    description: "Turn a WordPress website into a customizable online store.",
    tags: ["retail", "online-store"],
    logo: woocommerceLogo,
  },
  {
    id: "8",
    name: "Squarespace",
    slug: "squarespace",
    description: "Create a polished business website without coding.",
    tags: ["website-builder"],
    logo: webflowLogo,
  },
  {
    id: "9",
    name: "Webflow",
    slug: "webflow",
    description: "Build advanced and highly customizable business websites.",
    tags: ["website-builder"],
    logo: webflowLogo,
  },
  {
    id: "10",
    name: "WordPress",
    slug: "wordpress",
    description: "Build a website or online store for your business.",
    tags: ["online-store", "website-builder"],
  },
];
