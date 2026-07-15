"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { useListingStore } from "@/store/listingStore";

import ListingForm from "./ListingForm";

type EditListingContentProps = {
  listingId: string;
};

export default function EditListingContent({
  listingId,
}: EditListingContentProps) {
  const t = useTranslations("Dashboard.createListing");
  const [hasFetched, setHasFetched] = useState(false);

  const listing = useListingStore((state) =>
    state.userListings.find((item) => item._id === listingId),
  );

  const getUserListings = useListingStore(
    (state) => state.getUserListings,
  );

  useEffect(() => {
    if (listing) {
      return;
    }

    let isMounted = true;

    const loadListing = async () => {
      try {
        await getUserListings();
      } finally {
        if (isMounted) {
          setHasFetched(true);
        }
      }
    };

    void loadListing();

    return () => {
      isMounted = false;
    };
  }, [getUserListings, listing]);

  if (!listing && !hasFetched) {
    return <EditListingSkeleton />;
  }

  if (!listing) {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">
        <p className="font-medium text-red-700">
          {t("listingNotFound")}
        </p>
      </div>
    );
  }

  return <ListingForm mode="edit" initialValues={listing} />;
}

function EditListingSkeleton() {
  return (
    <div
      className="animate-pulse space-y-5 rounded-2xl border border-slate-200 bg-white p-6"
      aria-hidden="true"
    >
      <div className="h-6 w-40 rounded bg-slate-200" />
      <div className="h-52 rounded-xl bg-slate-100" />
      <div className="h-12 rounded-xl bg-slate-100" />
      <div className="h-28 rounded-xl bg-slate-100" />
    </div>
  );
}