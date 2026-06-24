import { useState, useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Input_icon } from "../input_childComps/_input_childComps.index.js";
import { INPUT_SIZE_TYPES } from "./inputSizeTypes.js";
import { COUNTRY_CODES, findCountryByCode } from "./telCountryCodes.js";

const Tel_countrySelect = ({
  value,
  onChange,
  disabled = false,
  sizeType = "md",
  id,
}) => {
  const [open, setOpen] = useState(false);
  const rootRef = useRef(null);
  const selected = findCountryByCode(value);

  useEffect(() => {
    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    return () => document.removeEventListener("mousedown", handlePointerDown);
  }, []);

  const handlePick = useCallback(
    (code) => {
      onChange?.(code);
      setOpen(false);
    },
    [onChange],
  );

  return (
    <div
      ref={rootRef}
      className={[
        "input_tel__countryPicker",
        `input_tel__countryPicker--${sizeType}`,
        open && "input_tel__countryPicker--open",
      ]
        .filter(Boolean)
        .join(" ")}>
      <button
        type="button"
        id={id}
        className="input_tel__countryTrigger"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`${selected.name} ${selected.code}`}
        title={selected.name}
        onClick={() => !disabled && setOpen((prev) => !prev)}>
        <img
          src={selected.flag}
          alt=""
          className="input_tel__countryFlag"
          aria-hidden="true"
        />
        <span className="input_tel__countryCode">{selected.code}</span>
        <Input_icon
          baseStyle
          sizeType={sizeType}
          isActive
          type="lucide"
          lucidIcon="ChevronDown"
          decorative
          className="input_tel__countryChevron"
        />
      </button>

      {open ? (
        <ul
          className="input_tel__countryList"
          role="listbox"
          aria-label="Country codes">
          {COUNTRY_CODES.map((country) => {
            const isSelected = country.code === selected.code;

            return (
              <li key={country.code} className="input_tel__countryOptionWrap">
                <button
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    "input_tel__countryOption",
                    isSelected && "input_tel__countryOption--selected",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  title={country.name}
                  onClick={() => handlePick(country.code)}>
                  <img
                    src={country.flag}
                    alt=""
                    className="input_tel__countryFlag"
                    aria-hidden="true"
                  />
                  <span className="input_tel__countryCode">{country.code}</span>
                </button>
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};

Tel_countrySelect.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  id: PropTypes.string,
};

Tel_countrySelect.displayName = "Tel_countrySelect";

export default Tel_countrySelect;
