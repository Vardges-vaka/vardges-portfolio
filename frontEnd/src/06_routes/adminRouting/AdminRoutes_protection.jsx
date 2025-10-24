import { Navigate, useLocation } from "react-router-dom";
import { useUserContext } from "../../02_context/context.index.js";

const ProtectedAdminRoute = ({ children }) => {
  const { user } = useUserContext();
  const location = useLocation();

  if (!user.isRegistered) {
    // Redirect to admin welcome page while saving the attempted location
    console.log("Redirecting to admin welcome page - user not registered");
    console.log("user in ProtectedAdminRoute:", user);
    return <Navigate to="/admin" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedAdminRoute;
