import { Menus_detail_sectionShell } from "./_menus_childComps.index.js";
import "../../_styles/menus_detail_name.css";

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Menus_detail_name = (props) => {
  const { menu, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <Menus_detail_sectionShell
      {...props}
      rootClass="menusDetailName"
      title={t("sections.name")}
      renderReadonly={() => (
        <div className="menusDetailName__readonly">
          <p><strong>EN:</strong> {menu?.name?.en || t("empty.noValue")}</p>
          <p><strong>RU:</strong> {menu?.name?.ru || t("empty.noValue")}</p>
          <p><strong>AR:</strong> {menu?.name?.ar || t("empty.noValue")}</p>
        </div>
      )}
      renderEditable={() => (
        <div className="menusDetailName__form">
          {["en", "ru", "ar"].map((lang) => (
            <label key={lang} className="menusDetailName__field">
              <span>{lang.toUpperCase()}</span>
              <input
                value={editable[lang] ?? ""}
                onChange={(event) => onDraftChange(lang, event.target.value)}
                placeholder={t(`placeholders.name_${lang}`)}
              />
              {fieldErrors?.[lang] && (
                <small>{errorText(t, fieldErrors[lang])}</small>
              )}
            </label>
          ))}
        </div>
      )}
    />
  );
};

export default Menus_detail_name;
