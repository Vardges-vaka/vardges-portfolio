import React from "react";
import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
import ProtectedAdminRoutes from "./AdminRoutes_protection";
import "../../10_pages/admin/adminDashboard/00_styles/adminRouteShell.css";

// Lazy load components
const AdminDashboard = lazy(() =>
  import("../../10_pages/admin/adminDashboard/AdminDashboard.jsx")
);
const AdminWelcome = lazy(() =>
  import("../../10_pages/admin/adminWelcome/AdminWelcome.jsx")
);
const AdminResetPassword = lazy(() =>
  import("../../10_pages/admin/adminResetPassword/AdminResetPassword.jsx")
);
const Header = lazy(() =>
  import("../../10_pages/adminPageComps/adminHeader/AdminHeader.jsx")
);
const Footer = lazy(() =>
  import("../../10_pages/adminPageComps/adminFooter/AdminFooter.jsx")
);

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Dashboard route - protected */}
      <Route
        path="dashboard/:section?/:subSection?"
        element={
          <ProtectedAdminRoutes>
            <div className="adminRouteShell">
              <Header />
              <AdminDashboard />
            </div>
            {/* <Footer /> */}
          </ProtectedAdminRoutes>
        }
      />

      {/* Admin welcome page - not protected */}
      <Route path="" element={<AdminWelcome />} />

      {/* Reset password route - not protected */}
      <Route path="reset-password/:token" element={<AdminResetPassword />} />
    </Routes>
  );
};

export default AdminRoutes;
