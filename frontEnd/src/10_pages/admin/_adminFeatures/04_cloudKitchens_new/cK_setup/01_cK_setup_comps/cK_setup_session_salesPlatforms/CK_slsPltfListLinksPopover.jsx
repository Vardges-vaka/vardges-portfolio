import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Copy,
  ExternalLink,
  Globe,
  Link2,
  Pencil,
} from "lucide-react";
import {
  formatSalesPlatformLinksDisplayValue,
  getSalesPlatformLinksFieldHref,
  SALES_PLATFORM_LINKS_FIELD_ARIA,
  SALES_PLATFORM_LINKS_POPOVER_FIELDS,
  shouldOpenSalesPlatformLinksLinkInNewTab,
} from "../../02_cK_setup_hlpr/salesPlatformLinks_hlpr.js";
import { getSalesPlatformDisplayName } from "../../02_cK_setup_hlpr/salesPlatformListRow_hlpr.js";
import "../../_styles/cK_setup_session_salesPlatforms/cK_slsPltfListLinksPopover.css";

const ROW_ICON_SIZE = 14;
const ACTION_ICON_SIZE = 13;

const FIELD_ICONS = {
  websiteUrl: Globe,
  partnerPortalUrl: Link2,
};

const copyTextToClipboard = async (text) => {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  document.body.removeChild(textarea);
};

