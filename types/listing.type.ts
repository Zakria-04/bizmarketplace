export type ListingPrimaryCta =
  | "website"
  | "whatsapp"
  | "instagram"
  | "facebook"

export type ListingType = {
  _id: string;
  title: string;
  description: string;
  tags: string[];
  images: {
    url: string;
    publicId: string;
  }[];
  sponsored?: boolean;
  links: {
    phone?: string;
    website?: string;
    facebook?: string;
    instagram?: string;
    whatsapp?: string;
  };
  primaryCta?: ListingPrimaryCta;
  approvalStatus: "pending" | "approved" | "rejected";
};

export type ListingStoreType = {
  isLoading: boolean;
  errorCode: string | null;
  listings: ListingType[];
  userListings: ListingType[];

  // Functions
  getAllListings: () => Promise<void>;
  getUserListings: () => Promise<void>;
  createNewListing: (listingData: FormData) => Promise<void>;
  updateListing: (listingId: string, listingData: FormData) => Promise<boolean>;
};
