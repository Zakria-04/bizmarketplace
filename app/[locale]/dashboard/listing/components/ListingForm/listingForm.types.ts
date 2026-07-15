import type { ListingType } from "@/types/listing.type";

export type ListingFormProps =
  | {
      mode: "create";
      initialValues?: never;
    }
  | {
      mode: "edit";
      initialValues: ListingType;
    };