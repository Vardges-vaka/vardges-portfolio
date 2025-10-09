import { useContext } from "react";
import { ProfileContext } from "./ProfileContext";

const useProfileContext = () => {
  const context = useContext(ProfileContext);

  // Error handling for missing provider
  if (!context) {
    throw new Error(
      "useProfileContext must be used within a ProfileProvider. " +
        "Make sure to wrap your component tree with <ProfileProvider>."
    );
  }

  return context;
};

export default useProfileContext;
