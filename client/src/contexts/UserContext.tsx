import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useMsal } from '@azure/msal-react';
import { useQuery } from '@tanstack/react-query';

/**
 * Extended user profile interface matching backend response
 */
export interface UserProfile {
  id: string;
  email: string;
  name: string | null;
  role: string;
  roleDetails: {
    id: string;
    name: string;
    description: string | null;
    permissions: any;
  } | null;
  department: {
    id: string;
    name: string;
    code: string;
  } | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface UserContextValue {
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: Error | null;
  refetchProfile: () => void;
}

const UserContext = createContext<UserContextValue | undefined>(undefined);

/**
 * UserProvider manages user profile data
 * Automatically fetches profile data when user is authenticated
 */
export function UserProvider({ children }: { children: ReactNode }) {
  const { accounts } = useMsal();
  const [shouldFetch, setShouldFetch] = useState(false);

  // Only fetch profile when user is logged in
  useEffect(() => {
    if (accounts.length > 0) {
      setShouldFetch(true);
    } else {
      setShouldFetch(false);
    }
  }, [accounts]);

  // Fetch user profile from backend
  const { data, isLoading, error, refetch } = useQuery<UserProfile>({
    queryKey: ['/user/profile'],
    enabled: shouldFetch, // Only fetch when user is authenticated
    retry: 1, // Retry once on failure
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  const value: UserContextValue = {
    userProfile: data || null,
    isLoading,
    error: error as Error | null,
    refetchProfile: () => {
      refetch();
    },
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

/**
 * Hook to access user profile data
 * Must be used within UserProvider
 */
export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
}
