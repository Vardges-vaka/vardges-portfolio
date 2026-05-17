/** Normalise competitor row fields for table display (mock shapes + schema-ish shapes). */

import { getCuisineDisplayLabelForRowItem } from "./competitors_cuisineTags_helpers.js";

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

/** Count attached files (array length from mock / API). */
export function getCompetitorFilesCount(files) {
  if (files == null) return 0;
  if (Array.isArray(files)) return files.length;
  if (typeof files === "object" && typeof files.totalQnt === "number") {
    return files.totalQnt;
  }
  return 0;
}

/**
 * Aggregate rating + review volume from `avgRatingPerPlatform` /
 * `avgReviewCountPerPlatform`, or from branch `platforms[]` when maps are empty.
 * @returns {{ avgRating: number|null, reviewCount: number|null }}
 */
export function getCompetitorRatingReviewSummary(competitor) {
  let avgRating = null;
  let reviewTotal = 0;

  const ratingMap = competitor?.avgRatingPerPlatform;
  if (ratingMap && typeof ratingMap === "object") {
    let sum = 0;
    let n = 0;
    for (const v of Object.values(ratingMap)) {
      if (typeof v === "number" && !Number.isNaN(v)) {
        sum += v;
        n += 1;
      }
    }
    if (n > 0) avgRating = sum / n;
  }

  const countMap = competitor?.avgReviewCountPerPlatform;
  if (countMap && typeof countMap === "object") {
    for (const v of Object.values(countMap)) {
      if (typeof v === "number" && !Number.isNaN(v)) reviewTotal += v;
    }
  }

  if (
    avgRating == null &&
    reviewTotal === 0 &&
    competitor?.branches &&
    typeof competitor.branches === "object" &&
    Array.isArray(competitor.branches.locations)
  ) {
    let rSum = 0;
    let rN = 0;
    let rev = 0;
    for (const loc of competitor.branches.locations) {
      const plats = loc?.platforms;
      if (!Array.isArray(plats)) continue;
      for (const p of plats) {
        if (p == null) continue;
        if (typeof p.rating === "number" && !Number.isNaN(p.rating)) {
          rSum += p.rating;
          rN += 1;
        }
        if (typeof p.reviewCount === "number" && !Number.isNaN(p.reviewCount)) {
          rev += p.reviewCount;
        }
      }
    }
    if (rN > 0) avgRating = rSum / rN;
    if (rev > 0) reviewTotal = rev;
  }

  return {
    avgRating,
    reviewCount: reviewTotal > 0 ? reviewTotal : null,
  };
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
    if (cat != null && Array.isArray(cat.menuItems))
      total += cat.menuItems.length;
  }
  return total;
}

export function getCuisineTagsForRow(cuisineTypes, max = 3) {
  if (!Array.isArray(cuisineTypes)) return [];
  return cuisineTypes
    .map((c) => getCuisineDisplayLabelForRowItem(c))
    .filter(Boolean)
    .slice(0, max);
}

export function getCompetesWithLogos(competesWithBrands, max = 3, allCompetitors = null) {
  if (competesWithBrands == null) return [];
  if (Array.isArray(competesWithBrands)) {
    return competesWithBrands
      .map((item) => {
        if (item == null) return null;
        if (typeof item === "string") {
          return { src: null, alt: item, isId: true };
        }
        const resolved =
          item.brand != null && Array.isArray(allCompetitors)
            ? allCompetitors.find((c) => String(c?._id) === String(item.brand))
            : null;
        if (resolved) {
          return {
            src: resolved.logo || null,
            alt: resolved.name || "Competitor",
            isId: !resolved.logo,
          };
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
