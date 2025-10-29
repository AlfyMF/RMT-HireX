import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { User, Mail, Phone, Building, Shield, AlertCircle, Loader2, Edit } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useUser } from "@/contexts/UserContext";

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
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  // Split name into first and last name
  const getFirstName = (name: string | null): string => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    return parts[0] || "";
  };

  const getLastName = (name: string | null): string => {
    if (!name) return "";
    const parts = name.trim().split(" ");
    if (parts.length > 1) {
      return parts.slice(1).join(" ");
    }
    return "";
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight" data-testid="text-profile-title">Profile</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences
        </p>
      </div>

      {/* Profile Card */}
      <Card className="p-8">
        {/* Header with Avatar and Edit Button */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20 ring-4 ring-primary/10" data-testid="avatar-user">
              <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                {getInitials(userProfile.name)}
              </AvatarFallback>
            </Avatar>
            <div>
              <h2 className="text-2xl font-bold" data-testid="text-user-name">
                {userProfile.name || "User"}
              </h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="default" className="bg-primary" data-testid="badge-user-role">
                  {userProfile.role}
                </Badge>
                {userProfile.department && (
                  <span className="text-sm text-muted-foreground" data-testid="text-user-department">
                    {userProfile.department.name}
                  </span>
                )}
              </div>
            </div>
          </div>
          <Button variant="default" className="gap-2" data-testid="button-edit-profile">
            <Edit className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>

        {/* Personal Information Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <User className="h-5 w-5" />
            Personal Information
          </h3>

          <div className="grid gap-6 md:grid-cols-2">
            {/* First Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">First Name</label>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm" data-testid="text-first-name">
                  {getFirstName(userProfile.name) || "Not provided"}
                </span>
              </div>
            </div>

            {/* Last Name */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Last Name</label>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50">
                <User className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm" data-testid="text-last-name">
                  {getLastName(userProfile.name) || "Not provided"}
                </span>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm" data-testid="text-email">
                  {userProfile.email}
                </span>
              </div>
            </div>

            {/* Phone - placeholder since not in database */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Phone</label>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground" data-testid="text-phone">
                  Not provided
                </span>
              </div>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Department</label>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50">
                <Building className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm" data-testid="text-department">
                  {userProfile.department?.name || "Not assigned"}
                </span>
              </div>
            </div>

            {/* Role */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Role</label>
              <div className="flex items-center gap-2 px-3 py-2 border rounded-md bg-muted/50">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm" data-testid="text-role">
                  {userProfile.role}
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
