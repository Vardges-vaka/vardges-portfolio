export const SECTION_KEYS = {
  basic: "basic",
  name: "name",
  items: "items",
};

export const EDITABLE_SECTIONS = [
  SECTION_KEYS.basic,
  SECTION_KEYS.name,
  SECTION_KEYS.items,
];

export const SECTION_LAYOUT = {
  leftColumn: [SECTION_KEYS.basic, SECTION_KEYS.name],
  rightColumn: [SECTION_KEYS.items],
};
