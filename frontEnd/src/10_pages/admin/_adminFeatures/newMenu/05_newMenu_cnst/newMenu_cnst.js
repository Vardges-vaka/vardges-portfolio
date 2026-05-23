/* ============================================================================
   newMenu_cnst — enum lists for the NewMenu feature.
   These are the only valid string values for session, viewingType, ownerType,
   and form kind; everything else asserts against these.
============================================================================ */

export const SESSIONS = ["menus", "items", "modifiers", "options"];
export const VIEWING_TYPES = ["all", "single"];
export const OWNER_TYPES_ALL = ["brand", "competitor", "both"];
export const OWNER_TYPES_PICKABLE = ["brand", "competitor"];

export const FORM_KINDS = ["menu", "menuItem", "modifier", "option", "category"];

/* Map session -> form kind launched by the "+ New" button in the top bar. */
export const SESSION_FORM_KIND = {
  menus: "menu",
  items: "menuItem",
  modifiers: "modifier",
  options: "option",
};

/* Pretty labels (used by breadcrumb + add button — i18n overlays these). */
export const SESSION_LABELS = {
  menus: "Menus",
  items: "Items",
  modifiers: "Modifiers",
  options: "Options",
};

/* Form copy per kind — fed into NewMenu_form. i18n keys override at render. */
export const FORM_COPY = {
  menu: {
    entity: "menu",
    title: "Create a menu",
    input: "Menu label",
    hint: 'e.g. "Main Dining Menu"',
  },
  menuItem: {
    entity: "menu item",
    title: "Create a menu item",
    input: "Item name",
    hint: 'e.g. "Strawberry Pavlova"',
  },
  modifier: {
    entity: "modifier",
    title: "Create a modifier",
    input: "Modifier title",
    hint: 'e.g. "Sauce"',
  },
  option: {
    entity: "option",
    title: "Create an option",
    input: "Option name",
    hint: 'e.g. "Strawberry coulis"',
  },
  category: {
    entity: "category",
    title: "Create a category",
    input: "Category name",
    hint: 'e.g. "Desserts"',
  },
};
