export const SECTION_KEYS = {
  basic: "basic",
  name: "name",
  descriptions: "descriptions",
  options: "options",
};

export const SECTION_PAYLOAD_KEY = {
  basic: "basic",
  name: "name",
  descriptions: "descriptions",
  options: "options",
};

export const EDITABLE_SECTIONS = [
  SECTION_KEYS.basic,
  SECTION_KEYS.name,
  SECTION_KEYS.descriptions,
  SECTION_KEYS.options,
];

export const SECTION_LAYOUT = {
  leftColumn: [SECTION_KEYS.basic, SECTION_KEYS.name],
  rightColumn: [SECTION_KEYS.descriptions, SECTION_KEYS.options],
};
