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
    <div className="Competitors_mapView_info">
      <div className="Competitors_mapView_info_bar">
        <div className="Competitors_mapView_info_barMain">
          <span className="Competitors_mapView_info_barTitle">
            {t
              ? t("mapView.infoTitle", { defaultValue: "Competitor info" })
              : "Competitor info"}
          </span>
          <span className="Competitors_mapView_info_barValue">
            {s?.name || "—"}
          </span>
        </div>

        <div className="Competitors_mapView_info_barActions">
          <button
            type="button"
            className="Competitors_mapView_info_barBtn"
            onClick={onToggleMapInfo}
            aria-expanded={mapInfoExpanded}>
            {mapInfoExpanded ? "▴" : "▾"}
          </button>
          <button
            type="button"
            className="Competitors_mapView_info_barBtn"
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
        className={`Competitors_mapView_info_body ${
          mapInfoExpanded ? "" : "Competitors_mapView_info_bodyCollapsed"
        }`}>
        {!active && (
          <p className="Competitors_mapView_info_muted">
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
            <div className="Competitors_mapView_info_header">
              <div className="Competitors_mapView_info_headerLeft">
                {s?.logo ? (
                  <img
                    className="Competitors_mapView_info_logo"
                    src={s.logo}
                    alt=""
                    loading="lazy"
                    decoding="async"
                  />
                ) : null}
                <div className="Competitors_mapView_info_titleStack">
                  <h3 className="Competitors_mapView_info_name">{s?.name}</h3>
                  <p className="Competitors_mapView_info_addr">
                    {s?.addressLine || "—"}
                  </p>
                </div>
              </div>

              <div className="Competitors_mapView_info_headerRight">
                <button
                  type="button"
                  className="Competitors_mapView_info_openBtn"
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

            <div className="Competitors_mapView_info_grid">
              <div className="Competitors_mapView_info_card Competitors_mapView_info_cardFull">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardSelectedBranch", {
                        defaultValue: "Selected pin (branch)",
                      })
                    : "Selected pin (branch)"}
                </span>
                <span className="Competitors_mapView_info_value">
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
                  <div className="Competitors_mapView_info_miniGrid">
                    <div className="Competitors_mapView_info_miniRow">
                      <span className="Competitors_mapView_info_miniLabel">
                        {t
                          ? t("mapView.cardCoords", {
                              defaultValue: "Coords",
                            })
                          : "Coords"}
                      </span>
                      <span className="Competitors_mapView_info_miniValue">
                        {toNum(activeBranch?.coordinates?.lat) == null ||
                        toNum(activeBranch?.coordinates?.lng) == null
                          ? "—"
                          : `${toNum(activeBranch.coordinates.lat).toFixed(5)}, ${toNum(
                              activeBranch.coordinates.lng,
                            ).toFixed(5)}`}
                      </span>
                    </div>
                    <div className="Competitors_mapView_info_miniRow">
                      <span className="Competitors_mapView_info_miniLabel">
                        {t
                          ? t("mapView.cardCoveragePolygon", {
                              defaultValue: "Polygon",
                            })
                          : "Polygon"}
                      </span>
                      <span
                        className={`Competitors_mapView_info_pill ${
                          effectiveCoverage.polygonOn
                            ? "Competitors_mapView_info_pillOn"
                            : "Competitors_mapView_info_pillOff"
                        }`}>
                        {effectiveCoverage.polygonOn ? "ON" : "OFF"}
                      </span>
                    </div>
                    <div className="Competitors_mapView_info_miniRow">
                      <span className="Competitors_mapView_info_miniLabel">
                        {t
                          ? t("mapView.cardCoverageRadius", {
                              defaultValue: "Radius",
                            })
                          : "Radius"}
                      </span>
                      <span
                        className={`Competitors_mapView_info_pill ${
                          effectiveCoverage.radiusOn
                            ? "Competitors_mapView_info_pillOn"
                            : "Competitors_mapView_info_pillOff"
                        }`}>
                        {effectiveCoverage.radiusOn ? "ON" : "OFF"}
                      </span>
                    </div>
                    <div className="Competitors_mapView_info_miniRow">
                      <span className="Competitors_mapView_info_miniLabel">
                        {t
                          ? t("mapView.cardCoverageKm", {
                              defaultValue: "Radius km",
                            })
                          : "Radius km"}
                      </span>
                      <span className="Competitors_mapView_info_miniValue">
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

              <div className="Competitors_mapView_info_card">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardBranches", {
                        defaultValue: "Branches",
                      })
                    : "Branches"}
                </span>
                <span className="Competitors_mapView_info_value">
                  {s?.branchesTotalQnt == null ? "—" : s.branchesTotalQnt}
                </span>
              </div>

              <div className="Competitors_mapView_info_card">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardPriceRange", {
                        defaultValue: "Price range",
                      })
                    : "Price range"}
                </span>
                <span className="Competitors_mapView_info_value">{priceLabel}</span>
              </div>

              <div className="Competitors_mapView_info_card">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardOwnDelivery", {
                        defaultValue: "Own delivery DXB",
                      })
                    : "Own delivery DXB"}
                </span>
                <span
                  className={`Competitors_mapView_info_pill ${
                    s?.hasOwnDeliveryDubai
                      ? "Competitors_mapView_info_pillOn"
                      : "Competitors_mapView_info_pillOff"
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

              <div className="Competitors_mapView_info_card">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardMenuItems", { defaultValue: "Menu items" })
                    : "Menu items"}
                </span>
                <span className="Competitors_mapView_info_value">
                  {menuItemsCount == null ? "—" : menuItemsCount}
                </span>
              </div>

              <div className="Competitors_mapView_info_card">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardMenuCategories", {
                        defaultValue: "Menu categories",
                      })
                    : "Menu categories"}
                </span>
                <span className="Competitors_mapView_info_value">
                  {menuCategoriesCount == null ? "—" : menuCategoriesCount}
                </span>
              </div>

              <div className="Competitors_mapView_info_card Competitors_mapView_info_cardFull">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardCuisine", { defaultValue: "Cuisine" })
                    : "Cuisine"}
                </span>
                <span className="Competitors_mapView_info_value">
                  {s?.cuisineTags?.length ? s.cuisineTags.join(", ") : "—"}
                </span>
              </div>

              <div className="Competitors_mapView_info_card Competitors_mapView_info_cardFull">
                <span className="Competitors_mapView_info_label">
                  {t ? t("mapView.cardMenu", { defaultValue: "Menu" }) : "Menu"}
                </span>
                <span className="Competitors_mapView_info_value">
                  {s?.menuName || "—"}
                </span>
              </div>

              <div className="Competitors_mapView_info_card Competitors_mapView_info_cardFull">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardNotes", { defaultValue: "Notes" })
                    : "Notes"}
                </span>
                <span className="Competitors_mapView_info_value">
                  {active?.description || "—"}
                </span>
              </div>

              <div className="Competitors_mapView_info_card Competitors_mapView_info_cardFull">
                <span className="Competitors_mapView_info_label">
                  {t
                    ? t("mapView.cardLinks", { defaultValue: "Links" })
                    : "Links"}
                </span>
                <div className="Competitors_mapView_info_links">
                  {active?.socials?.website ? (
                    <a
                      className="Competitors_mapView_info_link"
                      href={active.socials.website}
                      target="_blank"
                      rel="noreferrer">
                      {t ? t("mapView.linkWebsite", { defaultValue: "Website" }) : "Website"}
                    </a>
                  ) : null}
                  {active?.socials?.instagram ? (
                    <a
                      className="Competitors_mapView_info_link"
                      href={active.socials.instagram}
                      target="_blank"
                      rel="noreferrer">
                      {t ? t("mapView.linkInstagram", { defaultValue: "Instagram" }) : "Instagram"}
                    </a>
                  ) : null}
                  {active?.socials?.facebook ? (
                    <a
                      className="Competitors_mapView_info_link"
                      href={active.socials.facebook}
                      target="_blank"
                      rel="noreferrer">
                      {t ? t("mapView.linkFacebook", { defaultValue: "Facebook" }) : "Facebook"}
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