const CK_slsPltfListLinksPopover = ({
  platform,
  anchorEl,
  onClose,
  onUpdateClick,
}) => {
  const rootRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, arrowLeft: "50%" });
  const [arrowAbove, setArrowAbove] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const links = platform?.links ?? {};
  const platformName = getSalesPlatformDisplayName(platform);

  useLayoutEffect(() => {
    if (!anchorEl || !platform) return undefined;

    const placePopover = () => {
      if (!anchorEl || !rootRef.current) return;

      const anchorRect = anchorEl.getBoundingClientRect();
      const popoverRect = rootRef.current.getBoundingClientRect();
      const gap = 10;
      let top = anchorRect.top - popoverRect.height - gap;
      let above = true;

      if (top < 8) {
        top = anchorRect.bottom + gap;
        above = false;
      }

      let left = anchorRect.left + anchorRect.width / 2 - popoverRect.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - popoverRect.width - 8));

      const anchorCenter = anchorRect.left + anchorRect.width / 2;
      const arrowLeft = Math.max(16, Math.min(anchorCenter - left, popoverRect.width - 16));

      setArrowAbove(above);
      setPos({ top, left, arrowLeft: `${arrowLeft}px` });
    };

    placePopover();
    const raf = requestAnimationFrame(placePopover);
    const onScrollResize = () => placePopover();

    window.addEventListener("resize", onScrollResize);
    window.addEventListener("scroll", onScrollResize, true);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onScrollResize);
      window.removeEventListener("scroll", onScrollResize, true);
    };
  }, [anchorEl, platform]);

  useEffect(() => {
    if (!anchorEl || !platform) return undefined;

    const onPointerDown = (event) => {
      const el = rootRef.current;
      if (!el) return;
      if (el.contains(event.target)) return;
      if (anchorEl?.contains(event.target)) return;
      onClose?.();
    };

    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose?.();
    };

    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [anchorEl, onClose, platform]);

  const handleCopy = async (fieldKey, value) => {
    if (!value || value === "-") return;

    try {
      await copyTextToClipboard(value);
      setCopiedKey(fieldKey);
      setTimeout(() => {
        setCopiedKey((current) => (current === fieldKey ? null : current));
      }, 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  if (!anchorEl || !platform) return null;

  const node = (
    <div
      ref={rootRef}
      className={[
        "cK_slsPltfListLinksPopover",
        arrowAbove && "cK_slsPltfListLinksPopover--flip",
      ]
        .filter(Boolean)
        .join(" ")}
      role="dialog"
      aria-modal="false"
      aria-label={`Links for ${platformName}`}
      style={{ top: pos.top, left: pos.left }}>
      <span
        className="cK_slsPltfListLinksPopover__arrow"
        style={{ left: pos.arrowLeft }}
        aria-hidden="true"
      />

      <div className="cK_slsPltfListLinksPopover__header">
        <span className="cK_slsPltfListLinksPopover__title">{platformName}</span>
        <button
          type="button"
          className="cK_slsPltfListLinksPopover__closeBtn"
          onClick={onClose}
          aria-label="Close links details">
          ×
        </button>
      </div>

      <ul className="cK_slsPltfListLinksPopover__rows">
        {SALES_PLATFORM_LINKS_POPOVER_FIELDS.map((field) => {
          const rawValue = links[field.key];
          const displayValue = formatSalesPlatformLinksDisplayValue(rawValue);
          const hasValue = displayValue !== "-";
          const trimmedValue = hasValue ? String(rawValue).trim() : "";
          const href =
            field.linkable && hasValue
              ? getSalesPlatformLinksFieldHref(field.key, rawValue)
              : null;
          const FieldIcon = FIELD_ICONS[field.key];
          const fieldLabel = SALES_PLATFORM_LINKS_FIELD_ARIA[field.key] || field.key;
          const isCopied = copiedKey === field.key;

          return (
            <li key={field.key} className="cK_slsPltfListLinksPopover__row">
              <span
                className="cK_slsPltfListLinksPopover__rowIcon"
                title={fieldLabel}
                aria-label={fieldLabel}>
                {FieldIcon ? (
                  <FieldIcon size={ROW_ICON_SIZE} aria-hidden="true" />
                ) : null}
              </span>

              <span
                className={[
                  "cK_slsPltfListLinksPopover__rowValue",
                  !hasValue && "cK_slsPltfListLinksPopover__rowValue--empty",
                ]
                  .filter(Boolean)
                  .join(" ")}>
                {displayValue}
              </span>

              <button
                type="button"
                className={[
                  "cK_slsPltfListLinksPopover__actionBtn",
                  isCopied && "cK_slsPltfListLinksPopover__actionBtn--copied",
                ]
                  .filter(Boolean)
                  .join(" ")}
                title={isCopied ? "Copied" : `Copy ${fieldLabel}`}
                aria-label={isCopied ? "Copied" : `Copy ${fieldLabel}`}
                onClick={() => handleCopy(field.key, trimmedValue)}
                disabled={!hasValue || !field.copyable}>
                {isCopied ? (
                  <Check size={ACTION_ICON_SIZE} aria-hidden="true" />
                ) : (
                  <Copy size={ACTION_ICON_SIZE} aria-hidden="true" />
                )}
              </button>

              {href ? (
                <a
                  className="cK_slsPltfListLinksPopover__actionBtn cK_slsPltfListLinksPopover__actionLink"
                  href={href}
                  title={`Open ${fieldLabel}`}
                  aria-label={`Open ${fieldLabel}`}
                  {...(shouldOpenSalesPlatformLinksLinkInNewTab(field.key)
                    ? { target: "_blank", rel: "noreferrer" }
                    : {})}>
                  <ExternalLink size={ACTION_ICON_SIZE} aria-hidden="true" />
                </a>
              ) : (
                <span
                  className="cK_slsPltfListLinksPopover__actionBtn cK_slsPltfListLinksPopover__actionBtn--disabled"
                  aria-hidden="true">
                  <ExternalLink size={ACTION_ICON_SIZE} />
                </span>
              )}
            </li>
          );
        })}
      </ul>

      <div className="cK_slsPltfListLinksPopover__footer">
        <button
          type="button"
          className="cK_slsPltfListLinksPopover__updateBtn"
          onClick={onUpdateClick}>
          <Pencil size={14} aria-hidden="true" />
          Update links
        </button>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default CK_slsPltfListLinksPopover;
