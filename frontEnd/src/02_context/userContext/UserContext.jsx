import React, { createContext, useState, useCallback, useEffect } from "react";
import PropTypes from "prop-types";
import { AdminAuthCheck_helper } from "../../05_helpers/apiHelpers/_apiHelpers.index.js";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: null,
    role: null,
    _id: null,
    isRegistered: false,
  });
  const [isChecking, setIsChecking] = useState(true); // Must start as true to wait for auth check

  // Check authentication on mount
  const checkAuth_helper = useCallback(async () => {
    try {
      const response = await AdminAuthCheck_helper();
      console.log("response in checkAuth_helper:", response);

      if (response?.success && response?.data) {
        console.log("user is authenticated", response.data);
        // User is authenticated
        setUser({
          ...response.data,
          isRegistered: true,
        });
      } else {
        // User is not authenticated
        setUser({
          name: null,
          role: null,
          _id: null,
          isRegistered: false,
        });
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      setUser({
        name: null,
        role: null,
        _id: null,
        isRegistered: false,
      });
    } finally {
      setIsChecking(false);
    }
  }, []);

  useEffect(() => {
    checkAuth_helper();
  }, []); // Run once on mount

  useEffect(() => {
    console.log("user in UserProvider:", user);
  }, [user]); // Run on every user change

  // Helper function to log user in
  const login = useCallback((userData) => {
    setUser({
      ...userData,
      isRegistered: true,
    });
  }, []);

  // Helper function to log user out
  const logout = useCallback(() => {
    setUser({
      name: null,
      role: null,
      _id: null,
      isRegistered: false,
    });
  }, []);

  const contextValue = {
    user,
    setUser,
    isChecking,
    login,
    logout,
    checkAuth: checkAuth_helper,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

UserProvider.displayName = "UserProvider";

export { UserContext, UserProvider };
