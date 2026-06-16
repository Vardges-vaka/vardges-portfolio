import { useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import PropTypes from "prop-types";
import { usePortfolioLang } from "../context/usePortfolio.js";

const SIZE = 340;
const C = SIZE / 2;
const R = 124;
const RINGS = [0.25, 0.5, 0.75, 1];

// vertex on the radar for axis `i` of `n` at radius fraction `f` (0..1)
const point = (i, n, f) => {
  const a = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return [C + Math.cos(a) * R * f, C + Math.sin(a) * R * f];
};
const toPath = (pts) => pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`).join(" ") + "Z";

/**
 * Animated proficiency radar. The data polygon draws in (scale from centre) on
 * scroll; hovering/focusing an axis label highlights its spoke and value.
 */
const SkillsRadar = ({ data, variant }) => {
  const { t } = usePortfolioLang();
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);
  const n = data.axes.length;
  const stroke = variant === "bar" ? "var(--c-bar)" : "var(--c-tech)";
  const stroke2 = variant === "bar" ? "var(--c-bar2)" : "var(--c-tech2)";

  const dataPts = data.axes.map((ax, i) => point(i, n, ax.value / 100));

  return (
    <div className="vp-radar" style={{ "--rad": stroke, "--rad2": stroke2 }}>
      <svg viewBox={`0 0 ${SIZE} ${SIZE}`} className="vp-radar__svg" role="img" aria-label={t("skills.aria")}>
        {/* grid rings */}
        {RINGS.map((f) => (
          <polygon
            key={f}
            className="vp-radar__ring"
            points={data.axes.map((_, i) => point(i, n, f).join(",")).join(" ")}
          />
        ))}
        {/* spokes */}
        {data.axes.map((ax, i) => {
          const [x, y] = point(i, n, 1);
          return <line key={ax.key} className={`vp-radar__spoke ${active === i ? "is-active" : ""}`} x1={C} y1={C} x2={x} y2={y} />;
        })}
        {/* data polygon (animated) */}
        <Motion.path
          className="vp-radar__area"
          d={toPath(dataPts)}
          initial={reduced ? false : { scale: 0, opacity: 0 }}
          whileInView={reduced ? undefined : { scale: 1, opacity: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ transformOrigin: `${C}px ${C}px`, transformBox: "view-box" }}
        />
        {/* value dots */}
        {dataPts.map(([x, y], i) => (
          <circle key={data.axes[i].key} className={`vp-radar__dot ${active === i ? "is-active" : ""}`} cx={x} cy={y} r={active === i ? 6 : 4} />
        ))}
      </svg>

      <ul className="vp-radar__legend">
        {data.axes.map((ax, i) => (
          <li key={ax.key}>
            <span
              tabIndex={0}
              role="img"
              aria-label={`${t(`skills.axes.${ax.key}`)}: ${ax.value}`}
              className={`vp-radar__label ${active === i ? "is-active" : ""}`}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(-1)}
              onFocus={() => setActive(i)}
              onBlur={() => setActive(-1)}
            >
              <span className="vp-radar__label-name" aria-hidden="true">{t(`skills.axes.${ax.key}`)}</span>
              <span className="vp-radar__label-val" aria-hidden="true">{ax.value}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

SkillsRadar.propTypes = {
  data: PropTypes.shape({
    axes: PropTypes.arrayOf(PropTypes.shape({ key: PropTypes.string, value: PropTypes.number })).isRequired,
  }).isRequired,
  variant: PropTypes.oneOf(["tech", "bar"]).isRequired,
};

export default SkillsRadar;
