import React from "react";
import { useState } from "react";
import { ButtonGlobal } from "../01_components/components.index.js";
import { useThemeContext } from "../02_context/context.index";
import "./btnTest.css";

const BTNTest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [showIcons, setShowIcons] = useState(true);

  const { theme, isDarkMode, toggleTheme, setSpecificTheme } =
    useThemeContext();

  const handleClick = () => {
    console.log("Button clicked");
    setIsLoading(!isLoading);
  };

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 2000);
  };

  // Theme Selector Component
  const ThemeSelector = () => (
    <div className="btnTest__themeSelector">
      <h3>🎨 Theme Selector</h3>
      <div className="btnTest__themeSelector__buttons">
        <ButtonGlobal
          version={theme === "light" ? "primary" : "normal"}
          onClick={() => setSpecificTheme("light")}
          withIcon
          leftIcon={{
            isActive: true,
            type: "lucide",
            lucid: "Sun",
          }}>
          Light Theme
        </ButtonGlobal>

        <ButtonGlobal
          version={theme === "dark" ? "primary" : "normal"}
          onClick={() => setSpecificTheme("dark")}
          withIcon
          leftIcon={{
            isActive: true,
            type: "lucide",
            lucid: "Moon",
          }}>
          Dark Theme
        </ButtonGlobal>

        <ButtonGlobal
          version="secondary"
          onClick={toggleTheme}
          withIcon
          leftIcon={{
            isActive: true,
            type: "lucide",
            lucid: "Palette",
          }}>
          Toggle Theme
        </ButtonGlobal>
      </div>
      <p>
        Current theme: <strong>{theme}</strong> {isDarkMode ? "🌙" : "☀️"}
      </p>
    </div>
  );

  // Button Versions Showcase
  const ButtonVersions = () => (
    <div className="btnTest__buttonShowcase">
      <h3>🎯 Button Versions</h3>
      <div className="btnTest__buttonShowcase__grid">
        <div className="btnTest__buttonShowcase__section">
          <h4>Normal Version</h4>
          <ButtonGlobal version="normal" onClick={handleClick}>
            Normal Button
          </ButtonGlobal>
        </div>

        <div className="btnTest__buttonShowcase__section">
          <h4>Primary Version</h4>
          <ButtonGlobal version="primary" onClick={handleClick}>
            Primary Button
          </ButtonGlobal>
        </div>

        <div className="btnTest__buttonShowcase__section">
          <h4>Secondary Version</h4>
          <ButtonGlobal version="secondary" onClick={handleClick}>
            Secondary Button
          </ButtonGlobal>
        </div>

        <div className="btnTest__buttonShowcase__section">
          <h4>Light Version</h4>
          <ButtonGlobal version="light" onClick={handleClick}>
            Light Button
          </ButtonGlobal>
        </div>

        <div className="btnTest__buttonShowcase__section">
          <h4>Dark Version</h4>
          <ButtonGlobal version="dark" onClick={handleClick}>
            Dark Button
          </ButtonGlobal>
        </div>
      </div>
    </div>
  );

  // Button States Showcase
  const ButtonStates = () => (
    <div className="btnTest__buttonStates">
      <h3>⚡ Button States</h3>
      <div className="btnTest__buttonStates__grid">
        <div className="btnTest__buttonStates__section">
          <h4>Loading States</h4>
          <ButtonGlobal
            version="primary"
            isLoading={saving}
            onClick={handleSave}>
            {saving ? "Saving..." : "Save Document"}
          </ButtonGlobal>

          <ButtonGlobal
            version="secondary"
            isLoading={isLoading}
            onClick={() => setIsLoading(!isLoading)}>
            {isLoading ? "Loading..." : "Load Data"}
          </ButtonGlobal>
        </div>

        <div className="btnTest__buttonStates__section">
          <h4>Disabled States</h4>
          <ButtonGlobal version="primary" disabled>
            Disabled Primary
          </ButtonGlobal>
          <ButtonGlobal version="normal" disabled>
            Disabled Normal
          </ButtonGlobal>
        </div>
      </div>
    </div>
  );

  // Icon Buttons Showcase
  const IconButtons = () => (
    <div className="btnTest__iconButtons">
      <h3>🎭 Icon Buttons</h3>
      <div className="btnTest__iconButtons__controls">
        <ButtonGlobal version="light" onClick={() => setShowIcons(!showIcons)}>
          {showIcons ? "Hide Icons" : "Show Icons"}
        </ButtonGlobal>
      </div>

      {showIcons && (
        <div className="btnTest__iconButtons__showcase">
          <div className="btnTest__iconButtons__section">
            <h4>Left Icons</h4>
            <ButtonGlobal
              version="primary"
              withIcon
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "Search",
              }}>
              Search
            </ButtonGlobal>

            <ButtonGlobal
              version="secondary"
              withIcon
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "Plus",
              }}>
              Add Item
            </ButtonGlobal>
          </div>

          <div className="btnTest__iconButtons__section">
            <h4>Right Icons</h4>
            <ButtonGlobal
              version="normal"
              withIcon
              rightIcon={{
                isActive: true,
                type: "lucide",
                lucid: "ArrowRight",
              }}>
              Continue
            </ButtonGlobal>

            <ButtonGlobal
              version="light"
              withIcon
              rightIcon={{
                isActive: true,
                type: "lucide",
                lucid: "ExternalLink",
              }}>
              Open Link
            </ButtonGlobal>
          </div>

          <div className="btnTest__iconButtons__section">
            <h4>Both Icons</h4>
            <ButtonGlobal
              version="primary"
              withIcon
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "Download",
              }}
              rightIcon={{
                isActive: true,
                type: "lucide",
                lucid: "ArrowDown",
              }}>
              Download File
            </ButtonGlobal>
          </div>

          <div className="btnTest__iconButtons__section">
            <h4>Icon Only</h4>
            <ButtonGlobal
              version="primary"
              withIcon
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "Heart",
              }}
              title="Like"
            />

            <ButtonGlobal
              version="secondary"
              withIcon
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "Settings",
              }}
              title="Settings"
            />

            <ButtonGlobal
              version="light"
              withIcon
              leftIcon={{
                isActive: true,
                type: "lucide",
                lucid: "Trash2",
              }}
              title="Delete"
            />
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="btnTest">
      <header className="btnTest__header">
        <h2>🎯 ButtonGlobal Component Testing</h2>
        <p>
          Comprehensive testing of all button versions, states, and
          configurations
        </p>
      </header>

      <ThemeSelector />
      <ButtonVersions />
      <ButtonStates />
      <IconButtons />

      <div className="btnTest__info">
        <h3>📊 Button Component Info</h3>
        <ul>
          <li>
            Current Theme: <strong>{theme}</strong>
          </li>
          <li>
            Loading State: <strong>{isLoading ? "Active" : "Inactive"}</strong>
          </li>
          <li>
            Saving State: <strong>{saving ? "Active" : "Inactive"}</strong>
          </li>
          <li>
            Icons Visible: <strong>{showIcons ? "Yes" : "No"}</strong>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default BTNTest;
