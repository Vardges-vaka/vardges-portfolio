import { MenuItems_detail_sectionShell } from "./_menuItems_childComps.index.js";
import "../../_styles/menuItems_detail_name.css";

const LANGS = ["en", "ru", "ar"];
const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const MenuItems_detail_name = (props) => {
  const { menuItem, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <MenuItems_detail_sectionShell
      {...props}
      rootClass="menuItemsDetailName"
      title={t("sections.name")}
      renderReadonly={() => (
        <div className="menuItemsDetailName__readonly">
          {LANGS.map((lang) => (
            <p key={lang}>
              <strong>{lang.toUpperCase()}:</strong>{" "}
              {menuItem?.name?.[lang] || t("empty.noValue")}
            </p>
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="menuItemsDetailName__form">
          {LANGS.map((lang) => (
            <label key={lang} className="menuItemsDetailName__field">
              <span>{lang.toUpperCase()}</span>
              <input
                value={editable[lang] ?? ""}
                onChange={(e) => onDraftChange(lang, e.target.value)}
                placeholder={t("fields.name")}
              />
              {fieldErrors?.[lang] && <small>{errorText(t, fieldErrors[lang])}</small>}
            </label>
          ))}
        </div>
      )}
    />
  );
};

export default MenuItems_detail_name;
