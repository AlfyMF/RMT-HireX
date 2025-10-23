import { useEffect } from 'react';
import { useMsal } from '@azure/msal-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { loginRequest } from '@/config/msalConfig';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';

export default function Login() {
  const { instance, accounts, inProgress } = useMsal();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (accounts.length > 0 && inProgress === 'none') {
      navigate('/dashboard');
    }
  }, [accounts, inProgress, navigate]);

  const handleLogin = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: 'Authentication Failed',
        description: 'Unable to sign in with Microsoft. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const isLoggingIn = inProgress !== 'none';

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-3xl font-bold text-white">HX</span>
            </div>
          </div>
          <CardTitle className="text-3xl font-bold">Welcome to HireX</CardTitle>
          <CardDescription className="text-base">
            Sign in with your Microsoft account to access the Job Requisition Management System
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={handleLogin}
            disabled={isLoggingIn}
            className="w-full h-12 text-base font-semibold bg-[#2F2F2F] hover:bg-[#1F1F1F] text-white"
            data-testid="button-microsoft-login"
          >
            {isLoggingIn ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Signing in...
              </>
            ) : (
              <>
                <svg className="mr-2 h-5 w-5" viewBox="0 0 21 21" fill="none">
                  <rect x="1" y="1" width="9" height="9" fill="#F25022" />
                  <rect x="11" y="1" width="9" height="9" fill="#7FBA00" />
                  <rect x="1" y="11" width="9" height="9" fill="#00A4EF" />
                  <rect x="11" y="11" width="9" height="9" fill="#FFB900" />
                </svg>
                Sign in with Microsoft
              </>
            )}
          </Button>
          
          <div className="text-center text-sm text-muted-foreground">
            <p>Secure authentication powered by</p>
            <p className="font-semibold">Microsoft Azure Active Directory</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
