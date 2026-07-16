"use client";

import Image from "next/image";
import {
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useTranslations } from "next-intl";
import { FiGlobe, FiImage, FiInstagram, FiPhone, FiSave } from "react-icons/fi";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa";

import { useRouter } from "@/i18n/navigation";
import { useListingStore } from "@/store/listingStore";
import type { ListingPrimaryCta, ListingType } from "@/types/listing.type";

const tagOptions = [
  "restaurants",
  "retail",
  "services",
  "marketing",
  "suppliers",
  "printing",
  "website-builder",
  "online-store",
] as const;

const primaryCtaOptions: ListingPrimaryCta[] = [
  "website",
  "whatsapp",
  "instagram",
  "facebook",
];

type ListingFormProps =
  | {
      mode: "create";
      initialValues?: never;
    }
  | {
      mode: "edit";
      initialValues: ListingType;
    };

export default function ListingForm(props: ListingFormProps) {
  const t = useTranslations("Dashboard.createListing");
  const router = useRouter();

  const isEditing = props.mode === "edit";

  const initialValues = isEditing ? props.initialValues : undefined;

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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files?.[0] ?? null;

    setImage(selectedImage);
    setFormError(null);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((currentTags) =>
      currentTags.includes(tag)
        ? currentTags.filter((currentTag) => currentTag !== tag)
        : [...currentTags, tag],
    );
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

    const primaryCta = values.get("primaryCta") as ListingPrimaryCta;

    const links = {
      phone: String(values.get("phone") ?? "").trim(),
      website: String(values.get("website") ?? "").trim(),
      whatsapp: String(values.get("whatsapp") ?? "").trim(),
      instagram: String(values.get("instagram") ?? "").trim(),
      facebook: String(values.get("facebook") ?? "").trim(),
    };

    if (!links[primaryCta]) {
      setFormError(t("errors.primaryLinkRequired"));
      return;
    }

    const cleanLinks = Object.fromEntries(
      Object.entries(links).filter(([, value]) => value),
    );

    const payload = new FormData();

    payload.append("title", String(values.get("title") ?? "").trim());

    payload.append(
      "description",
      String(values.get("description") ?? "").trim(),
    );

    payload.append("tags", JSON.stringify(selectedTags));
    payload.append("links", JSON.stringify(cleanLinks));
    payload.append("primaryCta", primaryCta);

    // During editing, only send an image if the user selected a new one.
    if (image) {
      payload.append("image", image);
    }

    try {
      const saved = isEditing
        ? await updateListing(props.initialValues._id, payload)
        : await createNewListing(payload);

      if (saved) {
        router.replace("/dashboard");
        return;
      }

      setFormError(
        t(isEditing ? "errors.updateFailed" : "errors.createFailed"),
      );
    } catch {
      setFormError(
        t(isEditing ? "errors.updateFailed" : "errors.createFailed"),
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="mb-5">
          <h2 className="font-semibold text-slate-900">
            {t("sections.basic.title")}
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            {t("sections.basic.description")}
          </p>
        </div>

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
                onChange={handleImageChange}
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
              defaultValue={initialValues?.title ?? ""}
              placeholder={t("fields.titlePlaceholder")}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
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
              defaultValue={initialValues?.description ?? ""}
              placeholder={t("fields.descriptionPlaceholder")}
              className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold text-slate-900">
          {t("sections.tags.title")}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {t("sections.tags.description")}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {tagOptions.map((tag) => {
            const selected = selectedTags.includes(tag);

            return (
              <button
                key={tag}
                type="button"
                aria-pressed={selected}
                onClick={() => toggleTag(tag)}
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
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <h2 className="font-semibold text-slate-900">
          {t("sections.links.title")}
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          {t("sections.links.description")}
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <LinkInput
            name="phone"
            type="tel"
            label={t("fields.phone")}
            placeholder="050-000-0000"
            icon={<FiPhone />}
            defaultValue={initialValues?.links.phone}
          />

          <LinkInput
            name="whatsapp"
            type="url"
            label={t("fields.whatsapp")}
            placeholder="https://wa.me/972..."
            icon={<FaWhatsapp />}
            defaultValue={initialValues?.links.whatsapp}
          />

          <LinkInput
            name="website"
            type="url"
            label={t("fields.website")}
            placeholder="https://example.com"
            icon={<FiGlobe />}
            defaultValue={initialValues?.links.website}
          />

          <LinkInput
            name="instagram"
            type="url"
            label={t("fields.instagram")}
            placeholder="https://instagram.com/..."
            icon={<FiInstagram />}
            defaultValue={initialValues?.links.instagram}
          />

          <LinkInput
            name="facebook"
            type="url"
            label={t("fields.facebook")}
            placeholder="https://facebook.com/..."
            icon={<FaFacebookF />}
            defaultValue={initialValues?.links.facebook}
          />
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <label
          htmlFor="primaryCta"
          className="block font-semibold text-slate-900"
        >
          {t("sections.primaryCta.title")}
        </label>

        <p className="mt-1 text-sm text-slate-500">
          {t("sections.primaryCta.description")}
        </p>

        <select
          id="primaryCta"
          name="primaryCta"
          required
          defaultValue={initialValues?.primaryCta ?? ""}
          className="mt-4 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        >
          <option value="" disabled>
            {t("fields.primaryCtaPlaceholder")}
          </option>

          {primaryCtaOptions.map((option) => (
            <option key={option} value={option}>
              {t(`primaryCta.${option}`)}
            </option>
          ))}
        </select>
      </section>

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

type LinkInputProps = {
  name: string;
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
          className="w-full rounded-xl border border-slate-300 py-3 ps-10 pe-4 text-left text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
        />
      </div>
    </div>
  );
}
