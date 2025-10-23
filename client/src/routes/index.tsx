import { Routes, Route, Navigate } from "react-router-dom";
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from '@azure/msal-browser';
import Layout from "../components/Layout";
import Dashboard from "../modules/Dashboard";
import CreateJobRequisition from "../modules/CreateJobRequisition";
import ViewJobRequisition from "../pages/ViewJobRequisition";
import Profile from "../modules/Profile";
import NotFound from "../modules/NotFound";
import Login from "../pages/Login";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { accounts, inProgress } = useMsal();

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
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

export const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<Login />} />
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>} />
    <Route path="/create-jr" element={<ProtectedRoute><Layout><CreateJobRequisition /></Layout></ProtectedRoute>} />
    <Route path="/create-requisition/:id" element={<ProtectedRoute><Layout><CreateJobRequisition /></Layout></ProtectedRoute>} />
    <Route path="/view-jr/:id" element={<ProtectedRoute><Layout><ViewJobRequisition /></Layout></ProtectedRoute>} />
    <Route path="/profile" element={<ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
