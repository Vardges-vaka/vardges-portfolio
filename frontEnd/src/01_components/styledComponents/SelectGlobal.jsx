import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import "../_styles/globalSelect.css";

const GlobalSelect = ({
  options = [],
  value,
  onChange,
  placeholder = "Choose...",
  disabled = false,
  className = "",

  // which property to use as label & value
  optionLabelKey = "label",
  optionValueKey = "value",

  // icon-related keys on each option object
  optionWithIconKey = "withIcon", // boolean
  optionIconTypeKey = "IconType", // "Lucide" | "img"
  optionIconKey = "Icon", // JSX element or img src
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = useMemo(
    () => options.find((opt) => opt[optionValueKey] === value),
    [options, value, optionValueKey]
  );

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  const handleSelect = (opt) => {
    if (disabled) return;
    const newValue = opt[optionValueKey];
    onChange && onChange(newValue);
    setIsOpen(false);
  };

  const handleBlur = (e) => {
    // close menu when focus leaves the whole wrapper
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsOpen(false);
    }
  };

  const renderOptionIcon = (opt) => {
    const withIcon = !!opt[optionWithIconKey];
    if (!withIcon) return null;

    const type = opt[optionIconTypeKey];
    const icon = opt[optionIconKey];

    if (!type || !icon) return null;

    const normalizedType = String(type).toLowerCase();

    // IconType: "Lucide" -> Icon is JSX: <SampleIcon />
    if (normalizedType === "lucide") {
      return (
        <span className="global-select-option-icon">
          {React.isValidElement(icon) ? icon : null}
        </span>
      );
    }

    // IconType: "img" -> Icon is imported: SampleIcon
    if (normalizedType === "img") {
      return (
        <img
          src={icon}
          alt=""
          className="global-select-option-icon-img"
          draggable="false"
        />
      );
    }

    return null;
  };

  const renderOptionContent = (opt) => (
    <div className="global-select-option-content">
      {renderOptionIcon(opt)}
      <span className="global-select-option-label">{opt[optionLabelKey]}</span>
    </div>
  );

  return (
    <div
      className={`global-select-wrapper custom ${className}`}
      onBlur={handleBlur}>
      <button
        type="button"
        className={`global-select-control-button ${
          disabled ? "is-disabled" : ""
        } ${isOpen ? "is-open" : ""}`}
        onClick={toggleOpen}
        disabled={disabled}>
        <span className="global-select-value">
          {selectedOption ? (
            renderOptionContent(selectedOption)
          ) : (
            <span className="global-select-placeholder">{placeholder}</span>
          )}
        </span>
        <span className="global-select-arrow">▾</span>
      </button>

      {isOpen && (
        <div className="global-select-menu">
          {options.map((opt) => {
            const isSelected = opt[optionValueKey] === value;
            return (
              <button
                key={opt[optionValueKey]}
                type="button"
                className={`global-select-option ${
                  isSelected ? "is-selected" : ""
                }`}
                onMouseDown={(e) => {
                  // prevent blur before click
                  e.preventDefault();
                  handleSelect(opt);
                }}>
                {renderOptionContent(opt)}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

GlobalSelect.propTypes = {
  label: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.object),
  value: PropTypes.any,
  onChange: PropTypes.func,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  className: PropTypes.string,
  optionLabelKey: PropTypes.string,
  optionValueKey: PropTypes.string,
  optionWithIconKey: PropTypes.string,
  optionIconTypeKey: PropTypes.string,
  optionIconKey: PropTypes.string,
};

GlobalSelect.displayName = "GlobalSelect";

export default GlobalSelect;
