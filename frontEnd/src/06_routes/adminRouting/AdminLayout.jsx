import React from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../../02_context/context.index.js";
import { AdminAuthChecker } from "./AdminAuthChecker.jsx";

// import "./_styles/adminLayout.css";

const AdminLayout = () => {
  return (
    <UserProvider>
      <div className="AdminLayout">
        <AdminAuthChecker>
          <main className="AdminLayout_main">
            <Outlet />
          </main>
        </AdminAuthChecker>
      </div>
    </UserProvider>
  );
};

export default AdminLayout;
