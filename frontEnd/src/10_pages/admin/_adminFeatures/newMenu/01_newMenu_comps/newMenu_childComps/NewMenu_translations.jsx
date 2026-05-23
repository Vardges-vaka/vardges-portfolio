import "../../_styles/newMenu_translations.css";

/* ============================================================================
   NewMenu_translations — expandable panel of per-language values.

   data: { langCode: string } — only non-empty entries are rendered.
   multiline: render textarea instead of input.
   readOnly: when true, fields are not editable.
============================================================================ */

const FLAGS = {
  en: "🇬🇧", ru: "🇷🇺", ar: "🇦🇪",
  uk: "🇺🇦", fr: "🇫🇷", de: "🇩🇪", es: "🇪🇸",
};

const NewMenu_translations = ({ title, data, multiline = false, readOnly = true }) => {
  const entries = Object.entries(data || {}).filter(([, v]) => v != null && v !== "");

  if (!entries.length) {
    return (
      <div className="NewMenu_translations">
        <p className="NewMenu_translations_title">{title}</p>
        <p className="NewMenu_translations_empty">No translations recorded.</p>
      </div>
    );
  }

  return (
    <div className="NewMenu_translations">
      {title && <p className="NewMenu_translations_title">{title}</p>}
      {entries.map(([lang, value]) => (
        <div key={lang} className="NewMenu_translations_row">
          <span className="NewMenu_translations_flag" title={lang.toUpperCase()}>
            {FLAGS[lang] || lang.toUpperCase()}
          </span>
          {multiline ? (
            <textarea
              className="NewMenu_translations_textarea"
              defaultValue={value}
              readOnly={readOnly}
              rows={3}
            />
          ) : (
            <input
              className="NewMenu_translations_input"
              defaultValue={value}
              readOnly={readOnly}
            />
          )}
          <span className="NewMenu_translations_code">{lang}</span>
        </div>
      ))}
    </div>
  );
};

export default NewMenu_translations;
