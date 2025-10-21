import React from "react";
import { useAdminSIgnup } from "../adminWelcomeHooks/useAdminSIgnup";
import "./_styles/adminSIgnup.css";

const AdminSIgnup = () => {
  const { states, setters, handlers } = useAdminSIgnup();
  return <div className="AdminSIgnup">AdminSIgnup</div>;
};

export default AdminSIgnup;
