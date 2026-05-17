import { findCuisineTagByValue } from "../../../../02_competitors_helpers/_competitors_helpers.index.js";

/** Human-readable cuisine value labels for overlap lines (catalog label or raw value). */
export const competitorsTableViewCompetesWithBrands_tagLabels = (valueIds) =>
  (valueIds || [])
    .map((v) => findCuisineTagByValue(v)?.label || v)
    .filter(Boolean)
    .join(", ");
