import React, { useEffect } from "react";
import { useUserContext } from "../../../02_context/context.index";
import "./_styles/adminDashboard.css";

const AdminDashboard = () => {
  const { test, setTest } = useUserContext();

  return (
    <div className="AdminDashboard">
      <h1>AdminDashboard</h1>
      <p>test: {test}</p>
      <button onClick={() => setTest("test10")}>setTest10</button>
    </div>
  );
};

export default AdminDashboard;
