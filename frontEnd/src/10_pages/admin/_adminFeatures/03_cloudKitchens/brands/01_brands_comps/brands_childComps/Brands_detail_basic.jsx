import { ManagerIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import "../../_styles/brands_detail_basic.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_basic = (props) => {
  const { brand, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailBasic"
      title={t("sections.basic")}
      icon={<ManagerIcon />}
      renderReadonly={() => (
        <div className="brandsDetailBasic__readonly">
          <p><strong>{t("fields.name")}:</strong> {brand?.name || t("empty.noValue")}</p>
          <p><strong>{t("fields.tagline")}:</strong> {brand?.tagline || t("empty.noValue")}</p>
          <p>
            <strong>{t("fields.isActive")}:</strong>{" "}
            {brand?.isActive !== false ? t("badges.yes") : t("badges.no")}
          </p>
        </div>
      )}
      renderEditable={() => (
        <div className="brandsDetailBasic__form">
          <label className="brandsDetailBasic__field">
            <span>{t("fields.name")}</span>
            <input
              value={editable.name ?? ""}
              onChange={(event) => onDraftChange("name", event.target.value)}
              placeholder={t("fields.namePlaceholder")}
            />
            {fieldErrors?.name && <small>{errorText(t, fieldErrors.name)}</small>}
          </label>
          <label className="brandsDetailBasic__field">
            <span>{t("fields.tagline")}</span>
            <textarea
              value={editable.tagline ?? ""}
              onChange={(event) => onDraftChange("tagline", event.target.value)}
              placeholder={t("fields.taglinePlaceholder")}
              rows={3}
            />
            {fieldErrors?.tagline && <small>{errorText(t, fieldErrors.tagline)}</small>}
          </label>
          <label className="brandsDetailBasic__toggle">
            <input
              type="checkbox"
              checked={editable.isActive !== false}
              onChange={(event) => onDraftChange("isActive", event.target.checked)}
            />
            <span>{t("fields.isActive")}</span>
          </label>
        </div>
      )}
    />
  );
};

export default Brands_detail_basic;
