import Branches_detail_sectionShell from "../../Branches_detail_sectionShell.jsx";
import {
  MoneyIcon,
  CalendarIcon,
} from "../../Branches_icons/_branches_icons.index.js";
import "../../../../_styles/branches_detail_section.css";
import "../../../../_styles/branches_detail_costs.css";

const fmtDate = (value) => {
  if (!value) return null;
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return null;
  return d.toISOString().slice(0, 10);
};

const UTILITY_FIELDS = ["electricity", "water", "gas", "AC"];
const SERVICE_FIELDS = [
  "cleaning",
  "sewage",
  "pestControl",
  "serviceFees",
  "extraStorage",
];

const Branches_detailView_costsField = ({
  branch,
  draft,
  isEditing,
  isBulkEdit,
  isCollapsed,
  isEmpty,
  isSaving,
  fieldErrors,
  onEditStart,
  onDraftChange,
  onCancel,
  onSubmit,
  onToggleCollapse,
  onVariableAdd,
  onVariableRemove,
  onVariableChange,
  t,
}) => {
  const dash = t("empty.noValue");
  const costs = branch?.costs ?? {};
  const fixed = costs?.fixed ?? {};
  const utilities = fixed?.utilities ?? {};
  const monthly = costs?.monthlyServices ?? {};
  const variable = Array.isArray(costs?.variable) ? costs.variable : [];

  const err = (key) =>
    fieldErrors?.[key] ? (
      <p className="branchesDetailSection__fieldError">
        {t(`validation.${fieldErrors[key]}`, fieldErrors[key])}
      </p>
    ) : null;

  const NumberField = ({ path, label }) => (
    <div className="branchesDetailSection__field">
      <label className="branchesDetailSection__label">{label}</label>
      <input
        className={
          "branchesDetailSection__input" +
          (fieldErrors?.[path] ? " branchesDetailSection__input--error" : "")
        }
        type="number"
        step="any"
        value={draft && resolveDraftPath(draft, path)}
        onChange={(e) => onDraftChange(path, e.target.value)}
      />
      {err(path)}
    </div>
  );

  const renderReadonly = () => (
    <div className="branchesDetailCosts__readonly">
      <dl className="branchesDetailSection__dl">
        <dt className="branchesDetailSection__dt">{t("fields.currency")}</dt>
        <dd className="branchesDetailSection__dd">
          {costs.currency || (
            <span className="branchesDetailSection__dd--empty">{dash}</span>
          )}
        </dd>
        <dt className="branchesDetailSection__dt">
          <span className="branchesDetailSection__dtIcon">
            <MoneyIcon size={14} />
          </span>
          {t("fields.rent")}
        </dt>
        <dd className="branchesDetailSection__dd">
          {fixed.rent ?? (
            <span className="branchesDetailSection__dd--empty">{dash}</span>
          )}
        </dd>
      </dl>

      <h4 className="branchesDetailSection__subTitle">
        {t("fields.utilities")}
      </h4>
      <dl className="branchesDetailSection__dl">
        {UTILITY_FIELDS.map((key) => (
          <div key={key} style={{ display: "contents" }}>
            <dt className="branchesDetailSection__dt">{t(`fields.${key}`)}</dt>
            <dd className="branchesDetailSection__dd">
              {utilities?.[key] ?? (
                <span className="branchesDetailSection__dd--empty">{dash}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <h4 className="branchesDetailSection__subTitle">
        {t("fields.monthlyServices")}
      </h4>
      <dl className="branchesDetailSection__dl">
        {SERVICE_FIELDS.map((key) => (
          <div key={key} style={{ display: "contents" }}>
            <dt className="branchesDetailSection__dt">{t(`fields.${key}`)}</dt>
            <dd className="branchesDetailSection__dd">
              {monthly?.[key] ?? (
                <span className="branchesDetailSection__dd--empty">{dash}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>

      <h4 className="branchesDetailSection__subTitle">
        {t("fields.variableCosts")}
      </h4>
      {variable.length === 0 ? (
        <p className="branchesDetailCosts__emptyHint">
          {t("empty.noVariableCosts")}
        </p>
      ) : (
        <div className="branchesDetailCosts__readonlyList">
          {variable.map((row, index) => (
            <div key={index} className="branchesDetailCosts__readonlyRow">
              <span className="branchesDetailCosts__readonlyLabel">
                {row.label || dash}
              </span>
              <span className="branchesDetailCosts__readonlyAmount">
                {row.amount ?? dash}
              </span>
              <span className="branchesDetailCosts__readonlyDate">
                {fmtDate(row.date) || dash}
              </span>
              <span className="branchesDetailCosts__readonlyNotes">
                {row.notes || ""}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderEditable = () => (
    <>
      <div className="branchesDetailSection__grid">
        <div className="branchesDetailSection__field">
          <label className="branchesDetailSection__label">
            {t("fields.currency")}
          </label>
          <input
            className={
              "branchesDetailSection__input" +
              (fieldErrors?.currency
                ? " branchesDetailSection__input--error"
                : "")
            }
            type="text"
            value={draft?.currency ?? ""}
            onChange={(e) => onDraftChange("currency", e.target.value)}
          />
          {err("currency")}
        </div>
        <NumberField path="fixed.rent" label={t("fields.rent")} />
      </div>

      <h4 className="branchesDetailSection__subTitle">
        {t("fields.utilities")}
      </h4>
      <div className="branchesDetailSection__grid">
        {UTILITY_FIELDS.map((key) => (
          <NumberField
            key={key}
            path={`fixed.utilities.${key}`}
            label={t(`fields.${key}`)}
          />
        ))}
      </div>

      <h4 className="branchesDetailSection__subTitle">
        {t("fields.monthlyServices")}
      </h4>
      <div className="branchesDetailSection__grid">
        {SERVICE_FIELDS.map((key) => (
          <NumberField
            key={key}
            path={`monthlyServices.${key}`}
            label={t(`fields.${key}`)}
          />
        ))}
      </div>

      <h4 className="branchesDetailSection__subTitle">
        {t("fields.variableCosts")}
      </h4>
      <div className="branchesDetailCosts__variableList">
        {(draft?.variable ?? []).length === 0 && (
          <p className="branchesDetailCosts__emptyHint">
            {t("empty.noVariableCosts")}
          </p>
        )}
        {(draft?.variable ?? []).map((row, index) => {
          const rowErr = (suffix) =>
            fieldErrors?.[`variable[${index}].${suffix}`];
          return (
            <div key={index} className="branchesDetailCosts__variableRow">
              <input
                className={
                  "branchesDetailSection__input" +
                  (rowErr("label")
                    ? " branchesDetailSection__input--error"
                    : "")
                }
                type="text"
                placeholder={t("fields.label")}
                value={row?.label ?? ""}
                onChange={(e) =>
                  onVariableChange(index, "label", e.target.value)
                }
              />
              <input
                className={
                  "branchesDetailSection__input" +
                  (rowErr("amount")
                    ? " branchesDetailSection__input--error"
                    : "")
                }
                type="number"
                step="any"
                placeholder={t("fields.amount")}
                value={row?.amount ?? ""}
                onChange={(e) =>
                  onVariableChange(index, "amount", e.target.value)
                }
              />
              <input
                className={
                  "branchesDetailSection__input" +
                  (rowErr("date") ? " branchesDetailSection__input--error" : "")
                }
                type="date"
                value={row?.date ?? ""}
                onChange={(e) =>
                  onVariableChange(index, "date", e.target.value)
                }
              />
              <input
                className={
                  "branchesDetailSection__input" +
                  (rowErr("notes")
                    ? " branchesDetailSection__input--error"
                    : "")
                }
                type="text"
                placeholder={t("fields.notes")}
                value={row?.notes ?? ""}
                onChange={(e) =>
                  onVariableChange(index, "notes", e.target.value)
                }
              />
              <button
                type="button"
                className="branchesDetailSection__btn"
                onClick={() => onVariableRemove(index)}
                aria-label={t("actions.removeRow")}>
                ×
              </button>
            </div>
          );
        })}
        <button
          type="button"
          className="branchesDetailSection__btn branchesDetailCosts__addRow"
          onClick={onVariableAdd}>
          + {t("actions.addRow")}
        </button>
      </div>
    </>
  );

  return (
    <Branches_detail_sectionShell
      rootClass="branchesDetailCosts"
      title={t("sections.costs")}
      icon={<MoneyIcon size={16} />}
      isEditing={isEditing}
      isBulkEdit={isBulkEdit}
      isCollapsed={isCollapsed}
      isEmpty={isEmpty}
      isSaving={isSaving}
      onEditStart={onEditStart}
      onDraftChange={onDraftChange}
      onCancel={onCancel}
      onSubmit={onSubmit}
      onToggleCollapse={onToggleCollapse}
      t={t}
      renderReadonly={renderReadonly}
      renderEditable={renderEditable}
    />
  );
};

// Small helper to read a path like "fixed.utilities.AC" off the draft without
// pulling getByPath's whole import into this file.
function resolveDraftPath(obj, path) {
  const parts = path.split(".");
  let cursor = obj;
  for (const p of parts) {
    if (cursor == null) return "";
    cursor = cursor[p];
  }
  return cursor ?? "";
}

export default Branches_detailView_costsField;
