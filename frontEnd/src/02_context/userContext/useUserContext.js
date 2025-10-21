import { useContext } from "react";
import { UserContext } from "./UserContext";

const useUserContext = () => {
  const context = useContext(UserContext);

  // Error handling for missing provider
  if (!context) {
    throw new Error(
      "useUserContext must be used within a UserProvider. " +
        "Make sure to wrap your component tree with <UserProvider>."
    );
  }

  return context;
};

export default useUserContext;
