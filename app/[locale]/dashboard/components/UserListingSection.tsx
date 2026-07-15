"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FiBriefcase } from "react-icons/fi";

import { useListingStore } from "@/store/listingStore";

import EmptyListingState from "./EmptyListingState";
import ListingCard from "./ListingCard";

export default function UserListingSection() {
  const t = useTranslations("Dashboard");
  const [initialLoading, setInitialLoading] = useState(true);

  const userListings = useListingStore((state) => state.userListings);
  const getUserListings = useListingStore((state) => state.getUserListings);

  useEffect(() => {
    let isMounted = true;

    const loadUserListings = async () => {
      try {
        await getUserListings();
      } finally {
        if (isMounted) {
          setInitialLoading(false);
        }
      }
    };

    void loadUserListings();

    return () => {
      isMounted = false;
    };
  }, [getUserListings]);

  const listing = userListings[0] ?? null;

  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5 flex items-center gap-3">
        <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
          <FiBriefcase className="size-5" />
        </div>

        <div>
          <h2 className="font-semibold text-slate-900">{t("listing.title")}</h2>

          <p className="text-sm text-slate-500">{t("listing.description")}</p>
        </div>
      </div>

      {initialLoading ? (
        <ListingSkeleton />
      ) : listing ? (
        <ListingCard listing={listing} />
      ) : (
        <EmptyListingState />
      )}
    </section>
  );
}

function ListingSkeleton() {
  return (
    <div
      className="animate-pulse rounded-xl border border-slate-200 p-4"
      aria-hidden="true"
    >
      <div className="h-5 w-40 rounded bg-slate-200" />
      <div className="mt-3 h-4 w-full max-w-md rounded bg-slate-100" />

      <div className="mt-5 flex gap-2">
        <div className="h-9 w-20 rounded-lg bg-slate-100" />
        <div className="h-9 w-20 rounded-lg bg-slate-100" />
      </div>
    </div>
  );
}
