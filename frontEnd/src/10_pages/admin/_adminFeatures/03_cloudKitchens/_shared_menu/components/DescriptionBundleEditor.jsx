import { useState } from "react";
import LocalizedTextEditor from "./LocalizedTextEditor.jsx";
import "../_styles/descriptionBundleEditor.css";

// Wraps three LocalizedTextEditors (Aggregators / Website / Google) inside
// collapsible accordions so the section height stays manageable.
// Props:
//   value       — { aggregators:{en,ru,ar}, website:{en,ru,ar}, google:{en,ru,ar} }
//   onChange    — (channel, lang, newValue) => void
//   fieldErrors — { "aggregators.en": "tooLong", ... }
//   disabled
//   t
const CHANNELS = [
  { key: "aggregators", labelKey: "channels.aggregators" },
  { key: "website", labelKey: "channels.website" },
  { key: "google", labelKey: "channels.google" },
];

const DescriptionBundleEditor = ({
  value,
  onChange,
  fieldErrors,
  disabled,
  t,
}) => {
  const [open, setOpen] = useState({});

  const toggle = (key) =>
    setOpen((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <div className="descriptionBundleEditor">
      {CHANNELS.map(({ key, labelKey }) => {
        const isOpen = !!open[key];
        const channelErrors = {};
        const prefix = `${key}.`;
        for (const ek of Object.keys(fieldErrors ?? {})) {
          if (ek.startsWith(prefix)) {
            channelErrors[ek.slice(prefix.length)] = fieldErrors[ek];
          }
        }

        return (
          <div
            key={key}
            className={
              "descriptionBundleEditor__channel" +
              (isOpen ? " descriptionBundleEditor__channel--open" : "")
            }
          >
            <button
              type="button"
              className="descriptionBundleEditor__toggle"
              onClick={() => toggle(key)}
              aria-expanded={isOpen}
            >
              <span className="descriptionBundleEditor__chevron">
                {isOpen ? "▾" : "▸"}
              </span>
              {t ? t(labelKey, key) : key}
            </button>

            {isOpen && (
              <div className="descriptionBundleEditor__body">
                <LocalizedTextEditor
                  value={value?.[key]}
                  onChange={(lang, v) => onChange(key, lang, v)}
                  fieldErrors={channelErrors}
                  inputType="textarea"
                  disabled={disabled}
                  t={t}
                />
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default DescriptionBundleEditor;
