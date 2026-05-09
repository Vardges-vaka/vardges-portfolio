import "../../../_styles/competitors_mapView_info.css";
import { useMemo } from "react";
import {
  getCompetitorMapSummary,
  toNum,
  getCompetitorMenuItemsCount,
  getCompetitorMenuCategoriesCount,
  formatPriceRangeLabel,
} from "../../../02_competitors_helpers/_competitors_helpers.index.js";

const Competitors_mapView_info = ({
  t,
  competitors,
  infoPanelCompetitorId,
  activeMarkerKey,
  showAllPolygon,
  showAllRadius,
  polygonByMarkerKey,
  radiusByMarkerKey,
  onClearCompetitorInfo,
  mapInfoExpanded,
  onToggleMapInfo,
  onOpenCompetitor,
}) => {
  const active = useMemo(() => {
    if (!infoPanelCompetitorId) return null;
    const row = (competitors ?? []).find(
      (c) => String(c?._id) === String(infoPanelCompetitorId),
    );
    return row || null;
  }, [competitors, infoPanelCompetitorId]);

  const s = useMemo(() => (active ? getCompetitorMapSummary(active) : null), [
    active,
  ]);

  const activeBranch = useMemo(() => {
    if (!activeMarkerKey || !active) return null;
    const [competitorId, idxRaw] = String(activeMarkerKey).split(":");
    if (!competitorId || !idxRaw) return null;
    if (String(active?._id) !== String(competitorId)) return null;
    const idx = Number(idxRaw);
    if (!Number.isFinite(idx)) return null;
    const locs = Array.isArray(active?.branches?.locations)
      ? active.branches.locations
      : [];
    const dubaiLocs = locs.filter(
      (l) => String(l?.emirate || "").trim() === "Dubai",
    );
    return dubaiLocs[idx] || null;
  }, [activeMarkerKey, active]);

  const effectiveCoverage = useMemo(() => {
    const key = activeMarkerKey ? String(activeMarkerKey) : "";
    const polyOv = key ? polygonByMarkerKey?.[key] : undefined;
    const radOv = key ? radiusByMarkerKey?.[key] : undefined;

    const polygonOn =
      polyOv === "show" ? true : polyOv === "hide" ? false : !!showAllPolygon;
    const radiusOn =
      radOv === "show" ? true : radOv === "hide" ? false : !!showAllRadius;

    return { polygonOn, radiusOn };
  }, [
    activeMarkerKey,
    polygonByMarkerKey,
    radiusByMarkerKey,
    showAllPolygon,
    showAllRadius,
  ]);

  const menuItemsCount = useMemo(
    () => (active ? getCompetitorMenuItemsCount(active?.menu) : null),
    [active],
  );
  const menuCategoriesCount = useMemo(
    () => (active ? getCompetitorMenuCategoriesCount(active?.menu) : null),
    [active],
  );

  const priceLabel = useMemo(
    () => (active ? formatPriceRangeLabel(active?.priceRange, t) : "—"),
    [active, t],
  );

  return (
    <div className="competitorsMapViewInfo">
      <div className="competitorsMapViewInfo__bar">
        <div className="competitorsMapViewInfo__barMain">
          <span className="competitorsMapViewInfo__barTitle">
            {t
              ? t("mapView.infoTitle", { defaultValue: "Competitor info" })
              : "Competitor info"}
          </span>
          <span className="competitorsMapViewInfo__barValue">
            {s?.name || "—"}
          </span>
        </div>

        <div className="competitorsMapViewInfo__barActions">
          <button
            type="button"
            className="competitorsMapViewInfo__barBtn"
            onClick={onToggleMapInfo}
            aria-expanded={mapInfoExpanded}>
            {mapInfoExpanded ? "▴" : "▾"}
          </button>
          <button
            type="button"
            className="competitorsMapViewInfo__barBtn"
            onClick={onClearCompetitorInfo}
            disabled={!active}
            title={
              t
                ? t("mapView.clearInfo", { defaultValue: "Clear selection" })
                : "Clear selection"
            }>
            ×
          </button>
        </div>
      </div>

      <div
        className={`competitorsMapViewInfo__body ${
          mapInfoExpanded ? "" : "competitorsMapViewInfo__body--collapsed"
        }`}>
        {!active && (
          <p className="competitorsMapViewInfo__muted">
            {t
              ? t("mapView.noSelection", {
                  defaultValue:
                    "Select a competitor marker on the map to see details here.",
                })
              : "Select a competitor marker on the map to see details here."}
          </p>
        )}

        {active && (
          <>
            <div className="competitorsMapViewInfo__header">
              <div className="competitorsMapViewInfo__headerLeft">
                {s?.logo ? (
                  <img
                    className="competitorsMapViewInfo__logo"
                    src={s.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <div className="competitorsMapViewInfo__titleStack">
                  <h3 className="competitorsMapViewInfo__name">{s?.name}</h3>
                  <p className="competitorsMapViewInfo__addr">
                    {s?.addressLine || "—"}
                  </p>
                </div>
              </div>

              <div className="competitorsMapViewInfo__headerRight">
                <button
                  type="button"
                  className="competitorsMapViewInfo__openBtn"
                  data-session="view_competitor"
                  data-competitor-id={active?._id}
                  data-editing="false"
                  onClick={onOpenCompetitor}
                  disabled={!onOpenCompetitor}>
                  {t
                    ? t("mapView.openCompetitor", {
                        defaultValue: "Open competitor",
                      })
                    : "Open competitor"}
                </button>
              </div>
            </div>

            <div className="competitorsMapViewInfo__grid">
              <div className="competitorsMapViewInfo__card competitorsMapViewInfo__card--full">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardSelectedBranch", {
                        defaultValue: "Selected pin (branch)",
                      })
                    : "Selected pin (branch)"}
                </span>
                <span className="competitorsMapViewInfo__value">
                  {activeBranch
                    ? [activeBranch.emirate, activeBranch.city, activeBranch.address]
                        .filter(Boolean)
                        .join(" • ")
                    : t
                      ? t("mapView.noActivePin", {
                          defaultValue: "Click a pin to see branch-level details.",
                        })
                      : "Click a pin to see branch-level details."}
                </span>
                {activeBranch ? (
                  <div className="competitorsMapViewInfo__miniGrid">
                    <div className="competitorsMapViewInfo__miniRow">
                      <span className="competitorsMapViewInfo__miniLabel">
                        {t
                          ? t("mapView.cardCoords", {
                              defaultValue: "Coords",
                            })
                          : "Coords"}
                      </span>
                      <span className="competitorsMapViewInfo__miniValue">
                        {toNum(activeBranch?.coordinates?.lat) == null ||
                        toNum(activeBranch?.coordinates?.lng) == null
                          ? "—"
                          : `${toNum(activeBranch.coordinates.lat).toFixed(5)}, ${toNum(
                              activeBranch.coordinates.lng,
                            ).toFixed(5)}`}
                      </span>
                    </div>
                    <div className="competitorsMapViewInfo__miniRow">
                      <span className="competitorsMapViewInfo__miniLabel">
                        {t
                          ? t("mapView.cardCoveragePolygon", {
                              defaultValue: "Polygon",
                            })
                          : "Polygon"}
                      </span>
                      <span
                        className={`competitorsMapViewInfo__pill ${
                          effectiveCoverage.polygonOn
                            ? "competitorsMapViewInfo__pill--on"
                            : "competitorsMapViewInfo__pill--off"
                        }`}>
                        {effectiveCoverage.polygonOn ? "ON" : "OFF"}
                      </span>
                    </div>
                    <div className="competitorsMapViewInfo__miniRow">
                      <span className="competitorsMapViewInfo__miniLabel">
                        {t
                          ? t("mapView.cardCoverageRadius", {
                              defaultValue: "Radius",
                            })
                          : "Radius"}
                      </span>
                      <span
                        className={`competitorsMapViewInfo__pill ${
                          effectiveCoverage.radiusOn
                            ? "competitorsMapViewInfo__pill--on"
                            : "competitorsMapViewInfo__pill--off"
                        }`}>
                        {effectiveCoverage.radiusOn ? "ON" : "OFF"}
                      </span>
                    </div>
                    <div className="competitorsMapViewInfo__miniRow">
                      <span className="competitorsMapViewInfo__miniLabel">
                        {t
                          ? t("mapView.cardCoverageKm", {
                              defaultValue: "Radius km",
                            })
                          : "Radius km"}
                      </span>
                      <span className="competitorsMapViewInfo__miniValue">
                        {toNum(
                          activeBranch?.coverageAreas?.byDistance?.radius?.km,
                        ) == null
                          ? "—"
                          : `${toNum(
                              activeBranch.coverageAreas.byDistance.radius.km,
                            )} km`}
                      </span>
                    </div>
                  </div>
                ) : null}
              </div>

              <div className="competitorsMapViewInfo__card">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardBranches", {
                        defaultValue: "Branches",
                      })
                    : "Branches"}
                </span>
                <span className="competitorsMapViewInfo__value">
                  {s?.branchesTotalQnt == null ? "—" : s.branchesTotalQnt}
                </span>
              </div>

              <div className="competitorsMapViewInfo__card">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardPriceRange", {
                        defaultValue: "Price range",
                      })
                    : "Price range"}
                </span>
                <span className="competitorsMapViewInfo__value">{priceLabel}</span>
              </div>

              <div className="competitorsMapViewInfo__card">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardOwnDelivery", {
                        defaultValue: "Own delivery DXB",
                      })
                    : "Own delivery DXB"}
                </span>
                <span
                  className={`competitorsMapViewInfo__pill ${
                    s?.hasOwnDeliveryDubai
                      ? "competitorsMapViewInfo__pill--on"
                      : "competitorsMapViewInfo__pill--off"
                  }`}>
                  {s?.hasOwnDeliveryDubai
                    ? t
                      ? t("tableRow.ownDeliveryYes", {
                          defaultValue: "Own delivery in Dubai",
                        })
                      : "Own delivery in Dubai"
                    : t
                      ? t("tableRow.ownDeliveryNo", {
                          defaultValue: "No own delivery in Dubai",
                        })
                      : "No own delivery in Dubai"}
                </span>
              </div>

              <div className="competitorsMapViewInfo__card">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardMenuItems", { defaultValue: "Menu items" })
                    : "Menu items"}
                </span>
                <span className="competitorsMapViewInfo__value">
                  {menuItemsCount == null ? "—" : menuItemsCount}
                </span>
              </div>

              <div className="competitorsMapViewInfo__card">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardMenuCategories", {
                        defaultValue: "Menu categories",
                      })
                    : "Menu categories"}
                </span>
                <span className="competitorsMapViewInfo__value">
                  {menuCategoriesCount == null ? "—" : menuCategoriesCount}
                </span>
              </div>

              <div className="competitorsMapViewInfo__card competitorsMapViewInfo__card--full">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardCuisine", { defaultValue: "Cuisine" })
                    : "Cuisine"}
                </span>
                <span className="competitorsMapViewInfo__value">
                  {s?.cuisineTags?.length ? s.cuisineTags.join(", ") : "—"}
                </span>
              </div>

              <div className="competitorsMapViewInfo__card competitorsMapViewInfo__card--full">
                <span className="competitorsMapViewInfo__label">
                  {t ? t("mapView.cardMenu", { defaultValue: "Menu" }) : "Menu"}
                </span>
                <span className="competitorsMapViewInfo__value">
                  {s?.menuName || "—"}
                </span>
              </div>

              <div className="competitorsMapViewInfo__card competitorsMapViewInfo__card--full">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardNotes", { defaultValue: "Notes" })
                    : "Notes"}
                </span>
                <span className="competitorsMapViewInfo__value">
                  {active?.description || "—"}
                </span>
              </div>

              <div className="competitorsMapViewInfo__card competitorsMapViewInfo__card--full">
                <span className="competitorsMapViewInfo__label">
                  {t
                    ? t("mapView.cardLinks", { defaultValue: "Links" })
                    : "Links"}
                </span>
                <div className="competitorsMapViewInfo__links">
                  {active?.socials?.website ? (
                    <a
                      className="competitorsMapViewInfo__link"
                      href={active.socials.website}
                      target="_blank"
                      rel="noreferrer">
                      Website
                    </a>
                  ) : null}
                  {active?.socials?.instagram ? (
                    <a
                      className="competitorsMapViewInfo__link"
                      href={active.socials.instagram}
                      target="_blank"
                      rel="noreferrer">
                      Instagram
                    </a>
                  ) : null}
                  {active?.socials?.facebook ? (
                    <a
                      className="competitorsMapViewInfo__link"
                      href={active.socials.facebook}
                      target="_blank"
                      rel="noreferrer">
                      Facebook
                    </a>
                  ) : null}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Competitors_mapView_info;