/* ============================================================================
   dataAdapter — pure helpers that bridge nested mock data into the flat
   shape NewMenu's UI prefers (id-keyed lookups + small derived counts).

   The temp mock dataset under .temp_MOCK_DATA/ is doubly-shaped:
     • Flat top-level arrays  — MENUS, MOCK_MENU_ITEMS, MODIFIERS, OPTIONS
     • Same entities nested inside menus.categories[].menuItems[].item.modifiers[].modifier.options[].option

   This module never mutates the originals; everything is read-only derivation.
============================================================================ */

/* ---------------------------------------------------------------- */
/* Index builders — O(n) one-shot, called once on mount.            */
/* ---------------------------------------------------------------- */
const indexById = (list) => {
  const out = {};
  for (const item of list || []) {
    if (item?._id != null) out[item._id] = item;
  }
  return out;
};

export const buildIndexes = ({ MENUS, MOCK_MENU_ITEMS, MODIFIERS, OPTIONS }) => ({
  menus: MENUS || [],
  items: MOCK_MENU_ITEMS || [],
  modifiers: MODIFIERS || [],
  options: OPTIONS || [],
  menusById: indexById(MENUS),
  itemsById: indexById(MOCK_MENU_ITEMS),
  modifiersById: indexById(MODIFIERS),
  optionsById: indexById(OPTIONS),
});

/* ---------------------------------------------------------------- */
/* Nested traversals — used when the user opens an inner row.        */
/* ---------------------------------------------------------------- */
export const findItemInMenu = (menu, id) => {
  if (!menu?.categories || !id) return null;
  for (const cat of menu.categories) {
    for (const entry of cat.menuItems || []) {
      const item = entry?.item;
      if (item?._id === id) return item;
    }
  }
  return null;
};

export const findModifierInItem = (item, id) => {
  if (!item?.modifiers || !id) return null;
  for (const entry of item.modifiers) {
    const mod = entry?.modifier;
    if (mod?._id === id) return mod;
  }
  return null;
};

export const findOptionInModifier = (modifier, id) => {
  if (!modifier?.options || !id) return null;
  for (const entry of modifier.options) {
    const opt = entry?.option || entry;
    if (opt?._id === id) return opt;
  }
  return null;
};

/* ---------------------------------------------------------------- */
/* Derived counts — used by the menus table for the summary cells.   */
/* ---------------------------------------------------------------- */
export const getMenuStats = (menu) => {
  if (!menu?.categories) {
    return { categories: 0, items: 0, modifiers: 0, options: 0 };
  }
  let itemCount = 0;
  const modifierIds = new Set();
  const optionIds = new Set();
  for (const cat of menu.categories) {
    for (const entry of cat.menuItems || []) {
      itemCount += 1;
      const item = entry?.item;
      for (const modEntry of item?.modifiers || []) {
        const mod = modEntry?.modifier;
        if (mod?._id) modifierIds.add(mod._id);
        for (const optEntry of mod?.options || []) {
          const opt = optEntry?.option || optEntry;
          if (opt?._id) optionIds.add(opt._id);
        }
      }
    }
  }
  return {
    categories: menu.categories.length,
    items: itemCount,
    modifiers: modifierIds.size,
    options: optionIds.size,
  };
};

/* ---------------------------------------------------------------- */
/* Owner-type filter — applied uniformly to every list view.         */
/* ---------------------------------------------------------------- */
export const filterByOwner = (list, ownerType) =>
  ownerType === "both" ? list : (list || []).filter((x) => x?.ownerType === ownerType);

/* ---------------------------------------------------------------- */
/* Light unwrappers — every collection in the source is wrapped in
   { item }, { modifier }, { option } envelopes; centralise the
   defensive accessor here so callers can stay simple.
---------------------------------------------------------------- */
export const unwrapItems = (entries) =>
  (entries || []).map((e) => e?.item || e).filter(Boolean);

export const unwrapModifiers = (entries) =>
  (entries || []).map((e) => e?.modifier || e).filter(Boolean);

export const unwrapOptions = (entries) =>
  (entries || []).map((e) => e?.option || e).filter(Boolean);
