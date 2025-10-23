import { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { accounts, inProgress } = useMsal();
  const [, setLocation] = useLocation();

  useEffect(() => {
    if (inProgress === InteractionStatus.None && accounts.length === 0) {
      setLocation('/login');
    }
  }, [accounts, inProgress, setLocation]);

  if (inProgress !== InteractionStatus.None) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (accounts.length === 0) {
    return null;
  }

  return <>{children}</>;
}
