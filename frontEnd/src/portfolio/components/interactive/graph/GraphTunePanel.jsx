import { AnimatePresence, motion as Motion } from "framer-motion";
import PropTypes from "prop-types";
import { RotateCcw } from "lucide-react";
import { SLIDERS } from "./graphConfig.js";

/**
 * GraphTunePanel — the physics/appearance tuning popover (node size + force
 * sliders). Presentational: receives the tune state and its setter.
 */
const GraphTunePanel = ({ open, tune, setTune, onReset, t }) => (
  <AnimatePresence>
    {open && (
      <Motion.div
        className="vp-kg__tune-panel"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.2 }}
      >
        <div className="vp-kg__tune-head">
          <span>{t("graph.tuneTitle")}</span>
          <button type="button" className="vp-kg__tune-reset" onClick={onReset}>
            <RotateCcw size={12} aria-hidden="true" /> {t("graph.reset")}
          </button>
        </div>

        <div className="vp-kg__tune-row">
          <label className="vp-kg__tune-label">{t("graph.ctrl.nodeSize")}</label>
          <div className="vp-kg__seg">
            {["s", "m", "l"].map((s) => (
              <button
                key={s}
                type="button"
                className={tune.nodeSize === s ? "is-on" : ""}
                aria-pressed={tune.nodeSize === s}
                onClick={() => setTune((p) => ({ ...p, nodeSize: s }))}
              >
                {t(`graph.size.${s}`)}
              </button>
            ))}
          </div>
        </div>

        {SLIDERS.map(({ key, min, max, step }) => (
          <div className="vp-kg__tune-row" key={key}>
            <label className="vp-kg__tune-label" htmlFor={`kg-${key}`}>
              {t(`graph.ctrl.${key}`)}
            </label>
            <input
              id={`kg-${key}`}
              type="range"
              min={min}
              max={max}
              step={step}
              value={tune[key]}
              onChange={(e) => setTune((p) => ({ ...p, [key]: parseFloat(e.target.value) }))}
            />
          </div>
        ))}
      </Motion.div>
    )}
  </AnimatePresence>
);

GraphTunePanel.propTypes = {
  open: PropTypes.bool,
  tune: PropTypes.object.isRequired,
  setTune: PropTypes.func.isRequired,
  onReset: PropTypes.func.isRequired,
  t: PropTypes.func.isRequired,
};

export default GraphTunePanel;
