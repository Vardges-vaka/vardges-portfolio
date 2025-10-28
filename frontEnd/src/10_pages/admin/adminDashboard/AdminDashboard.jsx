import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../../02_context/context.index";
import { AdminSignOut_helper } from "../../../05_helpers/apiHelpers/_apiHelpers.index.js";
import { useTranslation } from "react-i18next";
import "./_styles/adminDashboard.css";

const AdminDashboard = () => {
  const { user, logout } = useUserContext();
  const navigate = useNavigate();
  const { t } = useTranslation("validators");
  const { t: tCommon } = useTranslation("common");
  const { section } = useParams();

  const handleSignOut = async () => {
    try {
      const response = await AdminSignOut_helper(t, tCommon);
      if (response && response.success) {
        console.log("Sign out successful, clearing user context...");
        // Clear user context
        logout();
        // Redirect to admin welcome page
        navigate("/admin");
      } else {
        console.error("Sign out failed:", response?.message);
      }
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <div className="AdminDashboard">
      <h1>AdminDashboard</h1>
      <p>Section: {section}</p>
      <p>Welcome, {user?.name || "Guest"}</p>
      <p>Role: {user?.role || "N/A"}</p>
      <p>ID: {user?._id || "N/A"}</p>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default AdminDashboard;
