import { useState, useEffect, useCallback } from "react";
import {
  toNum,
  branchCoverageSummary,
  cloneLocation,
} from "../../../../02_competitors_helpers/_competitors_helpers.index.js";

const PLATFORM_OPTIONS = [
  "Talabat",
  "Careem Now",
  "Noon Food",
  "Deliveroo",
  "Keeta",
  "InstaShop",
];

const PROMO_TYPES = [
  "fixed",
  "percentage",
  "freeDelivery",
  "bogo",
  "other",
];

const cloneFormFromBranch = (branch) => {
  const base = cloneLocation(branch);
  if (!base) return null;
  return {
    ...base,
    platforms: Array.isArray(base.platforms)
      ? base.platforms.map((p) => ({ ...p }))
      : [],
    promos: Array.isArray(base.promos) ? base.promos.map((p) => ({ ...p })) : [],
  };
};

const Competitors_tableView_branches_info_detailsStep = ({
  activeBranch,
  activeMarkerKey,
  text,
  handlers,
}) => {
  const [form, setForm] = useState(() => cloneFormFromBranch(activeBranch));

  // Re-init only when editing a different pin — not on every parent draft tick.
  useEffect(() => {
    setForm(cloneFormFromBranch(activeBranch));
  }, [activeMarkerKey]);

  const applyBranchFormDraft = handlers?.applyBranchFormDraft;
  const saveEditBranch = handlers?.saveEditBranch;
  const backToMapStep = handlers?.backToMapStep;
  const cancelEditBranch = handlers?.cancelEditBranch;

  const flushFormToDraft = useCallback(() => {
    if (!activeMarkerKey || !form) return;
    applyBranchFormDraft?.(activeMarkerKey, form);
  }, [activeMarkerKey, form, applyBranchFormDraft]);

  const onFieldChange = useCallback(
    (field) => (e) => {
      let value = e.target.value;
      if (field === "hasDineIn" || field === "hasOwnDelivery") {
        value = e.target.value === "true";
      }
      setForm((prev) => (prev ? { ...prev, [field]: value } : prev));
    },
    [],
  );

  if (!form) return null;

  const dineInVal = form.hasDineIn;
  const coverage = branchCoverageSummary(form);
  const platforms = Array.isArray(form.platforms) ? form.platforms : [];
  const promos = Array.isArray(form.promos) ? form.promos : [];

  const setPlatforms = (next) =>
    setForm((prev) => (prev ? { ...prev, platforms: next } : prev));
  const setPromos = (next) =>
    setForm((prev) => (prev ? { ...prev, promos: next } : prev));

  const addPlatform = () =>
    setPlatforms([
      ...platforms,
      { name: "Talabat", isActive: true, storeUrl: "", deliveryFee: null },
    ]);

  const addPromo = () =>
    setPromos([
      ...promos,
      {
        name: "",
        platform: "Talabat",
        discountType: "percentage",
        isActive: true,
      },
    ]);

  const handleBack = () => {
    flushFormToDraft();
    backToMapStep?.();
  };

  const handleSave = () => {
    flushFormToDraft();
    saveEditBranch?.();
  };

  return (
    <div className="Competitors_tableView_branches_info_edit">
      <p className="Competitors_tableView_branches_info_stepBanner">
        {text.detailsStepBanner}
      </p>

      <fieldset
        className="Competitors_tableView_branches_info_lockedFieldset"
        disabled
        aria-label={text.coverageLockedLabel}>
        <legend>{text.coverageLockedLabel}</legend>
        <p className="Competitors_tableView_branches_info_lockedSummary">
          {text.coverageLockedHint}
        </p>
        <div className="Competitors_mapView_info_miniGrid">
          <div className="Competitors_mapView_info_miniRow">
            <span className="Competitors_mapView_info_miniLabel">
              {text.coordsLabel}
            </span>
            <span className="Competitors_mapView_info_miniValue">
              {toNum(form.coordinates?.lat) == null
                ? "—"
                : `${toNum(form.coordinates.lat).toFixed(5)}, ${toNum(
                    form.coordinates.lng,
                  ).toFixed(5)}`}
            </span>
          </div>
          <div className="Competitors_mapView_info_miniRow">
            <span className="Competitors_mapView_info_miniLabel">
              {text.radiusKmLabel}
            </span>
            <span className="Competitors_mapView_info_miniValue">
              {coverage.km == null ? "—" : `${coverage.km} km`}
            </span>
          </div>
          <div className="Competitors_mapView_info_miniRow">
            <span className="Competitors_mapView_info_miniLabel">
              {text.polygonVerticesLabel}
            </span>
            <span className="Competitors_mapView_info_miniValue">
              {coverage.polygonPoints < 3 ? "—" : coverage.polygonPoints}
            </span>
          </div>
        </div>
      </fieldset>

      <div className="Competitors_tableView_branches_info_form">
        <label className="Competitors_tableView_branches_info_field">
          <span>{text.countryLabel}</span>
          <input
            type="text"
            value={form.country ?? ""}
            onChange={onFieldChange("country")}
          />
        </label>
        <label className="Competitors_tableView_branches_info_field">
          <span>{text.stateLabel}</span>
          <input
            type="text"
            value={form.state ?? ""}
            onChange={onFieldChange("state")}
          />
        </label>
        <label className="Competitors_tableView_branches_info_field">
          <span>{text.emirateLabel}</span>
          <input
            type="text"
            value={form.emirate ?? ""}
            onChange={onFieldChange("emirate")}
          />
        </label>
        <label className="Competitors_tableView_branches_info_field">
          <span>{text.cityLabel}</span>
          <input
            type="text"
            value={form.city ?? ""}
            onChange={onFieldChange("city")}
          />
        </label>
        <label className="Competitors_tableView_branches_info_field Competitors_tableView_branches_info_fieldFull">
          <span>{text.addressLabel}</span>
          <input
            type="text"
            value={form.address ?? ""}
            onChange={onFieldChange("address")}
          />
        </label>
        <label className="Competitors_tableView_branches_info_field">
          <span>{text.dineInLabel}</span>
          <select
            value={
              dineInVal === true ? "true" : dineInVal === false ? "false" : ""
            }
            onChange={onFieldChange("hasDineIn")}>
            <option value="">—</option>
            <option value="true">{text.dineInYes}</option>
            <option value="false">{text.dineInNo}</option>
          </select>
        </label>
        <label className="Competitors_tableView_branches_info_field">
          <span>{text.hasOwnDeliveryLabel}</span>
          <select
            value={
              form.hasOwnDelivery === true
                ? "true"
                : form.hasOwnDelivery === false
                  ? "false"
                  : ""
            }
            onChange={onFieldChange("hasOwnDelivery")}>
            <option value="">—</option>
            <option value="true">{text.hasOwnDeliveryYes}</option>
            <option value="false">{text.hasOwnDeliveryNo}</option>
          </select>
        </label>
      </div>

      <section className="Competitors_tableView_branches_info_listSection">
        <div className="Competitors_tableView_branches_info_listHead">
          <h4>{text.platformsSectionTitle}</h4>
          <button type="button" onClick={addPlatform}>
            {text.addPlatformBtn}
          </button>
        </div>
        {platforms.length === 0 ? (
          <p className="Competitors_mapView_info_muted">{text.platformsEmpty}</p>
        ) : (
          platforms.map((row, i) => (
            <div
              key={`platform-${i}`}
              className="Competitors_tableView_branches_info_listRow">
              <select
                value={row.name ?? ""}
                onChange={(e) => {
                  const next = [...platforms];
                  next[i] = { ...row, name: e.target.value };
                  setPlatforms(next);
                }}>
                {PLATFORM_OPTIONS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <label className="Competitors_tableView_branches_info_check">
                <input
                  type="checkbox"
                  checked={!!row.isActive}
                  onChange={(e) => {
                    const next = [...platforms];
                    next[i] = { ...row, isActive: e.target.checked };
                    setPlatforms(next);
                  }}
                />
                {text.platformActiveLabel}
              </label>
              <input
                type="number"
                placeholder={text.deliveryFeeLabel}
                value={row.deliveryFee ?? ""}
                onChange={(e) => {
                  const next = [...platforms];
                  next[i] = {
                    ...row,
                    deliveryFee:
                      e.target.value === "" ? null : Number(e.target.value),
                  };
                  setPlatforms(next);
                }}
              />
              <button
                type="button"
                className="Competitors_tableView_branches_info_removeRow"
                onClick={() => setPlatforms(platforms.filter((_, j) => j !== i))}>
                ×
              </button>
            </div>
          ))
        )}
      </section>

      <section className="Competitors_tableView_branches_info_listSection">
        <div className="Competitors_tableView_branches_info_listHead">
          <h4>{text.promosSectionTitle}</h4>
          <button type="button" onClick={addPromo}>
            {text.addPromoBtn}
          </button>
        </div>
        {promos.length === 0 ? (
          <p className="Competitors_mapView_info_muted">{text.promosEmpty}</p>
        ) : (
          promos.map((row, i) => (
            <div
              key={`promo-${i}`}
              className="Competitors_tableView_branches_info_listRow">
              <input
                type="text"
                placeholder={text.promoNameLabel}
                value={row.name ?? ""}
                onChange={(e) => {
                  const next = [...promos];
                  next[i] = { ...row, name: e.target.value };
                  setPromos(next);
                }}
              />
              <select
                value={row.platform ?? "Talabat"}
                onChange={(e) => {
                  const next = [...promos];
                  next[i] = { ...row, platform: e.target.value };
                  setPromos(next);
                }}>
                {PLATFORM_OPTIONS.map((name) => (
                  <option key={name} value={name}>
                    {name}
                  </option>
                ))}
              </select>
              <select
                value={row.discountType ?? "percentage"}
                onChange={(e) => {
                  const next = [...promos];
                  next[i] = { ...row, discountType: e.target.value };
                  setPromos(next);
                }}>
                {PROMO_TYPES.map((dt) => (
                  <option key={dt} value={dt}>
                    {dt}
                  </option>
                ))}
              </select>
              <button
                type="button"
                className="Competitors_tableView_branches_info_removeRow"
                onClick={() => setPromos(promos.filter((_, j) => j !== i))}>
                ×
              </button>
            </div>
          ))
        )}
      </section>

      <div className="Competitors_tableView_branches_info_editActions">
        <button
          type="button"
          className="Competitors_tableView_branches_info_cancelBtn"
          onClick={handleBack}>
          {text.backToMapLabel}
        </button>
        <button
          type="button"
          className="Competitors_tableView_branches_info_saveBtn"
          onClick={handleSave}>
          {text.saveBranchLabel}
        </button>
        <button
          type="button"
          className="Competitors_tableView_branches_info_cancelBtn"
          onClick={() => cancelEditBranch?.()}>
          {text.cancelEditLabel}
        </button>
      </div>
    </div>
  );
};

export default Competitors_tableView_branches_info_detailsStep;
