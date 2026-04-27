import { Modifiers_detail_sectionShell } from "./_modifiers_childComps.index.js";
import {
  MODIFIER_TYPE_OPTIONS,
  SELECTION_QTY_OPTIONS,
} from "../../05_modifiers_cnst/_modifiers_cnst.index.js";
import "../../_styles/modifiers_detail_basic.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Modifiers_detail_basic = (props) => {
  const { modifier, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <Modifiers_detail_sectionShell
      {...props}
      rootClass="modifiersDetailBasic"
      title={t("sections.basic")}
      renderReadonly={() => (
        <div className="modifiersDetailBasic__readonly">
          <p>
            <strong>{t("fields.type")}:</strong>{" "}
            {t(`enums.type.${modifier?.type || "optional"}`)}
          </p>
          <p>
            <strong>{t("fields.selectionQty")}:</strong>{" "}
            {t(`enums.selectionQty.${modifier?.selectionQty || "onlyOne"}`)}
          </p>
          <p>
            <strong>{t("fields.cost")}:</strong>{" "}
            {modifier?.cost ?? t("empty.noValue")}
          </p>
          <p>
            <strong>{t("fields.isActive")}:</strong>{" "}
            {modifier?.isActive !== false ? t("badges.active") : t("badges.inactive")}
          </p>
        </div>
      )}
      renderEditable={() => (
        <div className="modifiersDetailBasic__form">
          <label className="modifiersDetailBasic__field">
            <span>{t("fields.type")}</span>
            <select
              value={editable.type ?? "optional"}
              onChange={(e) => onDraftChange("type", e.target.value)}
            >
              {MODIFIER_TYPE_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </option>
              ))}
            </select>
            {fieldErrors?.type && <small>{errorText(t, fieldErrors.type)}</small>}
          </label>
          <label className="modifiersDetailBasic__field">
            <span>{t("fields.selectionQty")}</span>
            <select
              value={editable.selectionQty ?? "onlyOne"}
              onChange={(e) => onDraftChange("selectionQty", e.target.value)}
            >
              {SELECTION_QTY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {t(opt.labelKey)}
                </option>
              ))}
            </select>
            {fieldErrors?.selectionQty && (
              <small>{errorText(t, fieldErrors.selectionQty)}</small>
            )}
          </label>
          <label className="modifiersDetailBasic__field">
            <span>{t("fields.cost")}</span>
            <input
              type="number"
              min="0"
              value={editable.cost ?? 0}
              onChange={(e) => onDraftChange("cost", Number(e.target.value))}
            />
            {fieldErrors?.cost && <small>{errorText(t, fieldErrors.cost)}</small>}
          </label>
          <label className="modifiersDetailBasic__toggle">
            <input
              type="checkbox"
              checked={editable.isActive !== false}
              onChange={(e) => onDraftChange("isActive", e.target.checked)}
            />
            <span>{t("fields.isActive")}</span>
          </label>
        </div>
      )}
    />
  );
};

export default Modifiers_detail_basic;
