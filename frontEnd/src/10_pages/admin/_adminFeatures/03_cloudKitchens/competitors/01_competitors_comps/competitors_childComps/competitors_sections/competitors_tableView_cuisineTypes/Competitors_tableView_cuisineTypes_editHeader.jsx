import "../../../../_styles/competitors_tableView_cuisineTypes/competitors_tableView_cuisineTypes_editHeader.css";
import {
  CATALOG_PLATFORM_IDS,
  CUISINE_TAG_TYPE_ORDER,
} from "../../../../02_competitors_helpers/competitors_cuisineTags_helpers.js";
import { CUISINE_PLATFORM_ICON_BY_ID } from "../../../../05_competitors_cnst/_competitors_cnst.index.js";

const Competitors_tableView_cuisineTypes_editHeader = ({
  states,
  handlers,
  t,
}) => {
  const allLabel = t
    ? t("cuisineTypes.filterAllTypes", "All types")
    : "All types";
  const platformFilterLabel = t
    ? t("cuisineTypes.filterPlatforms", "Platforms")
    : "Platforms";
  const searchPlaceholder = t
    ? t("cuisineTypes.searchPlaceholder", "Search tags…")
    : "Search tags…";

  const sectionTitle = (ty) =>
    t(`cuisineTypes.sectionTitles.${ty}`, { defaultValue: ty });

  const platformAria = (id) =>
    t("cuisineTypes.togglePlatformFilter", "Filter by {{id}}", {
      id,
    });

  return (
    <div className="cuisineTypesEditHeader">
      <div
        className="cuisineTypesEditHeader__typeRow"
        role="toolbar"
        aria-label={allLabel}>
        <button
          type="button"
          className={
            "cuisineTypesEditHeader__typeBtn" +
            (states.typeFilter === "all"
              ? " cuisineTypesEditHeader__typeBtnActive"
              : "")
          }
          onClick={() => handlers?.onTypeFilter("all")}>
          {allLabel}
        </button>
        {CUISINE_TAG_TYPE_ORDER.map((ty) => (
          <button
            key={ty}
            type="button"
            className={
              "cuisineTypesEditHeader__typeBtn" +
              (states.typeFilter === ty
                ? " cuisineTypesEditHeader__typeBtnActive"
                : "")
            }
            data-cuisine-type={ty}
            onClick={() => handlers?.onTypeFilter(ty)}>
            {sectionTitle(ty)}
          </button>
        ))}
      </div>

      <label className="cuisineTypesEditHeader__searchLabel">
        <span className="cuisineTypesEditHeader__visuallyHidden">
          {searchPlaceholder}
        </span>
        <input
          type="search"
          className="cuisineTypesEditHeader__searchInput"
          value={states.search}
          onChange={(e) => handlers?.onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          autoComplete="off"
        />
      </label>

      <div className="cuisineTypesEditHeader__platformBlock">
        <span className="cuisineTypesEditHeader__platformLabel">
          {platformFilterLabel}
        </span>
        <div
          className="cuisineTypesEditHeader__platformRow"
          role="group"
          aria-label={platformFilterLabel}>
          {CATALOG_PLATFORM_IDS.map((pid) => {
            const id = String(pid).toLowerCase();
            const selected = states.platformFilterSet.has(id);
            const src = CUISINE_PLATFORM_ICON_BY_ID[id];
            return (
              <button
                key={id}
                type="button"
                className={
                  "cuisineTypesEditHeader__platformBtn" +
                  (selected
                    ? " cuisineTypesEditHeader__platformBtnSelected"
                    : "")
                }
                aria-pressed={selected}
                title={platformAria(id)}
                onClick={() => handlers?.onTogglePlatform(id)}>
                {src ? (
                  <img
                    className="cuisineTypesEditHeader__platformImg"
                    src={src}
                    alt=""
                    loading="lazy"
                  />
                ) : (
                  <span className="cuisineTypesEditHeader__platformFallback">
                    {id}
                  </span>
                )}
                {selected ? (
                  <span
                    className="cuisineTypesEditHeader__platformPulse"
                    aria-hidden
                  />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Competitors_tableView_cuisineTypes_editHeader;
