import React, { createContext, useState, useEffect } from "react";
import { SUPPORTED_PROFILES } from "../../08_constances/_constances.index.js";
import PropTypes from "prop-types";

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [test, setTest] = useState("test");
  const contextValue = {
    test,
    setTest,
    user,
    setUser,
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
