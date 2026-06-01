import { useContext } from "react";
import { NotificationContext } from "./NotificationContext";

const useNotificationContext = () => {
  const context = useContext(NotificationContext);

  // Error handling for missing provider
  if (!context) {
    throw new Error(
      "useNotificationContext must be used within a NotificationProvider. " +
        "Make sure to wrap your component tree with <NotificationProvider>."
    );
  }

  return context;
};

export default useNotificationContext;
