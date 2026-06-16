/**
 * Normalise option icon config → Field_icon props.
 *
 * Supported shapes:
 *   "Globe"                          → lucide
 *   { lucidIcon: "Globe" }           → lucide
 *   { type: "lucide", lucidIcon: "Globe" }
 *   { type: "svg", svg_src: url }    → svg asset
 *   { svg_src: url }                 → svg (type inferred)
 */
export const normalizeOptionIcon = (icon) => {
  if (icon == null || icon === "") return null;

  if (typeof icon === "string") {
    return {
      isActive: true,
      type: "lucide",
      lucidIcon: icon,
      decorative: true,
    };
  }

  if (typeof icon !== "object") return null;

  const svg_src = icon.svg_src ?? icon.src;
  const lucidIcon = icon.lucidIcon ?? icon.icon;
  const type = icon.type;

  if (type === "svg" || (svg_src && !lucidIcon)) {
    if (!svg_src) return null;
    return {
      isActive: true,
      type: "svg",
      svg_src,
      decorative: true,
      title: icon.title,
    };
  }

  if (lucidIcon) {
    return {
      isActive: true,
      type: type === "svg" ? "svg" : "lucide",
      lucidIcon,
      svg_src,
      decorative: true,
      title: icon.title,
    };
  }

  return null;
};

export default normalizeOptionIcon;
