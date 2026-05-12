import { getAccessToken, getRefreshToken, setSession, clearSession } from "../utils/session";
import { IAuthTokens } from "./AuthService/types";

interface ApiError {
  message: string;
  description?: string;
}

export interface ApiResponse<T> {
  code: number;
  data: T;
  message: string;
}

interface RequestOptions extends Omit<RequestInit, "body"> {
  headers?: HeadersInit;
  accessToken?: string | undefined;
  body?: unknown | undefined;
  params?: Record<string, string | string[]> | undefined;
  returnBlob?: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "http://127.0.0.1:8080/api";

export const api = {
  async get<T>(endpoint: string, params?: Record<string, string | string[]>) {
    return apiRequest<T>(endpoint, { method: "GET", params });
  },

  async getBlob(endpoint: string, params?: Record<string, string | string[]>) {
    return apiRequest<Blob>(endpoint, { method: "GET", params, returnBlob: true });
  },

  async post<T>(endpoint: string, data: unknown) {
    return apiRequest<T>(endpoint, {
      method: "POST",
      body: data,
    });
  },

  async put<T>(endpoint: string, data: unknown) {
    return apiRequest<T>(endpoint, {
      method: "PUT",
      body: data,
    });
  },

  async patch<T>(endpoint: string, data: unknown) {
    return apiRequest<T>(endpoint, {
      method: "PATCH",
      body: data,
    });
  },

  async delete<T>(endpoint: string) {
    return apiRequest<T>(endpoint, {
      method: "DELETE",
    });
  },
};

let refreshPromise: Promise<void> | null = null;

export async function apiRequest<TResponse>(
  url: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const { body, params, returnBlob, ...restOptions } = options;

  let accessToken = options.accessToken || getAccessToken();

  // Handle FormData vs JSON
  const isFormData = body instanceof FormData;
  const headers = new Headers(options.headers);

  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  }

  if (accessToken) {
    headers.set("Authorization", `Bearer ${accessToken}`);
  }

  const makeRequest = async (token: string | null) => {
    const requestHeaders = new Headers(headers);
    if (token) {
      requestHeaders.set("Authorization", `Bearer ${token}`);
    }

    let fullUrl = `${API_BASE_URL}/${url}`;
    if (params && Object.keys(params).length > 0) {
      const searchParams = createQueryString(params);
      fullUrl += `?${searchParams}`;
    }

    return fetch(fullUrl, {
      ...restOptions,
      headers: requestHeaders,
      credentials: "include",
      body: isFormData ? body : body ? JSON.stringify(body) : null,
    });
  };

  try {
    let response = await makeRequest(accessToken);

    // Handle 401 Unauthorized - Attempt token refresh
    if (response.status === 401 && !url.includes("auth/")) {
      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // If a refresh is already in progress, wait for it
          if (!refreshPromise) {
            refreshPromise = (async () => {
              const refreshRes = await fetch(`${API_BASE_URL}/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
              });

              if (!refreshRes.ok) {
                throw new Error("Refresh failed");
              }

              const newTokens: IAuthTokens = await refreshRes.json();
              setSession(newTokens);
            })();
          }

          await refreshPromise;
          refreshPromise = null;

          // Retry the original request with new token
          accessToken = getAccessToken();
          response = await makeRequest(accessToken);
        } catch (refreshError) {
          refreshPromise = null;
          clearSession();
          // Optionally redirect to login or throw specific error
          throw {
            message: "Session expired",
            description: "Please log in again",
          } as ApiError;
        }
      }
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));

      throw {
        message: errorData.message || errorData.error || `HTTP error ${response.status}`,
        description: errorData.description || response.statusText,
      } as ApiError;
    }

    // Handle 204 No Content responses
    if (response.status === 204) {
      return undefined as TResponse;
    }

    if (returnBlob) {
      return response.blob() as TResponse;
    }

    return response.json();
  } catch (error) {
    if (error instanceof Error) {
      throw {
        message: "Network Error",
        description: error.message,
      } as ApiError;
    }
    throw error;
  }
}



/**
 * Helper function to create query string from parameters, properly handling arrays
 */
function createQueryString(params: Record<string, string | string[]>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      // Handle arrays by adding each value with the same key
      // This will result in: role=administrator&role=borrower
      value.forEach((item) => {
        searchParams.append(key, item);
      });
    } else {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
}
