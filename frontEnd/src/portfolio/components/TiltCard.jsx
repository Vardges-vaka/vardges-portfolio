import { useRef } from "react";
import PropTypes from "prop-types";

// 3D perspective tilt with a glare spot that follows the pointer. No-ops on touch.
const TiltCard = ({ children, className = "", max = 8 }) => {
  const ref = useRef(null);

  const handleMove = (e) => {
    if (e.pointerType === "touch") return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    el.style.setProperty("--rx", `${((0.5 - py) * max).toFixed(2)}deg`);
    el.style.setProperty("--ry", `${((px - 0.5) * max).toFixed(2)}deg`);
    el.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
    el.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <div
      ref={ref}
      className={`vp-tilt ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      <div className="vp-tilt__inner">{children}</div>
    </div>
  );
};

TiltCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  max: PropTypes.number,
};

export default TiltCard;
