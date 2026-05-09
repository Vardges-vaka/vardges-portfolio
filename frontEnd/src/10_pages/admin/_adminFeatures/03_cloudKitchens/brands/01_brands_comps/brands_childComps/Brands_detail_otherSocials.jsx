import { GlobeIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import {
  EMPTY_OTHER_SOCIAL_ROW,
  hydrateBrandForm,
} from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_socials.css";

const Brands_detail_otherSocials = (props) => {
  const { brand, draft, onDraftReplace, t } = props;
  const rows = Array.isArray(draft)
    ? draft
    : hydrateBrandForm(brand).otherSocials;

  const updateRow = (index, patch) => {
    const next = rows.slice();
    next[index] = { ...(next[index] ?? {}), ...patch };
    onDraftReplace(next);
  };

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailOtherSocials"
      title={t("sections.otherSocials")}
      icon={<GlobeIcon />}
      renderReadonly={() => (
        <div className="brandsDetailSocials_rows">
          {rows.length === 0 && (
            <p className="brandsDetailSocials_empty">{t("empty.noValue")}</p>
          )}
          {rows.map((row, index) => (
            <p key={`${row.name}-${index}`}>
              <strong>{row.name || t("empty.noValue")}:</strong>{" "}
              {row.link || t("empty.noValue")}
            </p>
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="brandsDetailSocials_form">
          {rows.map((row, index) => (
            <div className="brandsDetailEmails_editRow" key={index}>
              {["name", "link", "notes"].map((field) => (
                <label key={field}>
                  <span>{t(`fields.${field}`)}</span>
                  <input
                    value={row?.[field] ?? ""}
                    onChange={(event) =>
                      updateRow(index, { [field]: event.target.value })
                    }
                  />
                </label>
              ))}
              <label className="brandsDetailBasic_toggle">
                <input
                  type="checkbox"
                  checked={row?.isActive !== false}
                  onChange={(event) =>
                    updateRow(index, { isActive: event.target.checked })
                  }
                />
                <span>{t("fields.isActive")}</span>
              </label>
              <button
                type="button"
                className="brandsDetailEmails_removeBtn"
                onClick={() =>
                  onDraftReplace(
                    rows.filter((_, itemIndex) => itemIndex !== index),
                  )
                }>
                {t("actions.removeRow")}
              </button>
            </div>
          ))}
          <button
            type="button"
            className="brandsDetailEmails_addBtn"
            onClick={() =>
              onDraftReplace([...rows, { ...EMPTY_OTHER_SOCIAL_ROW }])
            }>
            + {t("actions.addRow")}
          </button>
        </div>
      )}
    />
  );
};

export default Brands_detail_otherSocials;
