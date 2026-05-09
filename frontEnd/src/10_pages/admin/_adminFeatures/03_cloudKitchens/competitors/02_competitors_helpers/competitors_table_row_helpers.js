/** Normalise competitor row fields for table display (mock shapes + schema-ish shapes). */

export function getCompetitorMenuName(menu) {
  if (menu == null) return "";
  if (typeof menu === "string") return menu;
  if (typeof menu === "object" && menu.name != null) return String(menu.name);
  return "";
}

export function getCompetitorBranchesCount(branches) {
  if (branches == null) return null;
  if (Array.isArray(branches)) return branches.length;
  if (typeof branches === "object") {
    if (typeof branches.totalQnt === "number") return branches.totalQnt;
    if (Array.isArray(branches.locations)) return branches.locations.length;
  }
  return null;
}

/** Count menu categories from populated menu or embedded mock shape. */
export function getCompetitorMenuCategoriesCount(menu) {
  if (menu == null) return null;
  if (typeof menu !== "object") return null;
  if (Array.isArray(menu.categories)) return menu.categories.length;
  return null;
}

/** Total menu items across all categories (populated menu / mock). */
export function getCompetitorMenuItemsCount(menu) {
  if (menu == null) return null;
  if (typeof menu !== "object") return null;
  if (!Array.isArray(menu.categories)) return null;
  let total = 0;
  for (const cat of menu.categories) {
    if (cat != null && Array.isArray(cat.menuItems)) total += cat.menuItems.length;
  }
  return total;
}

export function getCuisineTagsForRow(cuisineTypes, max = 3) {
  if (!Array.isArray(cuisineTypes)) return [];
  return cuisineTypes
    .map((c) => (typeof c === "string" ? c : c?.tag))
    .filter(Boolean)
    .slice(0, max);
}

export function getCompetesWithLogos(competesWithBrands, max = 3) {
  if (competesWithBrands == null) return [];
  if (Array.isArray(competesWithBrands)) {
    return competesWithBrands
      .map((item) => {
        if (item == null) return null;
        if (typeof item === "string") {
          return { src: null, alt: item, isId: true };
        }
        const src = item.logo || item.image;
        const alt = item.name || item.tag || "Brand";
        return { src: src || null, alt, isId: !src };
      })
      .filter(Boolean)
      .slice(0, max);
  }
  if (typeof competesWithBrands === "object") {
    const src = competesWithBrands.logo || competesWithBrands.image;
    if (src)
      return [{ src, alt: competesWithBrands.name || "Brand", isId: false }];
  }
  return [];
}

export function formatPriceRangeLabel(priceRange, t) {
  if (priceRange == null || priceRange === "") return "—";
  const normalized = String(priceRange).trim().toLowerCase();
  const keyMap = {
    budget: "priceRange.budget",
    mid: "priceRange.mid",
    premium: "priceRange.premium",
  };
  const i18nKey = keyMap[normalized];
  if (i18nKey && t) return t(i18nKey, { defaultValue: normalized });
  if (i18nKey) return normalized;
  return String(priceRange);
}
