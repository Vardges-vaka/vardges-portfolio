import { useEffect, useRef, useState } from "react";
import "../_styles/toolTips/Tooltip_11.css";
/*
to be renaimed as RadialPopoverMenu
*/
const Tooltip_11 = ({
  toggleContent,
  toggleAriaLabel = "Toggle menu",
  items = [],
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);
  const visible = items.slice(0, 3);

  useEffect(() => {
    if (!isOpen) return;
    const onOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, [isOpen]);

  return (
    <div
      ref={containerRef}
      className={`Tooltip_11${isOpen ? " Tooltip_11_isOpen" : ""}`}
    >
      <button
        type="button"
        className="Tooltip_11_toggle"
        onClick={() => setIsOpen((v) => !v)}
        aria-label={toggleAriaLabel}
        aria-expanded={isOpen}
      >
        {isOpen ? "×" : toggleContent}
      </button>

      {visible.map((item, i) => (
        <div
          key={i}
          className={`Tooltip_11_circleBox${isOpen ? " Tooltip_11_circleBox_open" : ""}`}
          style={{ "--i": i }}
        >
          <button
            type="button"
            className="Tooltip_11_anchor"
            style={item.gradient ? { background: item.gradient } : undefined}
            onClick={item.onClick}
            aria-label={item.ariaLabel}
            title={item.ariaLabel}
            tabIndex={isOpen ? 0 : -1}
            {...(item.dataProps || {})}
          >
            {item.content}
          </button>
        </div>
      ))}
    </div>
  );
};

export default Tooltip_11;
