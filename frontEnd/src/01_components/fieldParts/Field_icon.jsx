import PropTypes from "prop-types";
import * as LucideIcons from "lucide-react";
import {
  FIELD_SIZE_TYPES,
  FIELD_ICON_PX,
} from "./field_helpers/fieldSizeTypes.js";
import "../_styles/fieldParts/field_icon.css";

const Field_icon = ({
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
  decorative = false,
}) => {
  if (!isActive) return null;

  const sizeClass = `field_icon_cnt--${sizeType}`;
  const resolvedCntClass = [
    baseStyle && "field_icon_cnt",
    inLabel ? "field_icon_cnt--inLabel" : sizeClass,
    decorative && "field_icon_cnt--decorative",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const resolvedIconClass = ["field_icon", `field_icon--${sizeType}`]
    .filter(Boolean)
    .join(" ");

  const resolveLucideComponent = () => {
    if (!lucidIcon) return null;

    const candidates = [
      lucidIcon,
      lucidIcon.charAt(0).toUpperCase() + lucidIcon.slice(1),
    ];

    const Component = candidates.map((name) => LucideIcons[name]).find(Boolean);

    if (!Component) {
      console.warn(`Field_icon: Lucide icon "${lucidIcon}" not found.`);
      return null;
    }

    return (
      <Component
        className={resolvedIconClass}
        size={FIELD_ICON_PX[sizeType] ?? FIELD_ICON_PX.md}
        aria-hidden="true"
      />
    );
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

  const isInteractive = Boolean(onClick) && !decorative;

  return (
    <span
      className={resolvedCntClass}
      onClick={isInteractive ? onClick : undefined}
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

Field_icon.propTypes = {
  isActive: PropTypes.bool,
  type: PropTypes.oneOf(["lucide", "svg"]),
  lucidIcon: PropTypes.string,
  svg_src: PropTypes.string,
  onClick: PropTypes.func,
  onHover: PropTypes.func,
  title: PropTypes.string,
  className: PropTypes.string,
  baseStyle: PropTypes.bool,
  sizeType: PropTypes.oneOf(FIELD_SIZE_TYPES),
  inLabel: PropTypes.bool,
  decorative: PropTypes.bool,
};

Field_icon.displayName = "Field_icon";

export default Field_icon;
