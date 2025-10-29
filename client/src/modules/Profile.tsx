import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Mail, Building, Shield, AlertCircle, Loader2 } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from "@/contexts/UserContext";
import { format } from "date-fns";

/**
 * Profile component displays the authenticated user's profile information
 * Data is fetched from the backend based on Azure AD email
 */
export default function Profile() {
  const { userProfile, isLoading, error } = useUser();

  // Loading state
  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-profile-title">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <Card className="p-8">
          <div className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto" data-testid="loader-profile" />
              <p className="text-muted-foreground">Loading your profile...</p>
            </div>
          </div>
        </Card>
      </div>
    );
  }

  // Error state
  if (error || !userProfile) {
    return (
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-profile-title">Profile</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
        <Alert variant="destructive" data-testid="alert-profile-error">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error Loading Profile</AlertTitle>
          <AlertDescription>
            {error?.message || "Unable to load your profile. Please make sure you are registered in the system and try refreshing the page."}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  // Get initials for avatar
  const getInitials = (name: string | null): string => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="text-profile-title">Profile</h1>
        <p className="text-muted-foreground">
          View your account information and role details
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 ring-4 ring-primary/10" data-testid="avatar-user">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {getInitials(userProfile.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold" data-testid="text-user-name">
                {userProfile.name || "Name not set"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="default" data-testid="badge-user-role">{userProfile.role}</Badge>
                {userProfile.department && (
                  <span className="text-sm text-muted-foreground" data-testid="text-user-department">
                    {userProfile.department.name}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Profile Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Name */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Full Name</div>
              <div className="flex items-center gap-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <div className="font-medium" data-testid="text-profile-name">
                  {userProfile.name || "Not provided"}
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Email Address</div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div className="font-medium" data-testid="text-profile-email">
                  {userProfile.email}
                </div>
              </div>
            </div>

            {/* Department */}
            {userProfile.department && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Department</div>
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div className="font-medium" data-testid="text-profile-department">
                    {userProfile.department.name}
                  </div>
                </div>
              </div>
            )}

            {/* Role */}
            <div className="space-y-2">
              <div className="text-sm font-medium text-muted-foreground">Role</div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <div className="font-medium" data-testid="text-profile-role">
                  {userProfile.role}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Role Details Section */}
        {userProfile.roleDetails && (
          <>
            <Separator className="my-6" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Role Details
              </h3>
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">Role Name</div>
                <div className="font-medium" data-testid="text-role-name">
                  {userProfile.roleDetails.name}
                </div>
              </div>
              {userProfile.roleDetails.description && (
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Description</div>
                  <div className="text-sm" data-testid="text-role-description">
                    {userProfile.roleDetails.description}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Department Details Section */}
        {userProfile.department && (
          <>
            <Separator className="my-6" />
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center gap-2">
                <Building className="h-5 w-5" />
                Department Details
              </h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Department Code</div>
                  <div className="font-medium font-mono" data-testid="text-department-code">
                    {userProfile.department.code}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-sm font-medium text-muted-foreground">Department Name</div>
                  <div className="font-medium" data-testid="text-department-name">
                    {userProfile.department.name}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Account Information */}
        <Separator className="my-6" />
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Account Information</h3>
          <div className="grid gap-4 md:grid-cols-2 text-sm">
            <div className="space-y-1">
              <div className="text-muted-foreground">Account Created</div>
              <div className="font-medium" data-testid="text-account-created">
                {format(new Date(userProfile.createdAt), "PPP")}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Last Updated</div>
              <div className="font-medium" data-testid="text-account-updated">
                {format(new Date(userProfile.updatedAt), "PPP")}
              </div>
            </div>
            <div className="space-y-1">
              <div className="text-muted-foreground">Account Status</div>
              <Badge 
                variant={userProfile.isActive ? "default" : "destructive"}
                data-testid="badge-account-status"
              >
                {userProfile.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
          </div>
        </div>
      </Card>

      {/* Authentication Notice */}
      <Alert data-testid="alert-auth-notice">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Authentication</AlertTitle>
        <AlertDescription>
          Your account is managed through Microsoft Azure AD. To update your email or password, please contact your IT administrator.
        </AlertDescription>
      </Alert>
    </div>
  );
}
