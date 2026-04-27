import { useState } from "react";
import "../_styles/localizedTextEditor.css";

// Tabbed EN / RU / AR editor for a single localized field.
// Props:
//   value   — { en, ru, ar }
//   onChange — (lang, newValue) => void
//   label   — optional label shown above the input
//   fieldErrors — { "en": "tooLong", ... } optional per-lang error map
//   inputType — "text" | "textarea" (default: "text")
//   disabled
//   t       — i18n translate fn
const LANGS = [
  { key: "en", label: "EN" },
  { key: "ru", label: "RU" },
  { key: "ar", label: "AR" },
];

const LocalizedTextEditor = ({
  value,
  onChange,
  label,
  fieldErrors,
  inputType = "text",
  disabled,
  t,
}) => {
  const [activeLang, setActiveLang] = useState("en");
  const currentValue = value?.[activeLang] ?? "";
  const err = fieldErrors?.[activeLang];

  // Show a tiny preview of the other two languages
  const otherPreviews = LANGS.filter((l) => l.key !== activeLang)
    .map((l) => {
      const v = value?.[l.key];
      return v ? `${l.label}: ${v.slice(0, 40)}${v.length > 40 ? "…" : ""}` : null;
    })
    .filter(Boolean);

  return (
    <div className="localizedTextEditor">
      {label && <span className="localizedTextEditor__label">{label}</span>}

      <div className="localizedTextEditor__tabs" role="tablist">
        {LANGS.map((l) => {
          const hasContent = !!value?.[l.key];
          return (
            <button
              key={l.key}
              type="button"
              role="tab"
              aria-selected={activeLang === l.key}
              className={
                "localizedTextEditor__tab" +
                (activeLang === l.key ? " localizedTextEditor__tab--active" : "") +
                (hasContent ? " localizedTextEditor__tab--filled" : "")
              }
              onClick={() => setActiveLang(l.key)}
            >
              {l.label}
            </button>
          );
        })}
      </div>

      {inputType === "textarea" ? (
        <textarea
          className={
            "localizedTextEditor__textarea" +
            (err ? " localizedTextEditor__textarea--error" : "")
          }
          value={currentValue}
          onChange={(e) => onChange(activeLang, e.target.value)}
          disabled={disabled}
          dir={activeLang === "ar" ? "rtl" : "ltr"}
          rows={3}
        />
      ) : (
        <input
          className={
            "localizedTextEditor__input" +
            (err ? " localizedTextEditor__input--error" : "")
          }
          type="text"
          value={currentValue}
          onChange={(e) => onChange(activeLang, e.target.value)}
          disabled={disabled}
          dir={activeLang === "ar" ? "rtl" : "ltr"}
        />
      )}

      {err && (
        <p className="localizedTextEditor__error">
          {t ? t(`validation.${err}`, err) : err}
        </p>
      )}

      {otherPreviews.length > 0 && (
        <p className="localizedTextEditor__previews">
          {otherPreviews.join(" · ")}
        </p>
      )}
    </div>
  );
};

export default LocalizedTextEditor;
