import { lazy } from "react";
import ProtectedAdminRoute from "./protection/AdminRoutes_protection";

// Lazy load components
const AdminDashboard = lazy(() =>
  import("../10_pages/admin/adminDashboard/AdminDashboard.jsx")
);

export const ADMIN_ROUTES = [
  {
    path: "/dashboard",
    element: (
      <ProtectedAdminRoute>
        <>
          <AdminDashboard />
        </>
      </ProtectedAdminRoute>
    ),
  },
];

export const adminDashboardRoute = {
  path: "/dashboard",
  element: (
    <ProtectedAdminRoute>
      <>
        <AdminDashboard />
      </>
    </ProtectedAdminRoute>
  ),
};
