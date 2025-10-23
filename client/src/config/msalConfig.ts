import { Configuration, LogLevel, BrowserCacheLocation } from '@azure/msal-browser';

const AZURE_AD_CLIENT_ID = import.meta.env.VITE_AZURE_AD_CLIENT_ID || '';
const AZURE_AD_TENANT_ID = import.meta.env.VITE_AZURE_AD_TENANT_ID || '';

const getRedirectUri = () => {
  const port = window.location.port;
  if (port) {
    return `${window.location.protocol}//${window.location.hostname}:${port}`;
  }
  return window.location.origin;
};

const REDIRECT_URI = getRedirectUri();

export const msalConfig: Configuration = {
  auth: {
    clientId: AZURE_AD_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${AZURE_AD_TENANT_ID}`,
    redirectUri: REDIRECT_URI,
    postLogoutRedirectUri: REDIRECT_URI,
    navigateToLoginRequestUrl: false,
  },
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: false,
  },
  system: {
    allowRedirectInIframe: false,
    loggerOptions: {
      loggerCallback: (level: LogLevel, message: string, containsPii: boolean) => {
        if (containsPii) return;
        switch (level) {
          case LogLevel.Error:
            console.error(message);
            return;
          case LogLevel.Warning:
            console.warn(message);
            return;
          case LogLevel.Info:
            console.info(message);
            return;
          case LogLevel.Verbose:
            console.debug(message);
            return;
        }
      },
      logLevel: LogLevel.Warning,
    },
  },
};

export const loginRequest = {
  scopes: ['User.Read', 'openid', 'profile', 'email'],
};
