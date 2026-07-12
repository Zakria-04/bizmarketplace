import { LoginRegisterPayload } from "@/types/auth";
import axios, { AxiosError } from "axios";

const MainDomain = "http://localhost:8080";

const API_BASE = "/api";
const AUTH_API = `${API_BASE}/auth`;

//* Auth - User API calls //
const loginAPI = (body: LoginRegisterPayload) => {
  const route = `${AUTH_API}/login`;
  return appFetch(route, "POST", body);
};

// Axios instance for API calls //
const api = axios.create({
  baseURL: MainDomain,
  withCredentials: true,
});

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
    const axiosError = error as AxiosError;
    // try to refresh token if 401 error
    if (axiosError.response?.status === 401) {
      try {
        await api.post(`${AUTH_API}/refresh`, undefined, {
          withCredentials: true,
        });

        // retry the original request after refreshing the token
        const response = await api({
          method,
          url: route,
          data: method !== "GET" ? body : undefined,
        });
        return response.data;
      } catch (error) {
        // if refresh fails redirect to login page
        window.location.href = "/auth/login";
      }
    }
  }
};

export { loginAPI };
