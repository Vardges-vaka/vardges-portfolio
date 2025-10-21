import React from "react";
import { useAdminSignup } from "../adminWelcomeHooks/useAdminSignup";
import "./_styles/adminSIgnup.css";

const AdminSignup = () => {
  const { states, setters, handlers } = useAdminSignup();
  return <form className="AdminSignup">Signup</form>;
};

export default AdminSignup;
