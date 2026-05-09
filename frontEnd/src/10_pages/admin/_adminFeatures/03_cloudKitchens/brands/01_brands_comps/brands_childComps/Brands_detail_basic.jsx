import { ManagerIcon } from "../Brands_icons/_brands_icons.index.js";
import { Brands_detail_sectionShell } from "./_brands_childComps.index.js";
import {
  getBrandDisplayName,
  getBrandTagline,
} from "../../02_brands_helpers/_brands_helpers.index.js";
import "../../_styles/brands_detail_basic.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Brands_detail_basic = (props) => {
  const { brand, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};
  const name = getBrandDisplayName(brand);
  const tagline = getBrandTagline(brand);

  return (
    <Brands_detail_sectionShell
      {...props}
      rootClass="brandsDetailBasic"
      title={t("sections.basic")}
      icon={<ManagerIcon />}
      renderReadonly={() => (
        <div className="brandsDetailBasic_readonly">
          <p>
            <strong>{t("fields.name")}:</strong> {name || t("empty.noValue")}
          </p>
          <p>
            <strong>{t("fields.tagline")}:</strong>{" "}
            {tagline || t("empty.noValue")}
          </p>
          <p>
            <strong>{t("fields.isActive")}:</strong>{" "}
            {brand?.isActive !== false ? t("badges.yes") : t("badges.no")}
          </p>
        </div>
      )}
      renderEditable={() => (
        <div className="brandsDetailBasic_form">
          <label className="brandsDetailBasic_field">
            <span>{t("fields.name")}</span>
            <input
              value={editable.name?.value ?? ""}
              onChange={(event) =>
                onDraftChange("name.value", event.target.value)
              }
              placeholder={t("fields.namePlaceholder")}
            />
            {fieldErrors?.["name.value"] && (
              <small>{errorText(t, fieldErrors["name.value"])}</small>
            )}
          </label>
          <label className="brandsDetailBasic_field">
            <span>{t("fields.tagline")}</span>
            <textarea
              value={editable.tagline?.value ?? ""}
              onChange={(event) =>
                onDraftChange("tagline.value", event.target.value)
              }
              placeholder={t("fields.taglinePlaceholder")}
              rows={3}
            />
            {fieldErrors?.["tagline.value"] && (
              <small>{errorText(t, fieldErrors["tagline.value"])}</small>
            )}
          </label>
          <div className="brandsDetailBasic_translations">
            {["en", "ru", "ar"].map((lang) => (
              <label className="brandsDetailBasic_field" key={lang}>
                <span>{t(`fields.translation_${lang}`)}</span>
                <input
                  value={editable.name?.translations?.[lang] ?? ""}
                  onChange={(event) =>
                    onDraftChange(
                      `name.translations.${lang}`,
                      event.target.value,
                    )
                  }
                />
              </label>
            ))}
          </div>
          <label className="brandsDetailBasic_toggle">
            <input
              type="checkbox"
              checked={editable.isActive !== false}
              onChange={(event) =>
                onDraftChange("isActive", event.target.checked)
              }
            />
            <span>{t("fields.isActive")}</span>
          </label>
        </div>
      )}
    />
  );
};

export default Brands_detail_basic;
