"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useTranslations } from "next-intl";
import type { IconType } from "react-icons";
import {
  FiGlobe,
  FiImage,
  FiInstagram,
  FiPhone,
} from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

import type {
  ListingPrimaryCta,
  ListingType,
} from "@/types/listing.type";

import {
  LISTING_TAG_OPTIONS,
  PRIMARY_CTA_OPTIONS,
  type ListingTag,
} from "./listingForm.constants";

const inputClassName =
  "w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100";

type BasicInformationSectionProps = {
  previewUrl: string | null;
  initialTitle?: string;
  initialDescription?: string;
  onImageChange: (image: File | null) => void;
};

export function BasicInformationSection({
  previewUrl,
  initialTitle,
  initialDescription,
  onImageChange,
}: BasicInformationSectionProps) {
  const t = useTranslations("Dashboard.createListing");

  return (
    <FormSection
      title={t("sections.basic.title")}
      description={t("sections.basic.description")}
    >
      <div className="space-y-5">
        <div>
          <span className="mb-2 block text-sm font-medium text-slate-700">
            {t("fields.image")}
          </span>

          <label className="relative flex min-h-52 cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-slate-300 bg-slate-50 transition hover:border-emerald-400 hover:bg-emerald-50/40">
            {previewUrl ? (
              <>
                <Image
                  src={previewUrl}
                  alt={t("fields.imagePreview")}
                  fill
                  unoptimized
                  className="object-cover"
                />

                <span className="absolute bottom-3 rounded-lg bg-black/65 px-3 py-1.5 text-xs font-medium text-white">
                  {t("fields.changeImage")}
                </span>
              </>
            ) : (
              <div className="px-4 text-center">
                <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-white text-emerald-700 shadow-sm">
                  <FiImage className="size-5" />
                </div>

                <p className="mt-3 text-sm font-medium text-slate-700">
                  {t("fields.uploadImage")}
                </p>

                <p className="mt-1 text-xs text-slate-500">
                  {t("fields.imageHint")}
                </p>
              </div>
            )}

            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(event) =>
                onImageChange(event.target.files?.[0] ?? null)
              }
              className="sr-only"
            />
          </label>
        </div>

        <div>
          <label
            htmlFor="title"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            {t("fields.title")}
          </label>

          <input
            id="title"
            name="title"
            type="text"
            required
            maxLength={80}
            defaultValue={initialTitle}
            placeholder={t("fields.titlePlaceholder")}
            className={inputClassName}
          />
        </div>

        <div>
          <label
            htmlFor="description"
            className="mb-2 block text-sm font-medium text-slate-700"
          >
            {t("fields.description")}
          </label>

          <textarea
            id="description"
            name="description"
            required
            rows={5}
            maxLength={1000}
            defaultValue={initialDescription}
            placeholder={t("fields.descriptionPlaceholder")}
            className={`${inputClassName} resize-none`}
          />
        </div>
      </div>
    </FormSection>
  );
}

type TagsSectionProps = {
  selectedTags: string[];
  onToggleTag: (tag: ListingTag) => void;
};

export function TagsSection({
  selectedTags,
  onToggleTag,
}: TagsSectionProps) {
  const t = useTranslations("Dashboard.createListing");

  return (
    <FormSection
      title={t("sections.tags.title")}
      description={t("sections.tags.description")}
    >
      <div className="flex flex-wrap gap-2">
        {LISTING_TAG_OPTIONS.map((tag) => {
          const selected = selectedTags.includes(tag);

          return (
            <button
              key={tag}
              type="button"
              aria-pressed={selected}
              onClick={() => onToggleTag(tag)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                selected
                  ? "border-emerald-600 bg-emerald-600 text-white"
                  : "border-slate-200 bg-white text-slate-700 hover:border-emerald-300 hover:bg-emerald-50"
              }`}
            >
              {t(`tags.${tag}`)}
            </button>
          );
        })}
      </div>
    </FormSection>
  );
}

type LinksSectionProps = {
  initialLinks?: ListingType["links"];
};

export function LinksSection({
  initialLinks,
}: LinksSectionProps) {
  const t = useTranslations("Dashboard.createListing");

  return (
    <FormSection
      title={t("sections.links.title")}
      description={t("sections.links.description")}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {LINK_FIELDS.map((field) => {
          const Icon = field.icon;

          return (
            <LinkInput
              key={field.name}
              name={field.name}
              type={field.type}
              label={t(`fields.${field.name}`)}
              placeholder={field.placeholder}
              icon={<Icon />}
              defaultValue={initialLinks?.[field.name]}
            />
          );
        })}
      </div>
    </FormSection>
  );
}

type PrimaryCtaSectionProps = {
  initialValue?: ListingPrimaryCta;
};

export function PrimaryCtaSection({
  initialValue,
}: PrimaryCtaSectionProps) {
  const t = useTranslations("Dashboard.createListing");

  return (
    <FormSection
      title={t("sections.primaryCta.title")}
      description={t("sections.primaryCta.description")}
    >
      <select
        id="primaryCta"
        name="primaryCta"
        required
        defaultValue={initialValue ?? ""}
        className={inputClassName}
      >
        <option value="" disabled>
          {t("fields.primaryCtaPlaceholder")}
        </option>

        {PRIMARY_CTA_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {t(`primaryCta.${option}`)}
          </option>
        ))}
      </select>
    </FormSection>
  );
}

type FormSectionProps = {
  title: string;
  description: string;
  children: ReactNode;
};

function FormSection({
  title,
  description,
  children,
}: FormSectionProps) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-5">
        <h2 className="font-semibold text-slate-900">
          {title}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {description}
        </p>
      </div>

      {children}
    </section>
  );
}

type LinkName = keyof ListingType["links"];

type LinkField = {
  name: LinkName;
  type: "url" | "tel";
  placeholder: string;
  icon: IconType;
};

const LINK_FIELDS = [
  {
    name: "phone",
    type: "tel",
    placeholder: "050-000-0000",
    icon: FiPhone,
  },
  {
    name: "whatsapp",
    type: "url",
    placeholder: "https://wa.me/972...",
    icon: FaWhatsapp,
  },
  {
    name: "website",
    type: "url",
    placeholder: "https://example.com",
    icon: FiGlobe,
  },
  {
    name: "instagram",
    type: "url",
    placeholder: "https://instagram.com/...",
    icon: FiInstagram,
  },
  {
    name: "facebook",
    type: "url",
    placeholder: "https://facebook.com/...",
    icon: FaFacebookF,
  },
] as const satisfies readonly LinkField[];

type LinkInputProps = {
  name: LinkName;
  type: "url" | "tel";
  label: string;
  placeholder: string;
  icon: ReactNode;
  defaultValue?: string;
};

function LinkInput({
  name,
  type,
  label,
  placeholder,
  icon,
  defaultValue,
}: LinkInputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="mb-2 block text-sm font-medium text-slate-700"
      >
        {label}
      </label>

      <div className="relative">
        <span className="pointer-events-none absolute inset-y-0 inset-s-0 flex items-center ps-3.5 text-slate-400">
          {icon}
        </span>

        <input
          id={name}
          name={name}
          type={type}
          dir="ltr"
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`${inputClassName} ps-10 text-left`}
        />
      </div>
    </div>
  );
}