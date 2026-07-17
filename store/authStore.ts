import { ApiError, loginAPI, registerAPI } from "@/assets/res/api";
import { AuthStoreType } from "@/types/auth.type";
import { create } from "zustand";

export const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  isLoading: false,
  errorCode: null,

  // functions
  register: async (body) => {
    set({
      isLoading: true,
      errorCode: null,
    });

    try {
      const response = await registerAPI(body);

      return response.success;
    } catch (error) {
      set({
        errorCode:
          error instanceof ApiError ? error.errorCode : "UNKNOWN_ERROR",
      });

      return false;
    } finally {
      set({ isLoading: false });
    }
  },
  login: async (body) => {
    set({
      isLoading: true,
      errorCode: null,
    });

    try {
      const response = await loginAPI(body);

      return response.success;
    } catch (error) {
      set({
        errorCode:
          error instanceof ApiError ? error.errorCode : "UNKNOWN_ERROR",
      });

      return false;
    } finally {
      set({ isLoading: false });
    }
  },
}));
