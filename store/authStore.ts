import { loginAPI } from "@/assets/res/api";
import { AuthStoreType } from "@/types/auth";
import { create } from "zustand";

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  isLoading: false,
  error: null,

  // functions
  register: async (body) => {},
  login: async (body) => {
    set({ isLoading: true, error: null });
    try {
      const response = await loginAPI(body);
      set({ user: response.user, isLoading: false });
      return response.success;
    } catch (error) {
      const errMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      console.error("error logging in:", errMessage);

      set({ isLoading: false, error: errMessage });
    }
  },
}));
