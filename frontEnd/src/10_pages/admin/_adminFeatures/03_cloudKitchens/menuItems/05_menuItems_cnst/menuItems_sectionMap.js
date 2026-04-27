export const SECTION_KEYS = {
  basic: "basic",
  name: "name",
  modifiers: "modifiers",
  descriptions: "descriptions",
};

export const PLACEHOLDER_SECTION_KEYS = {
  images: "images",
  recipeFile: "recipeFile",
  ingredients: "ingredients",
};

export const SECTION_PAYLOAD_KEY = {
  basic: "basic",
  name: "name",
  modifiers: "modifiers",
  descriptions: "descriptions",
};

export const EDITABLE_SECTIONS = [
  SECTION_KEYS.basic,
  SECTION_KEYS.name,
  SECTION_KEYS.modifiers,
  SECTION_KEYS.descriptions,
];

export const SECTION_LAYOUT = {
  leftColumn: [
    SECTION_KEYS.basic,
    SECTION_KEYS.name,
    SECTION_KEYS.modifiers,
  ],
  rightColumn: [
    SECTION_KEYS.descriptions,
    PLACEHOLDER_SECTION_KEYS.images,
    PLACEHOLDER_SECTION_KEYS.recipeFile,
    PLACEHOLDER_SECTION_KEYS.ingredients,
  ],
};
