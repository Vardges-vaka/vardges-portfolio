import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../02_context/context.index.js";

const ProtectedAdminRoute = ({ children }) => {
  const { user, test } = useUserContext();
  const location = useLocation();

  //   if (!user.isRegistered) {
  if (test === "test10") {
    // Redirect to admin welcome page while saving the attempted location
    console.log("Redirecting to admin welcome page");
    console.log("user in ProtectedAdminRoute:", user);
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
