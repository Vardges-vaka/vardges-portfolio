import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const useThemeContext = () => {
  const context = useContext(ThemeContext);

  // Error handling for missing provider
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeProvider. " +
        "Make sure to wrap your component tree with <ThemeProvider>."
    );
  }

  return context;
};

export default useThemeContext;
