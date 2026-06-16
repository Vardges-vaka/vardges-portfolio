import { normalizeOptionsType } from "./selectOptionsTypes.js";
import { normalizeOptionIcon } from "./normalizeOptionIcon.js";

const readIcon = (opt, side) => {
  if (side === "left") return opt.leftIcon ?? opt.left_Icon ?? null;
  return opt.rightIcon ?? opt.right_Icon ?? null;
};

/**
 * Normalise options — icons use Field_icon config (lucide string or svg object).
 * Layout is controlled by Select_static `optionsType`.
 */
export const normalizeSelectOptions = (
  options = [],
  {
    optionValueKey = "value",
    optionLabelKey = "label",
    optionsType = "textOnly",
  } = {},
) => {
  const type = normalizeOptionsType(optionsType);

  return options
    .map((opt, index) => {
      if (opt == null) return null;

      const value = opt[optionValueKey];
      const label = opt[optionLabelKey] ?? "";

      const ariaLabel =
        opt.ariaLabel ??
        (type === "iconOnly"
          ? (opt.title ?? String(value ?? index))
          : label || String(value ?? index));

      return {
        value: value ?? "",
        label,
        leftIcon: normalizeOptionIcon(readIcon(opt, "left")),
        rightIcon: normalizeOptionIcon(readIcon(opt, "right")),
        disabled: Boolean(opt.disabled),
        ariaLabel,
        optionsType: type,
      };
    })
    .filter(Boolean);
};

export default normalizeSelectOptions;
