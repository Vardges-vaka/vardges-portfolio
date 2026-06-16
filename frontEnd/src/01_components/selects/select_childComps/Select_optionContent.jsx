import PropTypes from "prop-types";
import { Field_icon } from "../../fieldParts/_fieldParts.index.js";
import { SELECT_SIZE_TYPES } from "../select_helpers/SELECT_SIZE_TYPES.js";
import {
  OPTIONS_TYPES,
  normalizeOptionsType,
} from "../select_helpers/selectOptionsTypes.js";
import "../../_styles/selects/select_optionContent.css";

const OptionIcon = ({ iconProps, sizeType = "md" }) => {
  if (!iconProps?.isActive) return null;

  return (
    <Field_icon
      baseStyle
      inLabel
      decorative
      sizeType={sizeType}
      {...iconProps}
    />
  );
};

/**
 * Renders one option row — layout driven by `optionsType`.
 * Icons use Field_icon config: lucide string or { type, lucidIcon / svg_src }.
 */
const Select_optionContent = ({
  option,
  optionsType = "textOnly",
  sizeType = "md",
  className,
  placeholder = false,
  placeholderText = "",
}) => {
  if (placeholder) {
    return (
      <span
        className={[
          "select_optionContent",
          "select_optionContent--placeholder",
          className,
        ]
          .filter(Boolean)
          .join(" ")}>
        <span className="select_optionContent__label">{placeholderText}</span>
      </span>
    );
  }

  if (!option) return null;

  const type = normalizeOptionsType(optionsType);

  const rootClass = [
    "select_optionContent",
    `select_optionContent--${type}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (type === "textOnly") {
    return (
      <span className={rootClass}>
        <span className="select_optionContent__label">{option.label}</span>
      </span>
    );
  }

  if (type === "iconOnly") {
    const iconProps = option.leftIcon ?? option.rightIcon;
    return (
      <span className={rootClass}>
        <OptionIcon iconProps={iconProps} sizeType={sizeType} />
      </span>
    );
  }

  if (type === "leftIcon") {
    return (
      <span className={rootClass}>
        <OptionIcon iconProps={option.leftIcon} sizeType={sizeType} />
        <span className="select_optionContent__label">{option.label}</span>
      </span>
    );
  }

  if (type === "rightIcon") {
    return (
      <span className={rootClass}>
        <span className="select_optionContent__label">{option.label}</span>
        <OptionIcon iconProps={option.rightIcon} sizeType={sizeType} />
      </span>
    );
  }

  return (
    <span className={rootClass}>
      <OptionIcon iconProps={option.leftIcon} sizeType={sizeType} />
      <span className="select_optionContent__label">{option.label}</span>
      <OptionIcon iconProps={option.rightIcon} sizeType={sizeType} />
    </span>
  );
};

Select_optionContent.propTypes = {
  option: PropTypes.shape({
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    label: PropTypes.node,
    leftIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    rightIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  }),
  optionsType: PropTypes.oneOf(OPTIONS_TYPES),
  sizeType: PropTypes.oneOf(SELECT_SIZE_TYPES),
  className: PropTypes.string,
  placeholder: PropTypes.bool,
  placeholderText: PropTypes.string,
};

Select_optionContent.displayName = "Select_optionContent";

export default Select_optionContent;
