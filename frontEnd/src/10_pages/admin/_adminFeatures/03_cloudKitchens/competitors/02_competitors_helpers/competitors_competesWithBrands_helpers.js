/**
 * Helpers for `competesWithBrands` (refs to other Competitors + link metadata).
 * `cuisineTypes` on each competitor uses `{ value, tag, description }[]` from the catalog.
 */

export const getCuisineValuesFromRow = (row) =>
  (row?.cuisineTypes ?? [])
    .map((x) => x?.value)
    .filter(Boolean);

export const intersectCuisineValues = (hostRow, otherRow) => {
  const hostSet = new Set(getCuisineValuesFromRow(hostRow));
  return getCuisineValuesFromRow(otherRow).filter((v) => hostSet.has(v));
};

/**
 * Other competitors that share ≥1 cuisine `value` with `host`, excluding `host`,
 * excluding ids already linked in `linkedBrandIds`.
 */
export const getEligibleCompetitorsForCompetesWithBrandsAdd = (
  host,
  allCompetitors,
  linkedBrandIds,
) => {
  if (!host || !Array.isArray(allCompetitors)) return [];
  const hostId = String(host?._id ?? "");
  const linked = linkedBrandIds instanceof Set ? linkedBrandIds : new Set();

  return allCompetitors
    .filter((y) => y && String(y._id) !== hostId && !linked.has(String(y._id)))
    .map((y) => ({
      competitor: y,
      cuisineTags: intersectCuisineValues(host, y),
    }))
    .filter((x) => x.cuisineTags.length > 0)
    .sort((a, b) => {
      if (b.cuisineTags.length !== a.cuisineTags.length) {
        return b.cuisineTags.length - a.cuisineTags.length;
      }
      return String(a.competitor.name || "").localeCompare(
        String(b.competitor.name || ""),
      );
    });
};

export const resolveCompetitorById = (allCompetitors, brandId) => {
  if (brandId == null || !Array.isArray(allCompetitors)) return null;
  const id = String(brandId);
  return allCompetitors.find((c) => String(c?._id) === id) || null;
};

/**
 * Mock / UI: up to `max` other competitors sharing ≥1 cuisine `value` with `host`.
 * Matches `Competitor.competesWithBrands` subdocument shape (brand ref + link fields).
 */
export const buildCompetesWithBrandsLinksForHost = (host, allRows, max = 5) => {
  if (!host || !Array.isArray(allRows)) return [];
  const hostId = String(host?._id ?? "");
  return allRows
    .filter((y) => y && String(y._id) !== hostId)
    .map((y) => {
      const cuisineTags = intersectCuisineValues(host, y);
      return { y, cuisineTags };
    })
    .filter((x) => x.cuisineTags.length > 0)
    .sort((a, b) => {
      if (b.cuisineTags.length !== a.cuisineTags.length) {
        return b.cuisineTags.length - a.cuisineTags.length;
      }
      return String(a.y._id).localeCompare(String(b.y._id));
    })
    .slice(0, max)
    .map(({ y, cuisineTags }, idx) => ({
      brand: String(y._id),
      cuisineTags: [...cuisineTags].sort(),
      platform: idx % 3 === 0 ? "talabat" : idx % 3 === 1 ? "deliveroo" : "noon",
      observations:
        idx === 0
          ? [
              {
                date: new Date("2025-10-15"),
                note: "Watch promos and overlapping delivery zones.",
                addedBy: null,
                tags: ["pricing"],
              },
            ]
          : [],
    }));
};
