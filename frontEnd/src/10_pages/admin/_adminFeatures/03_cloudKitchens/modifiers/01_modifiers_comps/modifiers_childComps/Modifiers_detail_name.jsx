import { Modifiers_detail_sectionShell } from "./_modifiers_childComps.index.js";
import "../../_styles/modifiers_detail_name.css";

const LANGS = ["en", "ru", "ar", "hy"];

const errorText = (t, code) => (code ? t(`validation.${code}`) : null);

const Modifiers_detail_name = (props) => {
  const { modifier, draft, fieldErrors, onDraftChange, t } = props;
  const editable = draft ?? {};

  return (
    <Modifiers_detail_sectionShell
      {...props}
      rootClass="modifiersDetailName"
      title={t("sections.name")}
      renderReadonly={() => (
        <div className="modifiersDetailName__readonly">
          {LANGS.map((lang) => (
            <p key={lang}>
              <strong>{lang.toUpperCase()}:</strong>{" "}
              {modifier?.name?.[lang] || t("empty.noValue")}
            </p>
          ))}
        </div>
      )}
      renderEditable={() => (
        <div className="modifiersDetailName__form">
          {LANGS.map((lang) => (
            <label key={lang} className="modifiersDetailName__field">
              <span>{lang.toUpperCase()}</span>
              <input
                value={editable[lang] ?? ""}
                onChange={(e) => onDraftChange(lang, e.target.value)}
                placeholder={`${t("fields.name")} (${lang.toUpperCase()})`}
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

export default Modifiers_detail_name;
