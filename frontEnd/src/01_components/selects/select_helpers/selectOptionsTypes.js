export const OPTIONS_TYPES = [
  "textOnly",
  "iconOnly",
  "leftIcon",
  "rightIcon",
  "full",
];

export const normalizeOptionsType = (type = "textOnly") =>
  OPTIONS_TYPES.includes(type) ? type : "textOnly";

/** Rich custom picker — anything except plain text-only. */
export const isRichOptionsType = (type) =>
  normalizeOptionsType(type) !== "textOnly";

export default OPTIONS_TYPES;
