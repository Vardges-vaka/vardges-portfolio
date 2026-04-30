import "../_styles/branches_viewToggle.css";
import {
  MapView_Icon,
  ListView_Icon,
} from "../../../../../../01_components/components.index";

const MODES = /** @type {const} */ (["map", "list"]);

/** Renders theme-aware map glyph; keeps hook usage inside a stable child component. */
function Branches_viewToggle_mapGlyph() {
  return (
    <img
      className="branchesViewToggle__iconImg"
      src={MapView_Icon()}
      alt=""
      aria-hidden
      draggable={false}
    />
  );
}

function Branches_viewToggle_listGlyph() {
  return (
    <img
      className="branchesViewToggle__iconImg"
      src={ListView_Icon()}
      alt=""
      aria-hidden
      draggable={false}
    />
  );
}

const Branches_viewToggle = ({ viewMode, onChange, t }) => {
  return (
    <div
      className="branchesViewToggle"
      role="tablist"
      aria-label={t("viewModes.toggleAria")}>
      {MODES.map((mode) => {
        const isActive = viewMode === mode;
        return (
          <button
            key={mode}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={t(`viewModes.${mode}`)}
            title={t(`viewModes.${mode}`)}
            className={
              "branchesViewToggle__btn" +
              (isActive ? " branchesViewToggle__btn--active" : "")
            }
            onClick={() => onChange(mode)}>
            {isActive ? (
              <span
                className="branchesViewToggle__pulseDot"
                aria-hidden
              />
            ) : null}
            {mode === "map" ? (
              <Branches_viewToggle_mapGlyph />
            ) : (
              <Branches_viewToggle_listGlyph />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Branches_viewToggle;
