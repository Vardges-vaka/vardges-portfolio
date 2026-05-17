import { CUISINE_TAGS } from "../05_competitors_cnst/_competitors_cnst.index.js";

/** Stable section order for UI grouped by `type`. */
export const CUISINE_TAG_TYPE_ORDER = [
  "cuisine",
  "category",
  "dietary",
  "mealType",
  "dessertBeverage",
];

export function findCuisineTagByValue(value) {
  if (value == null || value === "") return null;
  const v = String(value).trim().toLowerCase();
  return CUISINE_TAGS.find((t) => t.value === v) || null;
}

export function findCuisineTagByLabelOrToken(token) {
  if (token == null || token === "") return null;
  const lower = String(token).trim().toLowerCase();
  return (
    CUISINE_TAGS.find(
      (t) =>
        t.value === lower ||
        String(t.label).trim().toLowerCase() === lower,
    ) || null
  );
}

export function resolveCuisineTagMeta(item) {
  if (item == null) return null;
  if (typeof item === "string") return findCuisineTagByLabelOrToken(item);
  if (typeof item === "object") {
    if (item.value != null && item.value !== "")
      return (
        findCuisineTagByValue(item.value) ||
        findCuisineTagByLabelOrToken(item.value)
      );
    if (item.tag != null && item.tag !== "")
      return findCuisineTagByLabelOrToken(item.tag);
  }
  return null;
}

/** Row / map label: prefer catalog label, fall back to stored tag string. */
export function getCuisineDisplayLabelForRowItem(item) {
  const meta = resolveCuisineTagMeta(item);
  if (meta) return meta.label;
  if (typeof item === "string" && item.trim()) return item.trim();
  if (typeof item === "object" && item?.tag != null) return String(item.tag);
  return "";
}

export function buildCuisineTypesPayloadFromValues(values) {
  const list = Array.isArray(values) ? values : [...values];
  const out = [];
  const seen = new Set();
  for (const raw of list) {
    const meta =
      findCuisineTagByValue(raw) || findCuisineTagByLabelOrToken(raw);
    if (!meta || seen.has(meta.value)) continue;
    seen.add(meta.value);
    out.push({
      value: meta.value,
      tag: meta.label,
      description: meta.description,
    });
  }
  return out;
}

/**
 * Split stored `cuisineTypes` into catalog `value` ids and legacy rows
 * that do not resolve to `CUISINE_TAGS` (kept for backward compatibility).
 */
export function splitCompetitorCuisineForEditor(cuisineTypes) {
  const knownValues = [];
  const legacyRows = [];
  if (!Array.isArray(cuisineTypes))
    return { knownValues: [], legacyRows: [] };

  for (const item of cuisineTypes) {
    const meta = resolveCuisineTagMeta(item);
    if (meta) {
      if (!knownValues.includes(meta.value)) knownValues.push(meta.value);
      continue;
    }
    if (typeof item === "object" && item?.tag) {
      legacyRows.push({
        tag: String(item.tag),
        description:
          item.description != null ? String(item.description) : "",
      });
    } else if (typeof item === "string" && item.trim()) {
      legacyRows.push({ tag: item.trim(), description: "" });
    }
  }
  return { knownValues, legacyRows };
}

export function buildSavedCuisineTypes({ values, legacyRows }) {
  const canonical = buildCuisineTypesPayloadFromValues(values);
  const used = new Set(canonical.map((c) => c.value));
  const usedTags = new Set(
    canonical.map((c) => String(c.tag).trim().toLowerCase()),
  );
  const out = [...canonical];
  for (const leg of legacyRows || []) {
    const tagKey = String(leg.tag).trim().toLowerCase();
    if (!tagKey || usedTags.has(tagKey)) continue;
    usedTags.add(tagKey);
    const meta = findCuisineTagByLabelOrToken(leg.tag);
    if (meta) {
      if (!used.has(meta.value)) {
        used.add(meta.value);
        out.push({
          value: meta.value,
          tag: meta.label,
          description: meta.description,
        });
      }
      continue;
    }
    out.push({
      tag: leg.tag,
      description: leg.description || "",
    });
  }
  return out;
}

export function groupCuisineTagsByTypeOrdered(tags = CUISINE_TAGS) {
  const bucket = new Map();
  for (const tag of tags) {
    const ty = tag.type || "other";
    if (!bucket.has(ty)) bucket.set(ty, []);
    bucket.get(ty).push(tag);
  }
  const ordered = [];
  for (const ty of CUISINE_TAG_TYPE_ORDER) {
    const list = bucket.get(ty);
    if (list?.length) ordered.push({ type: ty, tags: list });
  }
  for (const [ty, list] of bucket) {
    if (!CUISINE_TAG_TYPE_ORDER.includes(ty) && list.length)
      ordered.push({ type: ty, tags: list });
  }
  return ordered;
}

export function filterCuisineTags(tags, searchText) {
  const q = String(searchText || "").trim().toLowerCase();
  if (!q) return tags;
  return tags.filter((tag) => {
    const blob = [
      tag.value,
      tag.label,
      tag.description,
      ...(Array.isArray(tag.platforms) ? tag.platforms : []),
    ]
      .join(" ")
      .toLowerCase();
    return blob.includes(q);
  });
}

/** Aggregator ids used in `CUISINE_TAGS.platforms` and the admin filter UI. */
export const CATALOG_PLATFORM_IDS = [
  "talabat",
  "deliveroo",
  "noon",
  "careem",
  "keeta",
];

/**
 * When `selectedPlatforms` is empty, no platform filter is applied.
 * Otherwise a tag must list at least one selected platform.
 */
export function filterCuisineTagsByPlatforms(tags, selectedPlatforms) {
  const set =
    selectedPlatforms instanceof Set
      ? selectedPlatforms
      : new Set(
          Array.isArray(selectedPlatforms) ? selectedPlatforms : [],
        );
  if (set.size === 0) return tags;
  return tags.filter((tag) => {
    const pl = Array.isArray(tag.platforms) ? tag.platforms : [];
    return pl.some((p) => set.has(String(p).trim().toLowerCase()));
  });
}

/** Selected catalog tags in stable type order (for view mode chips). */
export function getCatalogTagsForValues(valueIds) {
  const set = new Set(Array.isArray(valueIds) ? valueIds : []);
  const out = [];
  for (const ty of CUISINE_TAG_TYPE_ORDER) {
    for (const tag of CUISINE_TAGS) {
      if (tag.type === ty && set.has(tag.value)) out.push(tag);
    }
  }
  return out;
}
