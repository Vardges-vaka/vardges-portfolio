import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the Theme Context
const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  // Apply theme to document root on theme change
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Apply initial theme on mount
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, []);

  // Toggle between light and dark themes
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  // Set specific theme
  const setSpecificTheme = (newTheme) => {
    if (newTheme === "light" || newTheme === "dark") {
      setTheme(newTheme);
    } else {
      console.warn(`Invalid theme: ${newTheme}. Use 'light' or 'dark'.`);
    }
  };

  // Check if current theme is dark
  const isDarkMode = theme === "dark";

  // Check if current theme is light
  const isLightMode = theme === "light";

  // Get system preference
  const getSystemPreference = () => {
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  // Set theme to system preference
  const useSystemPreference = () => {
    const systemTheme = getSystemPreference();
    setTheme(systemTheme);
  };

  const contextValue = {
    // Current theme state
    theme,
    isDarkMode,
    isLightMode,

    // Theme actions
    toggleTheme,
    setSpecificTheme,
    useSystemPreference,
    getSystemPreference,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ThemeProvider.displayName = "ThemeProvider";

export { ThemeContext, ThemeProvider };
