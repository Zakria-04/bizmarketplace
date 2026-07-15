import { ApiError, getAllLists, getUserListings } from "@/assets/res/api";
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
      console.log("response", response);

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
}));
