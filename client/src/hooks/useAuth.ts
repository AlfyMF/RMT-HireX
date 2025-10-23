import { useMsal } from '@azure/msal-react';
import { useEffect, useState } from 'react';
import { loginRequest } from '@/config/msalConfig';
import { InteractionStatus } from '@azure/msal-browser';

export interface AuthUser {
  name: string;
  email: string;
  username: string;
}

export function useAuth() {
  const { instance, accounts, inProgress } = useMsal();
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      if (inProgress === InteractionStatus.None && accounts.length > 0) {
        try {
          const response = await instance.acquireTokenSilent({
            ...loginRequest,
            account: accounts[0],
          });
          setAccessToken(response.accessToken);
          
          const account = accounts[0];
          setUser({
            name: account.name || '',
            email: account.username || '',
            username: account.username || '',
          });
        } catch (error) {
          console.error('Token acquisition failed:', error);
          setAccessToken(null);
          setUser(null);
        }
      } else {
        setAccessToken(null);
        setUser(null);
      }
      setIsLoading(false);
    };

    initAuth();
  }, [instance, accounts, inProgress]);

  const getAccessToken = async (): Promise<string | null> => {
    if (accounts.length === 0) return null;

    try {
      const response = await instance.acquireTokenSilent({
        ...loginRequest,
        account: accounts[0],
      });
      return response.accessToken;
    } catch (error) {
      console.error('Failed to acquire token:', error);
      try {
        const response = await instance.acquireTokenPopup(loginRequest);
        return response.accessToken;
      } catch (popupError) {
        console.error('Popup token acquisition failed:', popupError);
        return null;
      }
    }
  };

  const login = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const logout = () => {
    instance.logoutRedirect({
      postLogoutRedirectUri: window.location.origin,
    });
  };

  return {
    isAuthenticated: accounts.length > 0 && accessToken !== null,
    user,
    accessToken,
    isLoading,
    login,
    logout,
    getAccessToken,
  };
}
