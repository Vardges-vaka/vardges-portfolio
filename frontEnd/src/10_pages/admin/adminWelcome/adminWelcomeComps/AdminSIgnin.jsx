import React from "react";
import { useAdminSIgnin } from "../adminWelcomeHooks/useAdminSIgnin";
import "./_styles/adminSIgnin.css";

const AdminSIgnin = () => {
  const { states, setters, handlers } = useAdminSIgnin();
  return <div className="AdminSIgnup">AdminSIgnup</div>;
};

export default AdminSIgnin;
