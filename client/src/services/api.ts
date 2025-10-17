import { QueryClient } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_URL || "/api";

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
        const params = queryKey[1] as Record<string, any> | undefined;
        
        let fullUrl = url;
        if (params) {
          const searchParams = new URLSearchParams();
          Object.entries(params).forEach(([key, value]) => {
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
