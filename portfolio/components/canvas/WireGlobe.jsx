import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// A rotating 3D point-globe (perspective-projected), with a few highlighted
// "career cities" glowing in the accent color.
const CITIES = [
  { lat: 40.18, lon: 44.51 }, // Yerevan
  { lat: 55.75, lon: 37.62 }, // Moscow
  { lat: 25.12, lon: 56.33 }, // Fujairah
  { lat: 24.45, lon: 54.38 }, // Abu Dhabi
  { lat: 25.2, lon: 55.27 }, // Dubai
];

const WireGlobe = ({ dotRGB, accent }) => {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf;
    let rot = 0;

    const toXYZ = (lat, lon, R) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return {
        x: -R * Math.sin(phi) * Math.cos(theta),
        y: R * Math.cos(phi),
        z: R * Math.sin(phi) * Math.sin(theta),
      };
    };

    // lattice points: latitude rings × longitude steps
    const basePoints = [];
    for (let lat = -75; lat <= 75; lat += 15) {
      for (let lon = -180; lon < 180; lon += 12) {
        basePoints.push({ lat, lon });
      }
    }

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const project = (p, R, tilt) => {
      // rotate around Y, then tilt around X
      let { x, y, z } = p;
      const cy = Math.cos(rot);
      const sy = Math.sin(rot);
      const x1 = x * cy + z * sy;
      const z1 = -x * sy + z * cy;
      const ct = Math.cos(tilt);
      const st = Math.sin(tilt);
      const y2 = y * ct - z1 * st;
      const z2 = y * st + z1 * ct;
      const f = R * 2.4;
      const scale = f / (f + z2);
      return { sx: w / 2 + x1 * scale, sy: h / 2 + y2 * scale, depth: z2, scale };
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const R = Math.min(w, h) * 0.38;
      const tilt = -0.35;

      for (let i = 0; i < basePoints.length; i++) {
        const bp = basePoints[i];
        const p3 = toXYZ(bp.lat, bp.lon, R);
        const pr = project(p3, R, tilt);
        const a = Math.max(0.04, ((R - pr.depth) / (2 * R)) * 0.55);
        ctx.fillStyle = `rgba(${dotRGB}, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(pr.sx, pr.sy, 1.1 * pr.scale, 0, Math.PI * 2);
        ctx.fill();
      }

      // glowing career cities
      for (let i = 0; i < CITIES.length; i++) {
        const p3 = toXYZ(CITIES[i].lat, CITIES[i].lon, R);
        const pr = project(p3, R, tilt);
        if (pr.depth > R * 0.35) continue; // hide on the far side
        const pulse = 1 + Math.sin(rot * 6 + i) * 0.35;
        ctx.fillStyle = accent;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(pr.sx, pr.sy, 2.6 * pr.scale * pulse, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      rot += 0.0035;
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    if (reduced) {
      draw();
      cancelAnimationFrame(raf);
    } else {
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf);
    };
  }, [dotRGB, accent]);

  return <canvas ref={ref} className="vp-canvas" aria-hidden="true" />;
};

WireGlobe.propTypes = {
  dotRGB: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
};

export default WireGlobe;
