import PropTypes from "prop-types";
import * as LucideIcons from "lucide-react";
import { INPUT_SIZE_TYPES } from "../input_helpers/inputSizeTypes.js";
import "../../_styles/inputs/input_icon.css";

const Input_icon = ({
  isActive = false,
  type = "lucide",
  lucidIcon,
  svg_src,
  onClick,
  onHover,
  title,
  className,
  baseStyle = false,
  sizeType = "md",
  inLabel = false,
}) => {
  if (!isActive) return null;

  const sizeClass = `input_icon_cnt--${sizeType}`;
  const resolvedCntClass = [
    baseStyle && "input_icon_cnt",
    inLabel ? "input_icon_cnt--inLabel" : sizeClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedIconClass = ["input_icon", `input_icon--${sizeType}`]
    .filter(Boolean)
    .join(" ");

  const resolveLucideComponent = () => {
    if (!lucidIcon) return null;

    const candidates = [
      lucidIcon,
      lucidIcon.charAt(0).toUpperCase() + lucidIcon.slice(1),
    ];

    const Component = candidates
      .map((name) => LucideIcons[name])
      .find(Boolean);

    if (!Component) {
      console.warn(
        `Input_icon: Lucide icon "${lucidIcon}" not found.`,
      );
      return null;
    }

    return <Component className={resolvedIconClass} aria-hidden="true" />;
  };

  const renderIcon = () => {
    if (type === "lucide") return resolveLucideComponent();
    if (type === "svg" && svg_src) {
      return (
        <img
          src={svg_src}
          alt=""
          className={resolvedIconClass}
          aria-hidden="true"
        />
      );
    }
    return null;
  };

  const isInteractive = Boolean(onClick);

  return (
    <span
      className={resolvedCntClass}
      onClick={onClick}
      onMouseEnter={onHover}
      onKeyDown={
        isInteractive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onClick?.(e);
              }
            }
          : undefined
      }
      role={isInteractive ? "button" : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      title={title}>
      {renderIcon()}
    </span>
  );
};

Input_icon.propTypes = {
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(["lucide", "svg"]),
  lucidIcon: PropTypes.string,
  svg_src: PropTypes.string,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(INPUT_SIZE_TYPES),
  inLabel: PropTypes.bool,
};

Input_icon.displayName = "Input_icon";

export default Input_icon;
