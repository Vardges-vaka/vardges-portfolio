import { MenuCategories_detail_sectionShell } from "./_menuCategories_childComps.index.js";
import "../../_styles/menuCategories_detail_name.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const LANGS = ["en", "ru", "ar"];

const MenuCategories_detail_name = (props) => {
  const { category, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <MenuCategories_detail_sectionShell
      {...props}
      rootClass="menuCategoriesDetailName"
      title={t("sections.name")}
      renderReadonly={() => (
        <div className="menuCategoriesDetailName__readonly">
          {LANGS.map((lang) => (
            <p key={lang}>
              <strong>{t(`fields.name_${lang}`)}:</strong>{" "}
              {category?.name?.[lang] || t("empty.noValue")}
            </p>
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="menuCategoriesDetailName__form">
          {LANGS.map((lang) => (
            <label key={lang} className="menuCategoriesDetailName__field">
              <span>{t(`fields.name_${lang}`)}</span>
              <input
                value={editable[lang] ?? ""}
                onChange={(event) => onDraftChange(lang, event.target.value)}
                placeholder={t(`placeholders.name_${lang}`)}
              />
              {fieldErrors?.[lang] && <small>{errorText(t, fieldErrors[lang])}</small>}
            </label>
          ))}
        </div>
      )}
    />
  );
};

export default MenuCategories_detail_name;
