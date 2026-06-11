export const LABEL_POSITIONS = ["top", "bottom", "inline"];

export const LABEL_INLINE_POSITIONS = ["before", "after"];

/** Shared by labels and hints — default is `"left"`. */
export const TEXT_ALIGN_POSITIONS = ["left", "center", "right"];

export const LABEL_TEXT_POSITIONS = TEXT_ALIGN_POSITIONS;

export const HINT_TEXT_POSITIONS = TEXT_ALIGN_POSITIONS;

/** Accepts legacy alias `down` → `bottom`. */
export const normalizeLabelPosition = (position = "top") => {
  if (position === "down") return "bottom";
  return LABEL_POSITIONS.includes(position) ? position : "top";
};

export const normalizeTextAlign = (align = "left") =>
  TEXT_ALIGN_POSITIONS.includes(align) ? align : "left";

export const textAlignClassSuffix = (align = "left") => {
  const normalized = normalizeTextAlign(align);
  return normalized.charAt(0).toUpperCase() + normalized.slice(1);
};

export default {
  LABEL_POSITIONS,
  LABEL_INLINE_POSITIONS,
  TEXT_ALIGN_POSITIONS,
  LABEL_TEXT_POSITIONS,
  HINT_TEXT_POSITIONS,
  normalizeLabelPosition,
  normalizeTextAlign,
  textAlignClassSuffix,
};
