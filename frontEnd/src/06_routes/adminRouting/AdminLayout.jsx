import React from "react";
import { Outlet } from "react-router-dom";
import { UserProvider } from "../../02_context/context.index.js";
import { AdminAuthChecker } from "./AdminAuthChecker.jsx";
import {
  AdminHeader,
  AdminSideBar,
  AdminFooter,
} from "../../10_pages/adminPageComps/_adminPageComps.index.js";
// import "./_styles/adminLayout.css";

const AdminLayout = () => {
  return (
    <UserProvider>
      <div className="AdminLayout">
        <AdminAuthChecker>
          <AdminHeader />
          <AdminSideBar />
          <main className="AdminLayout_main">
            <Outlet />
          </main>
          <AdminFooter />
        </AdminAuthChecker>
      </div>
    </UserProvider>
  );
};

export default AdminLayout;
