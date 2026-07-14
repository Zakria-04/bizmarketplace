import type { LoginRegisterPayload } from "@/types/auth.type";
import axios from "axios";

const MAIN_DOMAIN = "http://localhost:8080";

const API_BASE = "/api";
const AUTH_API = `${API_BASE}/auth`;
const LISTS_API = `${API_BASE}/listing`;

type AuthResponse = {
  success: boolean;
  message: string;
  data?: unknown;
};

type ApiErrorResponse = {
  message?: string;
  errorCode?: string;
};

export class ApiError extends Error {
  errorCode: string;

  constructor(message: string, errorCode: string) {
    super(message);

    this.name = "ApiError";
    this.errorCode = errorCode;
  }
}

const api = axios.create({
  baseURL: MAIN_DOMAIN,
  withCredentials: true,
});

function createApiError(error: unknown) {
  if (axios.isAxiosError<ApiErrorResponse>(error)) {
    return new ApiError(
      error.response?.data?.message ?? "Something went wrong",
      error.response?.data?.errorCode ?? "UNKNOWN_ERROR",
    );
  }

  return new ApiError(
    error instanceof Error ? error.message : "Something went wrong",
    "UNKNOWN_ERROR",
  );
}

const appFetch = async (
  route: string,
  method: "GET" | "POST",
  body?: unknown,
) => {
  try {
    const response = await api({
      method,
      url: route,
      data: method !== "GET" ? body : undefined,
    });

    return response.data;
  } catch (error) {
    const isAuthRoute = [
      `${AUTH_API}/login`,
      `${AUTH_API}/register`,
      `${AUTH_API}/refresh`,
    ].includes(route);

    const shouldRefresh =
      axios.isAxiosError(error) &&
      error.response?.status === 401 &&
      !isAuthRoute;

    if (!shouldRefresh) {
      throw createApiError(error);
    }

    try {
      await api.post(`${AUTH_API}/refresh`);
    } catch (refreshError) {
      if (typeof window !== "undefined") {
        window.location.href = "/auth/login";
      }

      throw createApiError(refreshError);
    }

    // Retry the original request after refreshing the token.
    const response = await api({
      method,
      url: route,
      data: method !== "GET" ? body : undefined,
    });

    return response.data as AuthResponse;
  }
};

// Auth - User APIs
const loginAPI = (body: LoginRegisterPayload) => {
  return appFetch(`${AUTH_API}/login`, "POST", body);
};

const registerAPI = (body: LoginRegisterPayload) => {
  return appFetch(`${AUTH_API}/register`, "POST", body);
};

// Lists APIS
const getAllLists = () => {
  return appFetch(`${LISTS_API}/getAllListings`, "GET");
};

export { loginAPI, registerAPI, getAllLists };
