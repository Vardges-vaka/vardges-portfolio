import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import {
  getBranches_mapSummaryRange,
  formatBranches_mapSummaryRange,
} from "../../02_branches_helpers/_branches_helpers.index.js";

import OurSupport_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/OurSupport_Icon.jsx";
import ManagerSupport_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/ManagerSupport_Icon.jsx";
import Hours24_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/Hours24_Icon.jsx";
import Employees_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/Employees_Icon.jsx";
import Equipments_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/Equipments_Icon.jsx";
import Brands_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/Brands_Icon.jsx";
import Images_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/Images_Icon.jsx";
import Notes_Icon from "../../../../../../../01_components/uiComponents/cloudKitchens_icons/Notes_Icon.jsx";

import Branches_mapView_info_contactPopover from "./Branches_mapView_info_contactPopover.jsx";
import Branches_mapView_info_operationsPopover from "./Branches_mapView_info_operationsPopover.jsx";

import "../../_styles/branches_mapView_info.css";

const refLabel = (x) => {
  if (x == null) return "";
  if (typeof x === "object") return x.name || String(x._id ?? "");
  return String(x);
};

const Branches_mapView_info = ({
  t,
  branches,
  mapSummaryPeriod,
  onSummaryPeriodChange,
  infoPanelBranchId,
  onClearBranchInfo,
  mapInfoExpanded,
  onToggleMapInfo,
}) => {
  const { i18n } = useTranslation("branches");
  const [contactPopover, setContactPopover] = useState(null);
  const [operationsAnchorEl, setOperationsAnchorEl] = useState(null);

  const openContactPopover = (role, title, anchorEl) => {
    setOperationsAnchorEl(null);
    setContactPopover((prev) => {
      if (prev?.role === role && prev.anchorEl === anchorEl) return null;
      return { role, title, anchorEl };
    });
  };

  const toggleOperationsPopover = (anchorEl) => {
    setContactPopover(null);
    setOperationsAnchorEl((prev) => (prev === anchorEl ? null : anchorEl));
  };

  const dailyRange = useMemo(() => getBranches_mapSummaryRange("daily"), []);
  const dailyRangeLabel = useMemo(
    () => formatBranches_mapSummaryRange(dailyRange.start, dailyRange.end, i18n.resolvedLanguage),
    [dailyRange.start, dailyRange.end, i18n.resolvedLanguage],
  );

  const range = useMemo(
    () => getBranches_mapSummaryRange(mapSummaryPeriod),
    [mapSummaryPeriod],
  );

  const rangeLabel = useMemo(
    () => formatBranches_mapSummaryRange(range.start, range.end, i18n.resolvedLanguage),
    [range.start, range.end, i18n.resolvedLanguage],
  );

  const branch = useMemo(() => {
    if (!infoPanelBranchId) return null;
    return (branches ?? []).find((b) => String(b._id) === String(infoPanelBranchId)) ?? null;
  }, [branches, infoPanelBranchId]);

  const ops = branch?.operations;
  const support = branch?.contact?.ourSupport;
  const manager = branch?.contact?.manager;

  const ourSupportIconSrc = OurSupport_Icon();
  const managerSupportIconSrc = ManagerSupport_Icon();
  const hours24IconSrc = Hours24_Icon();
  const hours24IconCrossedSrc = Hours24_Icon({ crossedOut: true });
  const employeesIconSrc = Employees_Icon();
  const equipmentsIconSrc = Equipments_Icon();
  const brandsIconSrc = Brands_Icon();
  const imagesIconSrc = Images_Icon();
  const notesIconSrc = Notes_Icon();

  const managerContactTitle = manager?.name
    ? `${t("fields.manager")} — ${manager.name}`
    : t("fields.manager");

  const branchIs24h = !!ops?.is24Hours;

  useEffect(() => {
    setContactPopover(null);
    setOperationsAnchorEl(null);
  }, [infoPanelBranchId]);

  const summaryCollapsed = !branch;
  const ariaLabel = summaryCollapsed ? t("mapView.infoSummaryTitle") : t("mapView.infoBranchTitle");

  return (
    <section className="branchesMapViewInfo" aria-label={ariaLabel}>
      <div className="branchesMapViewInfo__collapseBar">
        <div className="branchesMapViewInfo__collapseBarStart">
          <div className="branchesMapViewInfo__collapseBarMain">
            {summaryCollapsed ? (
              <>
                <span className="branchesMapViewInfo__collapseTitle">
                  {t("mapView.infoCollapsedDailySales")}
                </span>
                <span className="branchesMapViewInfo__collapseValue">{t("empty.noValue")}</span>
                <span className="branchesMapViewInfo__collapseMeta">
                  {t("mapView.infoCollapsedOrdersShort")}: {t("empty.noValue")}
                </span>
                <span className="branchesMapViewInfo__collapseDate" title={dailyRangeLabel}>
                  {dailyRangeLabel}
                </span>
              </>
            ) : (
              <>
                <span className="branchesMapViewInfo__collapseTitle">{branch.name}</span>
                <span className="branchesMapViewInfo__collapseMeta">
                  {t("mapView.infoBranchCollapsedHint")}
                </span>
              </>
            )}
          </div>
        </div>
        <div className="branchesMapViewInfo__collapseBarCenter">
          {!summaryCollapsed ? (
            <span
              className="branchesMapViewInfo__collapseAddress"
              title={
                branch.location?.address?.trim()
                  ? branch.location.address.trim()
                  : t("empty.noValue")
              }
              aria-label={`${t("mapView.infoAddress")}: ${
                branch.location?.address?.trim() || t("empty.noValue")
              }`}>
              {branch.location?.address?.trim() || t("empty.noValue")}
            </span>
          ) : null}
        </div>
        <div className="branchesMapViewInfo__collapseBarEnd">
          {!summaryCollapsed ? (
            <button
              type="button"
              className={
                "branchesMapViewInfo__contactTrigger branchesMapViewInfo__contactTrigger--icon branchesMapViewInfo__contactTrigger--collapseBar" +
                (branchIs24h ? "" : " branchesMapViewInfo__operationsTrigger--not24h")
              }
              onClick={(e) => toggleOperationsPopover(e.currentTarget)}
              aria-label={`${t("mapView.opsPopoverTitle")}. ${t("fields.is24Hours")}: ${
                branchIs24h ? t("badges.yes") : t("badges.no")
              }`}
              aria-expanded={Boolean(operationsAnchorEl)}
              title={`${t("mapView.opsPopoverTitle")} — ${t("fields.is24Hours")}: ${
                branchIs24h ? t("badges.yes") : t("badges.no")
              }`}>
              <img
                src={branchIs24h ? hours24IconSrc : hours24IconCrossedSrc}
                alt=""
                className="branchesMapViewInfo__contactTriggerImg"
                width={22}
                height={22}
                decoding="async"
                draggable={false}
              />
            </button>
          ) : null}
          {!summaryCollapsed ? (
            <div
              className="branchesMapViewInfo__collapseBarContact"
              onClick={(e) => e.stopPropagation()}
              role="group"
              aria-label={t("sections.contact")}>
              <button
                type="button"
                className="branchesMapViewInfo__contactTrigger branchesMapViewInfo__contactTrigger--icon branchesMapViewInfo__contactTrigger--collapseBar"
                onClick={(e) =>
                  openContactPopover("support", t("fields.ourSupport"), e.currentTarget)
                }
                aria-label={t("fields.ourSupport")}
                title={t("fields.ourSupport")}>
                <img
                  src={ourSupportIconSrc}
                  alt=""
                  className="branchesMapViewInfo__contactTriggerImg"
                  width={22}
                  height={22}
                  decoding="async"
                  draggable={false}
                />
              </button>
              <button
                type="button"
                className="branchesMapViewInfo__contactTrigger branchesMapViewInfo__contactTrigger--icon branchesMapViewInfo__contactTrigger--collapseBar"
                onClick={(e) =>
                  openContactPopover("manager", managerContactTitle, e.currentTarget)
                }
                aria-label={managerContactTitle}
                title={managerContactTitle}>
                <img
                  src={managerSupportIconSrc}
                  alt=""
                  className="branchesMapViewInfo__contactTriggerImg"
                  width={22}
                  height={22}
                  decoding="async"
                  draggable={false}
                />
              </button>
            </div>
          ) : null}
          <button
            type="button"
            className="branchesMapViewInfo__collapseToggle"
            onClick={onToggleMapInfo}
            aria-expanded={mapInfoExpanded}
            aria-controls="branches-map-view-info-body"
            title={
              mapInfoExpanded ? t("mapView.infoToggleCollapse") : t("mapView.infoToggleExpand")
            }>
            <span className="branchesMapViewInfo__collapseToggleIcon" aria-hidden>
              {mapInfoExpanded ? "▾" : "▸"}
            </span>
          </button>
        </div>
      </div>

      <div
        id="branches-map-view-info-body"
        className={
          "branchesMapViewInfo__expandBody" +
          (mapInfoExpanded ? "" : " branchesMapViewInfo__expandBody--collapsed")
        }
        hidden={!mapInfoExpanded}>
        {summaryCollapsed ? (
          <>
            <header className="branchesMapViewInfo__header branchesMapViewInfo__header--inPanel">
              <h3 className="branchesMapViewInfo__title">{t("mapView.infoSummaryTitle")}</h3>
            </header>

            <div
              className="branchesMapViewInfo__periodRow"
              role="group"
              aria-label={t("mapView.infoPeriodLabel")}>
              {(["daily", "weekly", "monthly"]).map((p) => (
                <button
                  key={p}
                  type="button"
                  className={
                    "branchesMapViewInfo__periodBtn" +
                    (mapSummaryPeriod === p ? " branchesMapViewInfo__periodBtn--active" : "")
                  }
                  onClick={() => onSummaryPeriodChange(p)}
                  aria-pressed={mapSummaryPeriod === p}>
                  {t(`mapView.infoPeriod_${p}`)}
                </button>
              ))}
            </div>

            <p className="branchesMapViewInfo__range">
              <span className="branchesMapViewInfo__rangeLabel">{t("mapView.infoRangeLabel")}:</span>{" "}
              {rangeLabel}
            </p>

            <p className="branchesMapViewInfo__hint">{t("mapView.infoDataPending")}</p>

            <div className="branchesMapViewInfo__kpis">
              <div className="branchesMapViewInfo__kpi">
                <span className="branchesMapViewInfo__kpiLabel">{t("mapView.infoSalesTotal")}</span>
                <span className="branchesMapViewInfo__kpiValue">{t("empty.noValue")}</span>
              </div>
              <div className="branchesMapViewInfo__kpi">
                <span className="branchesMapViewInfo__kpiLabel">{t("mapView.infoOrdersCount")}</span>
                <span className="branchesMapViewInfo__kpiValue">{t("empty.noValue")}</span>
              </div>
            </div>
          </>
        ) : (
          <>
            <header className="branchesMapViewInfo__header branchesMapViewInfo__header--inPanel">
              <h3 className="branchesMapViewInfo__title">{branch.name}</h3>
              <button type="button" className="branchesMapViewInfo__backBtn" onClick={onClearBranchInfo}>
                {t("mapView.infoBackToSummary")}
              </button>
            </header>

            <div className="branchesMapViewInfo__detailsStack">
              <details className="branchesMapViewInfo__details branchesMapViewInfo__details--accordion">
                <summary className="branchesMapViewInfo__detailsSummary">
                  <img
                    src={employeesIconSrc}
                    alt=""
                    className="branchesMapViewInfo__detailsSummaryIcon"
                    width={20}
                    height={20}
                    decoding="async"
                    draggable={false}
                  />
                  <span className="branchesMapViewInfo__detailsSummaryLabel">{t("sections.employees")}</span>
                  <span className="branchesMapViewInfo__detailsSummaryCount">{branch.employees?.length ?? 0}</span>
                </summary>
                <ul className="branchesMapViewInfo__idList branchesMapViewInfo__idList--inDetails">
                  {(branch.employees ?? []).map((x, i) => (
                    <li key={i}>{refLabel(x)}</li>
                  ))}
                </ul>
              </details>

              <details className="branchesMapViewInfo__details branchesMapViewInfo__details--accordion">
                <summary className="branchesMapViewInfo__detailsSummary">
                  <img
                    src={equipmentsIconSrc}
                    alt=""
                    className="branchesMapViewInfo__detailsSummaryIcon"
                    width={20}
                    height={20}
                    decoding="async"
                    draggable={false}
                  />
                  <span className="branchesMapViewInfo__detailsSummaryLabel">{t("sections.equipments")}</span>
                  <span className="branchesMapViewInfo__detailsSummaryCount">{branch.equipments?.length ?? 0}</span>
                </summary>
                <ul className="branchesMapViewInfo__idList branchesMapViewInfo__idList--inDetails">
                  {(branch.equipments ?? []).map((x, i) => (
                    <li key={i}>{refLabel(x)}</li>
                  ))}
                </ul>
              </details>

              <details className="branchesMapViewInfo__details branchesMapViewInfo__details--accordion">
                <summary className="branchesMapViewInfo__detailsSummary">
                  <img
                    src={brandsIconSrc}
                    alt=""
                    className="branchesMapViewInfo__detailsSummaryIcon"
                    width={20}
                    height={20}
                    decoding="async"
                    draggable={false}
                  />
                  <span className="branchesMapViewInfo__detailsSummaryLabel">{t("sections.brands")}</span>
                  <span className="branchesMapViewInfo__detailsSummaryCount">{branch.brands?.length ?? 0}</span>
                </summary>
                <ul className="branchesMapViewInfo__idList branchesMapViewInfo__idList--inDetails">
                  {(branch.brands ?? []).map((x, i) => (
                    <li key={i}>{refLabel(x)}</li>
                  ))}
                </ul>
              </details>

              <details className="branchesMapViewInfo__details branchesMapViewInfo__details--accordion">
                <summary className="branchesMapViewInfo__detailsSummary">
                  <img
                    src={imagesIconSrc}
                    alt=""
                    className="branchesMapViewInfo__detailsSummaryIcon"
                    width={20}
                    height={20}
                    decoding="async"
                    draggable={false}
                  />
                  <span className="branchesMapViewInfo__detailsSummaryLabel">{t("mapView.infoImagesTitle")}</span>
                  <span className="branchesMapViewInfo__detailsSummaryCount">{branch.images?.length ?? 0}</span>
                </summary>
                <ul className="branchesMapViewInfo__imgList branchesMapViewInfo__imgList--inDetails">
                  {(branch.images ?? []).map((url, i) => (
                    <li key={i}>
                      <a href={url} target="_blank" rel="noreferrer" className="branchesMapViewInfo__imgLink">
                        {t("mapView.infoImageLink", { n: i + 1 })}
                      </a>
                    </li>
                  ))}
                </ul>
              </details>

              <details className="branchesMapViewInfo__details branchesMapViewInfo__details--accordion">
                <summary className="branchesMapViewInfo__detailsSummary">
                  <img
                    src={notesIconSrc}
                    alt=""
                    className="branchesMapViewInfo__detailsSummaryIcon"
                    width={20}
                    height={20}
                    decoding="async"
                    draggable={false}
                  />
                  <span className="branchesMapViewInfo__detailsSummaryLabel">{t("sections.notes")}</span>
                </summary>
                <p className="branchesMapViewInfo__notes branchesMapViewInfo__notes--inDetails">
                  {branch.notes?.trim() || t("empty.noValue")}
                </p>
              </details>
            </div>
          </>
        )}
      </div>

      {contactPopover ? (
        <Branches_mapView_info_contactPopover
          t={t}
          title={contactPopover.title}
          contact={contactPopover.role === "support" ? support : manager}
          anchorEl={contactPopover.anchorEl}
          onClose={() => setContactPopover(null)}
        />
      ) : null}
      {operationsAnchorEl ? (
        <Branches_mapView_info_operationsPopover
          t={t}
          ops={ops}
          anchorEl={operationsAnchorEl}
          onClose={() => setOperationsAnchorEl(null)}
        />
      ) : null}
    </section>
  );
};

export default Branches_mapView_info;
