import type { Recommendation } from "@/types/recommendation";

export const demoRecommendations: Recommendation[] = [
  {
    id: "1",
    name: "Jelofy",
    slug: "jelofy",
    description: "Create a digital QR menu for your restaurant.",
    categories: ["restaurants"],
    sponsored: true,
  },
  {
    id: "2",
    name: "OddMenu",
    slug: "oddmenu",
    description: "Digital menus and ordering tools for restaurants.",
    categories: ["restaurants"],
  },
  {
    id: "3",
    name: "Shopify",
    slug: "shopify",
    description: "Create and manage an online store.",
    categories: ["retail"],
  },
  {
    id: "4",
    name: "Wix",
    slug: "wix",
    description: "Build a professional website for your business.",
    categories: ["restaurants", "retail", "beauty", "services"],
  },
  {
    id: "5",
    name: "Fresha",
    slug: "fresha",
    description: "Manage appointments and bookings for your business.",
    categories: ["beauty"],
  },
  {
    id: "6",
    name: "Canva",
    slug: "canva",
    description: "Create designs and social media content.",
    categories: ["restaurants", "retail", "beauty", "services"],
  },
];
