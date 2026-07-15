import {
  ApiError,
  getAllLists,
  getUserListings,
  createNewListing,
  updateListingAPI,
} from "@/assets/res/api";
import { ListingStoreType } from "@/types/listing.type";
import { create } from "zustand";

export const useListingStore = create<ListingStoreType>((set) => ({
  isLoading: false,
  errorCode: null,
  listings: [],
  userListings: [],

  // Functions
  getAllListings: async () => {
    set({ isLoading: true, errorCode: null });
    try {
      const response = await getAllLists();

      set({ isLoading: false, listings: response?.data });
    } catch (error) {
      set({
        errorCode:
          error instanceof ApiError ? error.errorCode : "UNKNOWN_ERROR",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  getUserListings: async () => {
    set({ isLoading: true, errorCode: null });
    try {
      const response = await getUserListings();
      set({ isLoading: false, userListings: response?.data });
    } catch (error) {
      set({
        errorCode:
          error instanceof ApiError ? error.errorCode : "UNKNOWN_ERROR",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  createNewListing: async (listingData: FormData) => {
    set({ isLoading: true, errorCode: null });
    try {
      const response = await createNewListing(listingData);
      return response.data;
    } catch (error) {
      set({
        errorCode:
          error instanceof ApiError ? error.errorCode : "UNKNOWN_ERROR",
      });
    } finally {
      set({ isLoading: false });
    }
  },

  updateListing: async (listingId: string, listingData: FormData) => {
    set({ isLoading: true, errorCode: null });
    try {
      const response = await updateListingAPI(listingId, listingData);
      return response.data;
    } catch (error) {
      set({
        errorCode:
          error instanceof ApiError ? error.errorCode : "UNKNOWN_ERROR",
      });
    } finally {
      set({ isLoading: false });
    }
  },
}));
