import {
  MapView_Icon,
  ListView_Icon,
} from "../../../../../../01_components/components.index.js";
import { VALID_VIEW_MODES } from "../05_competitors_cnst/_competitors_cnst.index.js";
import "../_styles/competitors_viewToggle.css";

const Competitors_viewToggle = ({ states, handlers, t }) => {
  const reducedModes = VALID_VIEW_MODES(t).reduce((acc, mode) => {
    acc[mode.value] = mode;
    return acc;
  }, {});
  if (!reducedModes[states.session]) return null;

  if (!VALID_VIEW_MODES(t).some((mode) => mode.value === states.session))
    return null;

  const mapView_Icon = MapView_Icon();
  const listView_Icon = ListView_Icon();
  const MODES = VALID_VIEW_MODES(t);

  return (
    <div className="Competitors_viewToggle">
      {MODES.map((mode) => {
        const isActive = states.session === mode.value;
        return (
          <button
            key={mode.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-label={mode.title}
            title={mode.title}
            className={
              "Competitors_viewToggle_btn" +
              (isActive ? " Competitors_viewToggle_btnActive" : "")
            }
            data-value={mode.value}
            onClick={handlers.handleSetSession}>
            {isActive ? (
              <span className="Competitors_viewToggle_pulseDot" aria-hidden />
            ) : null}
            {mode.value === "view_competitors_map" ? (
              <img
                className="Competitors_viewToggle_iconImg"
                src={mapView_Icon}
                alt=""
                aria-hidden
                draggable={false}
              />
            ) : (
              <img
                className="Competitors_viewToggle_iconImg"
                src={listView_Icon}
                alt=""
                aria-hidden
                draggable={false}
              />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Competitors_viewToggle;
