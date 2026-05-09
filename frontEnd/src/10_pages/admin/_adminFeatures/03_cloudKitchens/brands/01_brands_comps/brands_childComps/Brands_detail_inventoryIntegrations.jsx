import { useState } from "react";
import { ManagerIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import Brands_detail_integration_row from "./Brands_detail_integration_row.jsx";
import {
  EMPTY_INVENTORY_INTEGRATION_ROW,
  hydrateBrandForm,
} from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_basic.css";
import "../../_styles/brands_detail_integration.css";

const Brands_detail_inventoryIntegrations = (props) => {
  const {
    brand,
    draft,
    fieldErrors,
    branchesList,
    employeesList,
    onDraftReplace,
    t,
  } = props;
  const rows = Array.isArray(draft)
    ? draft
    : hydrateBrandForm(brand).inventoryIntegrations;

  const [editModes, setEditModes] = useState({});

  const handleToggleEdit = (index) => {
    setEditModes((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const handleRemove = (index) => {
    onDraftReplace(rows.filter((_, i) => i !== index));
    setEditModes((prev) => {
      const next = { ...prev };
      delete next[index];
      return next;
    });
  };

  const handleDraftChange = (index, path, value) => {
    const next = rows.slice();
    const row = { ...(next[index] ?? {}) };
    const parts = String(path).split(".");
    let cursor = row;
    for (let i = 0; i < parts.length - 1; i += 1) {
      cursor[parts[i]] = { ...(cursor[parts[i]] ?? {}) };
      cursor = cursor[parts[i]];
    }
    cursor[parts[parts.length - 1]] = value;
    next[index] = row;
    onDraftReplace(next);
  };

  const handleAddIntegration = () => {
    onDraftReplace([
      ...rows,
      JSON.parse(JSON.stringify(EMPTY_INVENTORY_INTEGRATION_ROW)),
    ]);
  };

  const rowErrors = (index) => {
    const out = {};
    const prefix = `[${index}].`;
    for (const [path, code] of Object.entries(fieldErrors ?? {})) {
      if (path.startsWith(prefix)) out[path.slice(prefix.length)] = code;
    }
    return out;
  };

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailInventoryIntegrations"
      title={t("sections.inventoryIntegrations")}
      icon={<ManagerIcon />}
      renderReadonly={() => (
        <div className="brandsDetailBasic_readonly">
          {rows.length === 0 ? (
            <p>{t("empty.noIntegrations")}</p>
          ) : (
            rows.map((row, index) => (
              <p key={`${row.provider}-${index}`}>
                <strong>{row.provider || t("empty.noProvider")}</strong>{" "}
                {row.isActive !== false
                  ? t("badges.active")
                  : t("badges.inactive")}
              </p>
            ))
          )}
        </div>
      )}
      renderEditable={() => (
        <div className="brandsDetailIntegration_container">
          {rows.length === 0 ? (
            <p className="brandsDetailIntegration_empty">
              {t("empty.noIntegrations")}
            </p>
          ) : (
            rows.map((integration, index) => (
              <Brands_detail_integration_row
                key={index}
                integration={integration}
                index={index}
                isEditMode={editModes[index]}
                onToggleEdit={() => handleToggleEdit(index)}
                onRemove={() => handleRemove(index)}
                onDraftChange={handleDraftChange}
                fieldErrors={rowErrors(index)}
                branchesList={branchesList}
                employeesList={employeesList}
                t={t}
              />
            ))
          )}
          <button
            type="button"
            className="brandsDetailIntegration_addBtn"
            onClick={handleAddIntegration}>
            {t("actions.addIntegration")}
          </button>
        </div>
      )}
    />
  );
};

export default Brands_detail_inventoryIntegrations;
