"use client";

import { type FormEvent, useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";

import { useRouter } from "@/i18n/navigation";
import { useListingStore } from "@/store/listingStore";
import type { ListingPrimaryCta, ListingType } from "@/types/listing.type";

import type { ListingTag } from "./listingForm.constants";
import type { ListingFormProps } from "./listingForm.types";

type ListingLinkValues = {
  phone: string;
  website: string;
  whatsapp: string;
  instagram: string;
  facebook: string;
};

export function useListingForm(props: ListingFormProps) {
  const t = useTranslations("Dashboard.createListing");
  const router = useRouter();

  const isEditing = props.mode === "edit";

  const initialValues = props.mode === "edit" ? props.initialValues : undefined;

  const createNewListing = useListingStore((state) => state.createNewListing);

  const updateListing = useListingStore((state) => state.updateListing);

  const isLoading = useListingStore((state) => state.isLoading);

  const [image, setImage] = useState<File | null>(null);

  const [selectedTags, setSelectedTags] = useState<string[]>(
    initialValues?.tags ?? [],
  );

  const [formError, setFormError] = useState<string | null>(null);

  const selectedImagePreview = useMemo(
    () => (image ? URL.createObjectURL(image) : null),
    [image],
  );

  const previewUrl =
    selectedImagePreview ?? initialValues?.images[0]?.url ?? null;

  useEffect(() => {
    return () => {
      if (selectedImagePreview) {
        URL.revokeObjectURL(selectedImagePreview);
      }
    };
  }, [selectedImagePreview]);

  const handleImageChange = (selectedImage: File | null) => {
    setImage(selectedImage);
    setFormError(null);
  };

  const toggleTag = (tag: ListingTag) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );

    setFormError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    const values = new FormData(event.currentTarget);

    if (!isEditing && !image) {
      setFormError(t("errors.imageRequired"));
      return;
    }

    if (selectedTags.length === 0) {
      setFormError(t("errors.tagRequired"));
      return;
    }

    const primaryCta = getFormValue(values, "primaryCta") as ListingPrimaryCta;

    const links = getListingLinks(values);

    if (!links[primaryCta]) {
      setFormError(t("errors.primaryLinkRequired"));
      return;
    }

    const payload = createListingPayload({
      values,
      tags: selectedTags,
      links,
      primaryCta,
      image,
    });

    const requestError = isEditing
      ? t("errors.updateFailed")
      : t("errors.createFailed");

    try {
      const saved =
        props.mode === "edit"
          ? await updateListing(props.initialValues._id, payload)
          : await createNewListing(payload);

    console.log("saved successfully", saved);
    

      if (!saved) {
        setFormError(requestError);
        return;
      }

      router.replace("/dashboard");
    } catch {
      setFormError(requestError);
    }
  };

  return {
    initialValues,
    isEditing,
    isLoading,
    selectedTags,
    previewUrl,
    formError,
    handleImageChange,
    toggleTag,
    handleSubmit,
  };
}

function getFormValue(values: FormData, key: string) {
  return String(values.get(key) ?? "").trim();
}

function getListingLinks(values: FormData): ListingLinkValues {
  return {
    phone: getFormValue(values, "phone"),
    website: getFormValue(values, "website"),
    whatsapp: getFormValue(values, "whatsapp"),
    instagram: getFormValue(values, "instagram"),
    facebook: getFormValue(values, "facebook"),
  };
}

type CreatePayloadParameters = {
  values: FormData;
  tags: string[];
  links: ListingLinkValues;
  primaryCta: ListingPrimaryCta;
  image: File | null;
};

function createListingPayload({
  values,
  tags,
  links,
  primaryCta,
  image,
}: CreatePayloadParameters) {
  const payload = new FormData();

  const cleanLinks = Object.fromEntries(
    Object.entries(links).filter(([, value]) => value),
  ) as ListingType["links"];

  payload.append("title", getFormValue(values, "title"));

  payload.append("description", getFormValue(values, "description"));

  payload.append("tags", JSON.stringify(tags));
  payload.append("links", JSON.stringify(cleanLinks));
  payload.append("primaryCta", primaryCta);

  if (image) {
    payload.append("image", image);
  }

  return payload;
}
