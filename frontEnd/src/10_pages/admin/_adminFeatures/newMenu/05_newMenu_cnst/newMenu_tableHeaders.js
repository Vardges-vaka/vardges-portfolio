/* ============================================================================
   newMenu_tableHeaders — column header definitions for each entity's table.
   Each entry: { key, label, className, title }
   - key      — stable id (used as React key)
   - label    — displayed text (i18n overlays at render — `t(key)`)
   - className — applied to the <th> for column-specific styling
   - title    — native browser tooltip
============================================================================ */

export const NEW_MENU_MENUS_HEADERS = [
  { key: "idx", label: "#", className: "idx", title: "Row index" },
  { key: "label", label: "Label", className: "label", title: "Menu label" },
  { key: "status", label: "Status", className: "status", title: "Active or inactive" },
  { key: "description", label: "Description", className: "description", title: "Menu description" },
  { key: "owner", label: "Owner", className: "owner", title: "Brand or competitor" },
  { key: "categories", label: "Categories", className: "categories", title: "Number of categories" },
  { key: "items", label: "Items", className: "items", title: "Total items across categories" },
  { key: "modifiers", label: "Modifiers", className: "modifiers", title: "Unique modifiers across items" },
  { key: "options", label: "Options", className: "options", title: "Unique options across modifiers" },
  { key: "createdBy", label: "Created by", className: "createdBy", title: "Author" },
  { key: "createdAt", label: "Created at", className: "createdAt", title: "Creation date" },
  { key: "updatedBy", label: "Updated by", className: "updatedBy", title: "Last editor" },
  { key: "updatedAt", label: "Updated at", className: "updatedAt", title: "Last edit date" },
  { key: "update", label: "Update", className: "update", title: "Open in update mode" },
  { key: "view", label: "View", className: "view", title: "Open detail view" },
  { key: "dropdown", label: "Quick", className: "dropdown", title: "Toggle quick view" },
];

export const NEW_MENU_ITEMS_HEADERS = [
  { key: "idx", label: "#", className: "idx", title: "Row index" },
  { key: "image", label: "Image", className: "image", title: "Item image" },
  { key: "categories", label: "Categories", className: "categories", title: "Categories the item appears in" },
  { key: "name", label: "Name", className: "name", title: "Item name" },
  { key: "price", label: "Price", className: "price", title: "Selling price (gross)" },
  { key: "cost", label: "Cost", className: "cost", title: "Estimated cost" },
  { key: "prep", label: "Prep", className: "prep", title: "Preparation time" },
  { key: "owner", label: "Owner", className: "owner", title: "Brand or competitor" },
  { key: "calories", label: "Calories", className: "calories", title: "Calories per serving" },
  { key: "dietary", label: "Dietary", className: "dietary", title: "Dietary tags" },
  { key: "allergens", label: "Allergens", className: "allergens", title: "Allergens" },
  { key: "modifiers", label: "Modifiers", className: "modifiers", title: "Attached modifiers" },
  { key: "mirrored", label: "Mirrored", className: "mirrored", title: "Mirrored with other items" },
  { key: "competes", label: "Competes", className: "competes", title: "Competes with other items" },
  { key: "update", label: "Update", className: "update", title: "Open in update mode" },
  { key: "view", label: "View", className: "view", title: "Open detail view" },
  { key: "dropdown", label: "Quick", className: "dropdown", title: "Toggle quick view" },
];

export const NEW_MENU_MODIFIERS_HEADERS = [
  { key: "idx", label: "#", className: "idx", title: "Row index" },
  { key: "usedBy", label: "Used by", className: "usedBy", title: "Items using this modifier" },
  { key: "name", label: "Name", className: "name", title: "Modifier title" },
  { key: "description", label: "Description", className: "description", title: "Modifier description" },
  { key: "optionsPreview", label: "Options", className: "optionsPreview", title: "Stacked preview of contained options" },
  { key: "owner", label: "Owner", className: "owner", title: "Brand or competitor" },
  { key: "timings", label: "Active timings", className: "timings", title: "When the modifier is active" },
  { key: "optionality", label: "Optionality", className: "optionality", title: "Optional or mandatory" },
  { key: "selectionMode", label: "Selection", className: "selectionMode", title: "Selection mode" },
  { key: "pricing", label: "Pricing", className: "pricing", title: "Free or paid" },
  { key: "update", label: "Update", className: "update", title: "Open in update mode" },
  { key: "view", label: "View", className: "view", title: "Open detail view" },
  { key: "dropdown", label: "Quick", className: "dropdown", title: "Toggle quick view" },
];

export const NEW_MENU_OPTIONS_HEADERS = [
  { key: "idx", label: "#", className: "idx", title: "Row index" },
  { key: "image", label: "Image", className: "image", title: "Option image" },
  { key: "usedIn", label: "Used in", className: "usedIn", title: "Modifiers using this option" },
  { key: "name", label: "Name", className: "name", title: "Option name" },
  { key: "description", label: "Description", className: "description", title: "Option description" },
  { key: "owner", label: "Owner", className: "owner", title: "Brand or competitor" },
  { key: "price", label: "Price", className: "price", title: "Selling price (gross)" },
  { key: "cost", label: "Cost", className: "cost", title: "Estimated cost" },
  { key: "pricing", label: "Pricing", className: "pricing", title: "Free or paid" },
  { key: "calories", label: "Calories", className: "calories", title: "Calories per serving" },
  { key: "recipe", label: "Recipe", className: "recipe", title: "Recipe file" },
  { key: "techCard", label: "Tech card", className: "techCard", title: "Tech card file" },
  { key: "update", label: "Update", className: "update", title: "Open in update mode" },
  { key: "view", label: "View", className: "view", title: "Open detail view" },
  { key: "dropdown", label: "Quick", className: "dropdown", title: "Toggle quick view" },
];
