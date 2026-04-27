import {
  isTimingsEmpty,
  formatWindowList,
} from "../helpers/activeTimingsHelpers.js";
import "../_styles/activeTimingsEditor.css";

// Readonly view of activeTimings data. Shows "Always" badge or a formatted
// list of windows.
const ActiveTimingsReadonly = ({ value, t }) => {
  const isEmpty = isTimingsEmpty(value);

  return (
    <div className="activeTimingsReadonly">
      {isEmpty ? (
        <span className="activeTimingsReadonly__badge">
          {t ? t("activeTimings.always") : "Always"}
        </span>
      ) : (
        <span className="activeTimingsReadonly__list">
          {formatWindowList(value)}
        </span>
      )}
    </div>
  );
};

export default ActiveTimingsReadonly;
