import React, { useState, useRef, useEffect } from "react";
import { useProfileContext } from "../../02_context/context.index.js";
import { Devicon, Hospitalityicon } from "../../00_assets/_assets.index.js";
import { C } from "../../_/AAA.js";
import "../_styles/profileToggler.css";

const ProfileToggler = () => {
  const { profile, toggleProfile } = useProfileContext();
  const [isExpanded, setIsExpanded] = useState(false);
  const [tempSelectedProfiles, setTempSelectedProfiles] = useState(new Set());
  const togglerRef = useRef(null);

  // Determine which confirmation button to show and its text
  const getConfirmationButton = () => {
    if (tempSelectedProfiles.size === 2) {
      return { show: true, text: "Combined?", targetProfile: "both" };
    } else if (
      tempSelectedProfiles.has("dev") &&
      tempSelectedProfiles.size === 1
    ) {
      return { show: true, text: "Developer?", targetProfile: "dev" };
    } else if (
      tempSelectedProfiles.has("hospitality") &&
      tempSelectedProfiles.size === 1
    ) {
      return { show: true, text: "Hospitality?", targetProfile: "hospitality" };
    }
    return { show: false, text: "", targetProfile: null };
  };

  const confirmButton = getConfirmationButton();

  // Handle profile icon click in the menu
  const handleProfileClick = (selectedProfile) => {
    // Toggle selection in temp state
    const newSelection = new Set(tempSelectedProfiles);

    if (newSelection.has(selectedProfile)) {
      // Prevent deselecting if it's the only one selected
      if (newSelection.size === 1) {
        return; // Don't allow deselecting the last profile
      }
      // Deselect this profile
      newSelection.delete(selectedProfile);
    } else {
      // Select this profile
      newSelection.add(selectedProfile);
    }

    setTempSelectedProfiles(newSelection);
  };

  // Handle confirmation button click
  const handleConfirm = () => {
    if (confirmButton.targetProfile) {
      toggleProfile(confirmButton.targetProfile);
      setTempSelectedProfiles(new Set());
      setIsExpanded(false);
    }
  };

  // Toggle expanded state
  const handleToggle = () => {
    if (!isExpanded) {
      // Opening menu - initialize temp selection
      if (profile === "dev") {
        setTempSelectedProfiles(new Set(["dev"]));
      } else if (profile === "hospitality") {
        setTempSelectedProfiles(new Set(["hospitality"]));
      } else if (profile === "both") {
        setTempSelectedProfiles(new Set(["dev", "hospitality"]));
      }
    } else {
      // Closing menu - reset temp selection
      setTempSelectedProfiles(new Set());
    }
    setIsExpanded(!isExpanded);
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (togglerRef.current && !togglerRef.current.contains(event.target)) {
        setIsExpanded(false);
        setTempSelectedProfiles(new Set());
      }
    };

    if (isExpanded) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isExpanded]);

  // Render the current active profile icon
  const renderActiveIcon = () => {
    if (profile === "dev") {
      return (
        <img src={Devicon} alt="Developer" className="profileToggler__icon" />
      );
    } else if (profile === "hospitality") {
      return (
        <img
          src={Hospitalityicon}
          alt="Hospitality"
          className="profileToggler__icon"
        />
      );
    } else {
      // both
      return (
        <div className="profileToggler__yinYangWrapper">
          <C />
        </div>
      );
    }
  };

  return (
    <div
      className={`profileToggler ${
        isExpanded ? "profileToggler--expanded" : ""
      }`}
      ref={togglerRef}>
      {/* Active Profile Display - hide completely when "both" is expanded */}
      <button
        className={`profileToggler__active ${
          isExpanded ? "profileToggler__active--slid" : ""
        } ${
          isExpanded && profile === "both"
            ? "profileToggler__active--hidden"
            : ""
        }`}
        onClick={handleToggle}
        title="Change Profile"
        aria-label="Toggle Profile Menu"
        aria-expanded={isExpanded}
        type="button">
        {renderActiveIcon()}
        {/* Green blinking indicator - only for dev and hospitality */}
        {profile !== "both" && (
          <span className="profileToggler__indicator"></span>
        )}
      </button>

      {/* Other Options - slide in from right when expanded */}
      <div
        className={`profileToggler__options ${
          isExpanded ? "profileToggler__options--visible" : ""
        }`}>
        {/* Developer Profile Button - always show when menu is expanded (hide both icon) */}
        <button
          className={`profileToggler__option ${
            tempSelectedProfiles.has("dev")
              ? "profileToggler__option--selected"
              : ""
          } ${
            tempSelectedProfiles.has("dev") && tempSelectedProfiles.size === 1
              ? "profileToggler__option--locked"
              : ""
          }`}
          onClick={() => handleProfileClick("dev")}
          title={
            tempSelectedProfiles.has("dev") && tempSelectedProfiles.size === 1
              ? "At least one profile must be selected"
              : tempSelectedProfiles.has("dev")
              ? "Deselect Developer"
              : "Select Developer"
          }
          aria-label="Toggle Developer Profile"
          type="button">
          <img src={Devicon} alt="Developer" className="profileToggler__icon" />
          {/* Green indicator for selected profiles in menu */}
          {tempSelectedProfiles.has("dev") && (
            <span className="profileToggler__menuIndicator"></span>
          )}
        </button>

        {/* Hospitality Profile Button - always show when menu is expanded (hide both icon) */}
        <button
          className={`profileToggler__option ${
            tempSelectedProfiles.has("hospitality")
              ? "profileToggler__option--selected"
              : ""
          } ${
            tempSelectedProfiles.has("hospitality") &&
            tempSelectedProfiles.size === 1
              ? "profileToggler__option--locked"
              : ""
          }`}
          onClick={() => handleProfileClick("hospitality")}
          title={
            tempSelectedProfiles.has("hospitality") &&
            tempSelectedProfiles.size === 1
              ? "At least one profile must be selected"
              : tempSelectedProfiles.has("hospitality")
              ? "Deselect Hospitality"
              : "Select Hospitality"
          }
          aria-label="Toggle Hospitality Profile"
          type="button">
          <img
            src={Hospitalityicon}
            alt="Hospitality"
            className="profileToggler__icon"
          />
          {/* Green indicator for selected profiles in menu */}
          {tempSelectedProfiles.has("hospitality") && (
            <span className="profileToggler__menuIndicator"></span>
          )}
        </button>

        {/* Show confirmation button based on current selection */}
        {confirmButton.show && (
          <button
            className="profileToggler__confirmBtn"
            onClick={handleConfirm}
            title={`Confirm ${confirmButton.text.replace("?", "")} profile`}
            type="button">
            {confirmButton.text}
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfileToggler;
