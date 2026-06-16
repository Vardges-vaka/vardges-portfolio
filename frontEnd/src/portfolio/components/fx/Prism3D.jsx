import { Code2, Martini } from "lucide-react";
import PropTypes from "prop-types";

/**
 * Pure CSS-3D rotating cube — the "two crafts, one person" emblem. Four side
 * faces (Engineer / Alchemist / VP monogram / Dubai) sweep past as it turns.
 * Zero JS animation, GPU-cheap, and frozen under prefers-reduced-motion (CSS).
 */
const Prism3D = ({ techLabel, barLabel }) => (
  <div className="vp-prism" aria-hidden="true">
    <div className="vp-prism__cube">
      <div className="vp-prism__face vp-prism__face--front">
        <Code2 size={20} />
        <span>{techLabel}</span>
      </div>
      <div className="vp-prism__face vp-prism__face--right">
        <span className="vp-prism__mono">VP</span>
      </div>
      <div className="vp-prism__face vp-prism__face--back">
        <Martini size={20} />
        <span>{barLabel}</span>
      </div>
      <div className="vp-prism__face vp-prism__face--left">
        <span className="vp-prism__dot">DXB</span>
      </div>
      <div className="vp-prism__face vp-prism__face--top" />
      <div className="vp-prism__face vp-prism__face--bottom" />
    </div>
  </div>
);

Prism3D.propTypes = {
  techLabel: PropTypes.string.isRequired,
  barLabel: PropTypes.string.isRequired,
};

export default Prism3D;
