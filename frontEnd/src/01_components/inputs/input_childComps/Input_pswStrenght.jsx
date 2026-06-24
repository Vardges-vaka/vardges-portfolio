import PropTypes from "prop-types";
import { INPUT_SIZE_TYPES } from "../input_helpers/inputSizeTypes.js";
import { getPasswordStrength } from "../input_helpers/passwordValidation.js";
import "../../_styles/inputs/input_pswStrenght.css";

const SEGMENTS = [
  { key: "notValid", label: "Not Valid" },
  { key: "valid", label: "Valid" },
  { key: "strong", label: "Strong" },
  { key: "unbreakable", label: "Unbreakable" },
];

const Input_pswStrenght = ({
  isActive = true,
  password = "",
  baseStyle = true,
  sizeType = "md",
  className,
  id,
}) => {
  if (!isActive) return null;

  const strength = getPasswordStrength(password);
  const hasValue = String(password ?? "").length > 0;
  const activeLevel = hasValue ? strength.level : -1;

  const resolvedClassName = [
    baseStyle && "input_pswStrenght",
    baseStyle && `input_pswStrenght--${sizeType}`,
    baseStyle && `input_pswStrenght--${strength.key}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      id={id}
      className={resolvedClassName}
      aria-live="polite"
      aria-atomic="true">
      <div className="input_pswStrenght__header">
        <span className="input_pswStrenght__title">Password strength</span>
        <span
          className={`input_pswStrenght__label input_pswStrenght__label--${strength.key}`}>
          {hasValue ? strength.label : "Not Valid"}
        </span>
      </div>

      <div
        className="input_pswStrenght__track"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={hasValue ? strength.percent : 0}
        aria-label="Password strength">
        <div
          className={`input_pswStrenght__fill input_pswStrenght__fill--${strength.key}`}
          style={{ width: hasValue ? `${strength.percent}%` : "0%" }}
        />
      </div>

      <div className="input_pswStrenght__segments" aria-hidden="true">
        {SEGMENTS.map((segment, index) => (
          <span
            key={segment.key}
            className={[
              "input_pswStrenght__segment",
              activeLevel >= index && "input_pswStrenght__segment--active",
              activeLevel === index &&
                "input_pswStrenght__segment--current",
            ]
              .filter(Boolean)
              .join(" ")}
          />
        ))}
      </div>
    </div>
  );
};

Input_pswStrenght.propTypes = {
  isActive: PropTypes.bool,
  password: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  className: PropTypes.string,
  id: PropTypes.string,
};

Input_pswStrenght.displayName = "Input_pswStrenght";

export default Input_pswStrenght;
