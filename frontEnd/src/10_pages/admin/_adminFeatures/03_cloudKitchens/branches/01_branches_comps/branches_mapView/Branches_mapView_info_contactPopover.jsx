import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import {
  hrefTel,
  hrefWhatsApp,
  hrefTelegram,
  hrefMailto,
} from "../../02_branches_helpers/_branches_helpers.index.js";

import "../../_styles/branches_mapView_info.css";

const empty = (v) => v == null || v === "";

const renderPhoneGlyph = (className) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"
    />
  </svg>
);

const renderWhatsAppGlyph = (className) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"
    />
  </svg>
);

const renderEmailGlyph = (className) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    />
  </svg>
);

const renderTelegramGlyph = (className) => (
  <svg className={className} width="20" height="20" viewBox="0 0 24 24" aria-hidden>
    <path
      fill="currentColor"
      d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"
    />
  </svg>
);

/** Same order as the user described: WhatsApp → phone → email → Telegram. */
const CHANNEL_DEFS = [
  {
    key: "whatsApp",
    labelKey: "fields.whatsApp",
    hrefFn: hrefWhatsApp,
    pick: (c) => c.whatsApp,
    renderGlyph: renderWhatsAppGlyph,
  },
  {
    key: "phone",
    labelKey: "fields.phone",
    hrefFn: hrefTel,
    pick: (c) => c.phone,
    renderGlyph: renderPhoneGlyph,
  },
  {
    key: "email",
    labelKey: "fields.email",
    hrefFn: hrefMailto,
    pick: (c) => c.email,
    renderGlyph: renderEmailGlyph,
  },
  {
    key: "telegram",
    labelKey: "fields.telegram",
    hrefFn: hrefTelegram,
    pick: (c) => c.telegram,
    renderGlyph: renderTelegramGlyph,
  },
];

const Branches_mapView_info_contactPopover = ({ t, title, contact, anchorEl, onClose }) => {
  const rootRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, arrowLeft: "50%" });
  const [arrowAbove, setArrowAbove] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const contactSafe = contact ?? {};

  const channels = CHANNEL_DEFS.map((def) => {
    const value = def.pick(contactSafe);
    if (empty(value)) return null;
    const href = def.hrefFn(value);
    return { ...def, value: String(value).trim(), href };
  }).filter(Boolean);

  useLayoutEffect(() => {
    if (!anchorEl) return;

    const placePopover = () => {
      if (!anchorEl || !rootRef.current) return;
      const ar = anchorEl.getBoundingClientRect();
      const pr = rootRef.current.getBoundingClientRect();
      const gap = 10;
      let top = ar.bottom + gap;
      let above = false;
      if (top + pr.height > window.innerHeight - 8) {
        top = ar.top - pr.height - gap;
        above = true;
      }
      let left = ar.left + ar.width / 2 - pr.width / 2;
      left = Math.max(8, Math.min(left, window.innerWidth - pr.width - 8));
      const anchorCenter = ar.left + ar.width / 2;
      const arrowOffset = anchorCenter - left;
      const arrowLeft = Math.max(16, Math.min(arrowOffset, pr.width - 16));
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
  }, [anchorEl, contact, title]);

  useEffect(() => {
    const onPointerDown = (e) => {
      const el = rootRef.current;
      if (!el) return;
      if (el.contains(e.target)) return;
      if (anchorEl?.contains(e.target)) return;
      onClose();
    };
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [anchorEl, onClose]);

  const copyText = async (text, key) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedKey(key);
      setTimeout(() => setCopiedKey((k) => (k === key ? null : k)), 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  if (!anchorEl) return null;

  const node = (
    <div
      ref={rootRef}
      className={
        "branchesMapViewInfo__contactPopover" +
        (arrowAbove ? " branchesMapViewInfo__contactPopover--flip" : "")
      }
      role="dialog"
      aria-modal="false"
      aria-label={title}
      style={{ top: pos.top, left: pos.left }}>
      <span className="branchesMapViewInfo__contactPopoverArrow" style={{ left: pos.arrowLeft }} aria-hidden />
      <div className="branchesMapViewInfo__contactPopoverHeader">
        <span className="branchesMapViewInfo__contactPopoverTitle">{title}</span>
        <button
          type="button"
          className="branchesMapViewInfo__contactPopoverClose"
          onClick={onClose}
          aria-label={t("mapView.contactPopoverClose")}>
          ×
        </button>
      </div>
      {channels.length === 0 ? (
        <p className="branchesMapViewInfo__contactPopoverEmpty">{t("mapView.infoNoContactChannels")}</p>
      ) : (
        <ul className="branchesMapViewInfo__contactPopoverList">
          {channels.map((ch) => (
            <li key={ch.key} className="branchesMapViewInfo__cpRow">
              <span className="branchesMapViewInfo__cpIconWrap" title={t(ch.labelKey)}>
                {ch.renderGlyph("branchesMapViewInfo__cpIcon")}
              </span>
              <div className="branchesMapViewInfo__cpSlide">
                <span className="branchesMapViewInfo__cpValue">{ch.value}</span>
                <button
                  type="button"
                  className="branchesMapViewInfo__cpMiniBtn"
                  onClick={() => copyText(ch.value, ch.key)}>
                  {copiedKey === ch.key ? t("mapView.contactPopoverCopied") : t("mapView.contactPopoverCopy")}
                </button>
                {ch.href ? (
                  <a
                    className="branchesMapViewInfo__cpMiniLink"
                    href={ch.href}
                    {...(ch.key === "phone" || ch.key === "email"
                      ? {}
                      : { target: "_blank", rel: "noreferrer" })}>
                    {t("mapView.contactPopoverLink")}
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return createPortal(node, document.body);
};

export default Branches_mapView_info_contactPopover;
