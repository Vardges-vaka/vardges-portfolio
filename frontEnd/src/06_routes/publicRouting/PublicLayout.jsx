import React from "react";
import { Outlet } from "react-router-dom";
import {
  PublicHeader,
  PublicFooter,
} from "../../10_pages/publicPageComponents/publicPageComponents.index.js";
import { ProfileProvider } from "../../02_context/context.index.js";
import "./_styles/publicLayout.css";

const PublicLayout = () => {
  return (
    <ProfileProvider>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </ProfileProvider>
  );
};

export default PublicLayout;
