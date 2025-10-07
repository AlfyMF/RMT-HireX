import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const apiRequest = async (url: string, options?: RequestInit) => {
  const response = await fetch(`${API_BASE_URL}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options?.headers,
    },
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.statusText}`);
  }

  return response.json();
};

export const api = {
  get: (url: string) => apiRequest(url),
  post: (url: string, data: any) =>
    apiRequest(url, { method: "POST", body: JSON.stringify(data) }),
  put: (url: string, data: any) =>
    apiRequest(url, { method: "PUT", body: JSON.stringify(data) }),
  delete: (url: string) => apiRequest(url, { method: "DELETE" }),
};
