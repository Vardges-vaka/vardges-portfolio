import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";

const useLanguageContext = () => {
  const context = useContext(LanguageContext);

  // Error handling for missing provider
  if (!context) {
    throw new Error(
      "useLanguageContext must be used within a LanguageProvider. " +
        "Make sure to wrap your component tree with <LanguageProvider>."
    );
  }

  return context;
};

export default useLanguageContext;
