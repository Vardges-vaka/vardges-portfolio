import "../_styles/activeTimingsEditor.css";

const EMPTY_WINDOW = { label: "", from: "", to: "" };

// Props:
//   value     — { isAlwaysActive, windows:[{ label, from, to }] }
//   onChange  — (path, val) => void   — e.g. ("isAlwaysActive", false)
//   onWindowAdd / onWindowRemove(index) / onWindowChange(index, field, value)
//   fieldErrors — { "windows[0].from": "invalidTime", ... }
//   disabled
//   t
const ActiveTimingsEditor = ({
  value,
  onChange,
  onWindowAdd,
  onWindowRemove,
  onWindowChange,
  fieldErrors,
  disabled,
  t,
}) => {
  const isAlwaysActive = value?.isAlwaysActive !== false;
  const windows = Array.isArray(value?.windows) ? value.windows : [];

  return (
    <div className="activeTimingsEditor">
      <label className="activeTimingsEditor__toggle">
        <input
          type="checkbox"
          checked={isAlwaysActive}
          onChange={(e) => onChange("isAlwaysActive", e.target.checked)}
          disabled={disabled}
        />
        {t ? t("activeTimings.alwaysActive") : "Always active"}
      </label>

      {!isAlwaysActive && (
        <div className="activeTimingsEditor__windows">
          {windows.length === 0 && (
            <p className="activeTimingsEditor__empty">
              {t ? t("activeTimings.noWindows") : "No windows defined. Add one to restrict availability."}
            </p>
          )}

          {windows.map((w, i) => {
            const fromErr = fieldErrors?.[`windows[${i}].from`];
            const toErr = fieldErrors?.[`windows[${i}].to`];
            return (
              <div key={i} className="activeTimingsEditor__row">
                <input
                  className="activeTimingsEditor__inputLabel"
                  type="text"
                  placeholder={t ? t("activeTimings.labelPlaceholder") : "Label (e.g. Breakfast)"}
                  value={w.label ?? ""}
                  onChange={(e) => onWindowChange(i, "label", e.target.value)}
                  disabled={disabled}
                />
                <input
                  className={
                    "activeTimingsEditor__inputTime" +
                    (fromErr ? " activeTimingsEditor__inputTime--error" : "")
                  }
                  type="time"
                  value={w.from ?? ""}
                  onChange={(e) => onWindowChange(i, "from", e.target.value)}
                  disabled={disabled}
                />
                <span className="activeTimingsEditor__separator">–</span>
                <input
                  className={
                    "activeTimingsEditor__inputTime" +
                    (toErr ? " activeTimingsEditor__inputTime--error" : "")
                  }
                  type="time"
                  value={w.to ?? ""}
                  onChange={(e) => onWindowChange(i, "to", e.target.value)}
                  disabled={disabled}
                />
                <button
                  type="button"
                  className="activeTimingsEditor__removeBtn"
                  onClick={() => onWindowRemove(i)}
                  disabled={disabled}
                  aria-label={t ? t("actions.removeRow") : "Remove"}
                >
                  ×
                </button>
              </div>
            );
          })}

          <button
            type="button"
            className="activeTimingsEditor__addBtn"
            onClick={onWindowAdd}
            disabled={disabled}
          >
            + {t ? t("activeTimings.addWindow") : "Add window"}
          </button>
        </div>
      )}
    </div>
  );
};

export { EMPTY_WINDOW };
export default ActiveTimingsEditor;
