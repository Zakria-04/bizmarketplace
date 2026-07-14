import type { Recommendation } from "@/types/recommendation";
import shopifyLogo from "@/assets/images/business-logo/shopify.png";
import wixLogo from "@/assets/images/business-logo/wix.png";
import woocommerceLogo from "@/assets/images/business-logo/woocommerce.png";
import webflowLogo from "@/assets/images/business-logo/webflow.jpg";

export const demoRecommendations: Recommendation[] = [
  {
    _id: "1",
    title: "Jelofy",
    slug: "jelofy",
    description: "Create a digital QR menu for your restaurant.",
    tags: ["restaurants", "retail"],
    coverImage: "",
    sponsored: true,
  },
  {
    _id: "2",
    title: "OddMenu",
    slug: "oddmenu",
    description: "Digital menus and ordering tools for restaurants.",
    tags: ["restaurants"],
  },
  {
    _id: "3",
    title: "Shopify",
    slug: "shopify",
    description: "Create and manage a professional online store.",
    tags: ["retail", "online-store"],
    logo: shopifyLogo,
    sponsored: true,
  },
  {
    _id: "4",
    title: "Wix",
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
    _id: "5",
    title: "Fresha",
    slug: "fresha",
    description: "Manage appointments and bookings for your business.",
    tags: ["beauty"],
  },
  {
    _id: "6",
    title: "Canva",
    slug: "canva",
    description: "Create designs and social media content.",
    tags: ["restaurants", "retail", "beauty", "services"],
  },
  {
    _id: "7",
    title: "WooCommerce",
    slug: "woocommerce",
    description: "Turn a WordPress website into a customizable online store.",
    tags: ["retail", "online-store"],
    logo: woocommerceLogo,
  },
  {
    _id: "8",
    title: "Squarespace",
    slug: "squarespace",
    description: "Create a polished business website without coding.",
    tags: ["website-builder"],
    logo: webflowLogo,
  },
  {
    _id: "9",
    title: "Webflow",
    slug: "webflow",
    description: "Build advanced and highly customizable business websites.",
    tags: ["website-builder"],
    logo: webflowLogo,
  },
  {
    _id: "10",
    title: "WordPress",
    slug: "wordpress",
    description: "Build a website or online store for your business.",
    tags: ["online-store", "website-builder"],
  },
];
