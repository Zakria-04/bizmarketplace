"use client";

import { useTranslations } from "next-intl";
import { FiSave } from "react-icons/fi";

import {
  BasicInformationSection,
  LinksSection,
  PrimaryCtaSection,
  TagsSection,
} from "./ListingFormSections";
import type { ListingFormProps } from "./listingForm.types";
import { useListingForm } from "./useListingForm";

export default function ListingForm(props: ListingFormProps) {
  const t = useTranslations("Dashboard.createListing");

  const {
    initialValues,
    isEditing,
    isLoading,
    selectedTags,
    previewUrl,
    formError,
    handleImageChange,
    toggleTag,
    handleSubmit,
  } = useListingForm(props);

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <BasicInformationSection
        previewUrl={previewUrl}
        initialTitle={initialValues?.title}
        initialDescription={initialValues?.description}
        onImageChange={handleImageChange}
      />

      <TagsSection selectedTags={selectedTags} onToggleTag={toggleTag} />

      <LinksSection initialLinks={initialValues?.links} />

      <PrimaryCtaSection initialValue={initialValues?.primaryCta} />

      {formError && (
        <p
          role="alert"
          className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
        >
          {formError}
        </p>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-60"
      >
        <FiSave />

        {isLoading
          ? t(isEditing ? "updating" : "submitting")
          : t(isEditing ? "update" : "submit")}
      </button>
    </form>
  );
}
