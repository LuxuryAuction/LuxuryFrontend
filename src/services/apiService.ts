

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


const API_BASE_URL = process.env.NEXT_PUBLIC_API_ENDPOINT || "localhost:3000";
/**
 * Convenience wrapper for common API operations
 * Automatically uses auth token from Redux store if not provided
 */
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


export async function apiRequest<TResponse>(
  url: string,
  options: RequestOptions = {},
): Promise<TResponse> {
  const { body, params, returnBlob, ...restOptions } = options;

  // const accessToken = options.accessToken || getAuthToken();
  

  // Handle FormData vs JSON
  const isFormData = body instanceof FormData;
  const headers = new Headers(options.headers);

  if (!isFormData) {
    headers.set("Content-Type", "application/json");
  }

  // if (accessToken) {
  //   headers.set("Authorization", `Bearer ${accessToken}`);
  // }

  try {
    let fullUrl = `${API_BASE_URL}/${url}`;
    if (params && Object.keys(params).length > 0) {
      const searchParams = createQueryString(params);
      fullUrl += `?${searchParams}`;
    }

    const response = await fetch(fullUrl, {
      ...restOptions,
      headers,
      credentials: "include",
      body: isFormData ? body : body ? JSON.stringify(body) : null,
    });

    if (!response.ok) {

      const errorData = await response.json().catch(() => ({}));

      throw {
        message: errorData.message || errorData.error || `HTTP error ${response.status}`,
        description: errorData.description || response.statusText,
      } as ApiError;
    }

    // Handle 204 No Content responses (typically from DELETE operations)
    if (response.status === 204) {
      return undefined as TResponse;
    }

    // Return blob if returnBlob is true, otherwise return JSON
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
 * Get auth token from Redux store (client-side only)
 */
// function getAuthToken(): string | null | undefined {
//   // Get token from Redux store if available
//   if (typeof window !== "undefined") {
//     try {
//       // Import store dynamically to avoid SSR issues
//       const { store } = require("@/redux/store");
//       const state = store.getState();

//       // Try multiple possible paths for the token
//       const token =
//         state.persisted?.auth?.token || state.auth?.token || state.persisted?.auth?.user?.token;

//       return token;
//     } catch (error) {
//       console.warn("Could not get token from Redux store:", error);
//     }
//   }
//   return null;
// }

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
