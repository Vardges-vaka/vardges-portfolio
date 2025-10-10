import React, { createContext, useState, useEffect } from "react";
import { SUPPORTED_PROFILES } from "../../08_constances/_constances.index.js";
import PropTypes from "prop-types";

const ProfileContext = createContext();

const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile && SUPPORTED_PROFILES.includes(storedProfile)) {
      return storedProfile;
    }
    return "both"; // Default profile
  });

  // Persist profile to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userProfile", profile);
    // Optional: Add data-profile attribute to body for global CSS hooks
    document.body.setAttribute("data-profile", profile);
  }, [profile]);

  // Toggle to a new profile (with validation)
  const toggleProfile = (newProfile) => {
    if (SUPPORTED_PROFILES.includes(newProfile)) {
      setProfile(newProfile);
    } else {
      console.warn(
        `Invalid profile: ${newProfile}. Must be one of: ${SUPPORTED_PROFILES.join(
          ", "
        )}`
      );
    }
  };

  const contextValue = {
    // Current profile state
    profile,

    // Profile actions
    toggleProfile,

    // Helper to check current profile
    isDeveloper: profile === "dev" || profile === "both",
    isHospitality: profile === "hospitality" || profile === "both",
    isBoth: profile === "both",
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
