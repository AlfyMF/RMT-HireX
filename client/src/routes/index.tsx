import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../components/Layout";
import Dashboard from "../modules/Dashboard";
import CreateJobRequisition from "../modules/CreateJobRequisition";
import ViewJobRequisition from "../pages/ViewJobRequisition";
import Profile from "../modules/Profile";
import NotFound from "../modules/NotFound";

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Navigate to="/dashboard" replace />} />
    <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
    <Route path="/create-jr" element={<Layout><CreateJobRequisition /></Layout>} />
    <Route path="/create-requisition/:id" element={<Layout><CreateJobRequisition /></Layout>} />
    <Route path="/view-jr/:id" element={<Layout><ViewJobRequisition /></Layout>} />
    <Route path="/profile" element={<Layout><Profile /></Layout>} />
    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);
