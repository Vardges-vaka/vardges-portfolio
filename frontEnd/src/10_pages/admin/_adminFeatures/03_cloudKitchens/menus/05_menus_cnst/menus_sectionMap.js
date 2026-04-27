export const SECTION_KEYS = {
  basic: "basic",
  name: "name",
  categories: "categories",
  branches: "branches",
  brands: "brands",
};

export const EDITABLE_SECTIONS = [
  SECTION_KEYS.basic,
  SECTION_KEYS.name,
  SECTION_KEYS.categories,
  SECTION_KEYS.branches,
  SECTION_KEYS.brands,
];

export const SECTION_LAYOUT = {
  leftColumn: [SECTION_KEYS.basic, SECTION_KEYS.name],
  rightColumn: [
    SECTION_KEYS.categories,
    SECTION_KEYS.branches,
    SECTION_KEYS.brands,
  ],
};
