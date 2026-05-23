import "../../_styles/menus_childComps/menus_translations.css";
import { Globe } from "lucide-react";

/* ============================================================================
   Menus_translations — expandable panel showing per-language values.

   props:
   - title: string                         (panel title; e.g. "Translations")
   - data: { [langCode: string]: string }  (e.g. { en, ru, ar })
   - readOnly: boolean
   - multiline: boolean                    (textarea vs input)
============================================================================ */

// Emoji flag fallback per language code. Replace with your own SVG flag set
// (or react-flag-icons) if you have one.
const FLAGS = {
  en: "🇬🇧", ru: "🇷🇺", ar: "🇦🇪", uk: "🇺🇦", fr: "🇫🇷",
  de: "🇩🇪", es: "🇪🇸", it: "🇮🇹", tr: "🇹🇷", he: "🇮🇱",
};

const Menus_translations = ({ title, data, readOnly = true, multiline = false, onChange }) => {
  const entries = Object.entries(data || {}).filter(
    ([, v]) => v != null && v !== "",
  );

  if (!entries.length) {
    return (
      <div className="menus_translations">
        <p className="menus_translations_title">
          <Globe size={12} /> {title}
        </p>
        <p style={{ margin: 0, fontSize: 12, color: "var(--menus-text-faint)" }}>
          No translations recorded.
        </p>
      </div>
    );
  }

  return (
    <div className="menus_translations">
      <p className="menus_translations_title">
        <Globe size={12} /> {title}
      </p>
      {entries.map(([lang, value]) => (
        <div key={lang} className="menus_translations_row">
          <span className="menus_translations_flag" title={lang.toUpperCase()}>
            {FLAGS[lang] || lang.toUpperCase()}
          </span>
          {multiline ? (
            <textarea
              className="menus_translations_textarea"
              defaultValue={value}
              readOnly={readOnly}
              rows={3}
              onChange={(e) => onChange?.(lang, e.target.value)}
            />
          ) : (
            <input
              className="menus_translations_input"
              defaultValue={value}
              readOnly={readOnly}
              onChange={(e) => onChange?.(lang, e.target.value)}
            />
          )}
          <span className="menus_translations_code">{lang}</span>
        </div>
      ))}
    </div>
  );
};

export default Menus_translations;
