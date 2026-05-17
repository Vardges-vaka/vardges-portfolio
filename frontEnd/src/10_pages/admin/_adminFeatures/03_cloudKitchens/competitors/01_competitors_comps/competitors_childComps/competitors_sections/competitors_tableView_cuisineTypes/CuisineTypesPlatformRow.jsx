import { CUISINE_PLATFORM_ICON_BY_ID } from "../../../../05_competitors_cnst/_competitors_cnst.index.js";

import "../../../../_styles/competitors_tableView_cuisineTypes/cuisineTypesPlatformRow.css";

const CuisineTypesPlatformRow = ({ platformIds, t, size = "md" }) => {
  const list = Array.isArray(platformIds) ? platformIds : [];
  if (!list.length) return null;
  const rootClass =
    "cuisineTypesPlatformRow" +
    (size === "sm" ? " cuisineTypesPlatformRowSm" : "");
  return (
    <div className={rootClass}>
      {list.map((raw) => {
        const id = String(raw || "")
          .trim()
          .toLowerCase();
        const src = CUISINE_PLATFORM_ICON_BY_ID[id];
        const label = t
          ? t(`cuisineTypes.platformLabels.${id}`, {
              defaultValue: id,
            })
          : id;
        if (!src) {
          return (
            <span key={id} className="cuisineTypesPlatformRow__fallback">
              {label}
            </span>
          );
        }
        return (
          <span
            key={id}
            className="cuisineTypesPlatformRow__item"
            title={label}>
            <img
              className="cuisineTypesPlatformRow__img"
              src={src}
              alt=""
              loading="lazy"
            />
          </span>
        );
      })}
    </div>
  );
};

export default CuisineTypesPlatformRow;
