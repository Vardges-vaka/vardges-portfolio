import { useCallback, useState } from "react";
import "../_styles/toolTips/Tooltip_3.css";

const VIEW_ICON_PATH =
  "M19 19H5V5h7V3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z";

/**
 * Radial fan menu (center toggle reveals orbiting items).
 * First two orbit slots: optional brand logos; third: view action.
 *
 * @param {object} props
 * @param {string} props.instanceId — stable unique fragment (e.g. competitor _id)
 * @param {React.ReactNode} props.toggleContent — center label (e.g. total count)
 * @param {string} props.toggleAriaLabel — when menu is closed
 * @param {string} props.toggleCloseAriaLabel — when menu is open
 * @param {Array<{ src: string|null, alt: string }|null>} props.logoSlots
 * @param {function} [props.onViewClick]
 * @param {string} [props.viewTitle]
 * @param {string} [props.viewAriaLabel]
 * @param {string} [props.competitorId]
 * @param {string} [props.dataSession]
 * @param {string} [props.idPlaceholderLabel]
 */
const Tooltip_3 = ({
  instanceId,
  toggleContent,
  toggleAriaLabel,
  toggleCloseAriaLabel = "Close menu",
  logoSlots = [null, null],
  onViewClick,
  viewTitle = "",
  viewAriaLabel = "",
  competitorId,
  dataSession,
  idPlaceholderLabel = "ID",
}) => {
  const safeId = String(instanceId ?? "tooltip-3").replace(/[^a-zA-Z0-9_-]/g, "");
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  const handleViewClick = useCallback(
    (e) => {
      e.stopPropagation();
      onViewClick?.(e);
      setOpen(false);
    },
    [onViewClick],
  );

  const slot0 = logoSlots[0] ?? null;
  const slot1 = logoSlots[1] ?? null;

  const renderLogoInner = (logo) => {
    if (!logo) return null;
    if (logo.src) {
      return (
        <img
          className="menu-tooltip__logoImg"
          src={logo.src}
          alt=""
          title={logo.alt}
          loading="lazy"
        />
      );
    }
    return (
      <span className="menu-tooltip__idPh" title={logo.alt}>
        {idPlaceholderLabel}
      </span>
    );
  };

  const orbitItems = [];
  for (let i = 0; i < 8; i += 1) {
    let inner = null;
    if (i === 0) {
      inner = (
        <span className="anchor menu-tooltip__anchor menu-tooltip__anchorLogo">
          {renderLogoInner(slot0)}
        </span>
      );
    } else if (i === 1) {
      inner = (
        <span className="anchor menu-tooltip__anchor menu-tooltip__anchorLogo">
          {renderLogoInner(slot1)}
        </span>
      );
    } else if (i === 2) {
      inner = (
        <button
          type="button"
          className="anchor menu-tooltip__anchor menu-tooltip__anchorView"
          title={viewTitle}
          aria-label={viewAriaLabel || viewTitle}
          data-session={dataSession}
          data-competitor-id={competitorId}
          data-editing="false"
          onClick={handleViewClick}
        >
          <svg
            className="menu-tooltip__viewSvg"
            viewBox="0 0 24 24"
            aria-hidden
          >
            <path fill="currentColor" d={VIEW_ICON_PATH} />
          </svg>
        </button>
      );
    } else {
      inner = <span className="anchor menu-tooltip__anchor" aria-hidden />;
    }

    orbitItems.push(
      <li
        key={`orbit-${safeId}-${i}`}
        style={{ "--i": i }}
        className="circle-box menu-tooltip__circle"
      >
        {inner}
      </li>,
    );
  }

  const rootClass = open ? "menu-tooltip menu-tooltip--open" : "menu-tooltip";

  return (
    <aside className={rootClass} data-instance-id={safeId}>
      <button
        type="button"
        className="toggle menu-tooltip__toggle"
        onClick={(e) => {
          e.stopPropagation();
          toggle();
        }}
        aria-expanded={open}
        aria-label={open ? toggleCloseAriaLabel : toggleAriaLabel}
      >
        <span className="menu-tooltip__toggleFace" aria-hidden="true">
          <span className="menu-tooltip__toggleCount">{toggleContent}</span>
          <span className="menu-tooltip__toggleCloseGlyph">×</span>
        </span>
      </button>
      <ul className="menu-tooltip__orbit">{orbitItems}</ul>
    </aside>
  );
};

export default Tooltip_3;
