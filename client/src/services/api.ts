import { QueryClient } from "@tanstack/react-query";
import { msalInstance } from "../main";
import { loginRequest } from "../config/msalConfig";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

async function getAccessToken(): Promise<string | null> {
  const accounts = msalInstance.getAllAccounts();
  if (accounts.length === 0) return null;

  try {
    const response = await msalInstance.acquireTokenSilent({
      ...loginRequest,
      account: accounts[0],
    });
    return response.accessToken;
  } catch (error) {
    console.error('Failed to acquire token:', error);
    return null;
  }
}

export const apiRequest = async (url: string, options?: RequestInit) => {
  const token = await getAccessToken();
  const headers: HeadersInit = {
    "Content-Type": "application/json",
    ...options?.headers,
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const errorText = await response.text();
    let errorMessage = `API Error (${response.status}): ${response.statusText}`;
    try {
      const errorJson = JSON.parse(errorText);
      if (errorJson.message) {
        errorMessage = errorJson.message;
      }
    } catch {
      // If parsing fails, use the default message
    }
    throw new Error(errorMessage);
  }

  const json = await response.json();
  
  // If response has meta (pagination info), return both data and meta
  // Otherwise, extract data from the success response wrapper
  if (json.meta) {
    return { data: json.data, meta: json.meta };
  }
  return json.data || json;
};

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const url = queryKey[0] as string;
        const secondParam = queryKey[1];
        
        let fullUrl = url;
        
        // If second param is a string, it's a resource ID - append to path
        if (typeof secondParam === 'string') {
          fullUrl = `${url}/${secondParam}`;
        } 
        // If it's an object, treat as query parameters
        else if (secondParam && typeof secondParam === 'object') {
          const searchParams = new URLSearchParams();
          Object.entries(secondParam).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
              searchParams.append(key, String(value));
            }
          });
          const queryString = searchParams.toString();
          if (queryString) {
            fullUrl = `${url}?${queryString}`;
          }
        }
        
        return apiRequest(fullUrl);
      },
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const api = {
  get: (url: string) => apiRequest(url),
  post: (url: string, data: any) =>
    apiRequest(url, { method: "POST", body: JSON.stringify(data) }),
  put: (url: string, data: any) =>
    apiRequest(url, { method: "PUT", body: JSON.stringify(data) }),
  delete: (url: string) => apiRequest(url, { method: "DELETE" }),
};
