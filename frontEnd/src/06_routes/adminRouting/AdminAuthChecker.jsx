import { useUserContext } from "../../02_context/context.index.js";

export const AdminAuthChecker = ({ children }) => {
  const { isChecking } = useUserContext();

  if (isChecking) {
    return (
      <div className="adminLayout__loading">
        <p>Loading...</p>
      </div>
    );
  }

  return children;
};
