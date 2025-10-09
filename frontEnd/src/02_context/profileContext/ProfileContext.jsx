import React, { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

// Create the Theme Context
const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState("global");

  useEffect(() => {}, [profile]);

  useEffect(() => {}, []);

  // Toggle between light and dark themes
  const toggleProfile = (newProfile) => {
    setProfile(newProfile);
  };

  const contextValue = {
    // Current language state
    profile,

    // Language actions
    toggleProfile,
  };

  return (
    <ProfileContext.Provider value={contextValue}>
      {children}
    </ProfileContext.Provider>
  );
};

ProfileProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

ProfileProvider.displayName = "ProfileProvider";

export { ProfileContext, ProfileProvider };
