import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  Check,
  Clock,
  Copy,
  ExternalLink,
  Headset,
  Mail,
  MessageCircle,
  Phone,
} from "lucide-react";
import {
  copySupportListText,
  formatSupportListHeaderCount,
  getSupportListFieldDisplay,
  shouldOpenSupportListLinkInNewTab,
  SUPPORT_LIST_POPOVER_FIELDS,
} from "../../02_cK_setup_hlpr/salesPlatformSupportList_hlpr.js";
import { getSupportContactCardTitle } from "../../02_cK_setup_hlpr/salesPlatformSupportContacts_hlpr.js";
import { getSalesPlatformDisplayName } from "../../02_cK_setup_hlpr/salesPlatformListRow_hlpr.js";
import "../../_styles/cK_setup_session_salesPlatforms/cK_slsPltfListSupportPopover.css";

const ROW_ICON_SIZE = 14;
const ACTION_ICON_SIZE = 13;
const GROUP_ICON_SIZE = 13;

const FIELD_ICONS = {
  email: Mail,
  phone: Phone,
  whatsApp: MessageCircle,
  hours: Clock,
};

const copyKey = (contactIndex, fieldKey) => `${contactIndex}:${fieldKey}`;

const CK_slsPltfListSupportPopover = ({
  platform,
  anchorEl,
  onClose,
  onOpenSupport,
}) => {
  const rootRef = useRef(null);
  const [pos, setPos] = useState({ top: 0, left: 0, arrowLeft: "50%" });
  const [arrowAbove, setArrowAbove] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  const contacts = platform?.support ?? [];
  const platformName = getSalesPlatformDisplayName(platform);
  const headerCount = formatSupportListHeaderCount(contacts.length);

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
  }, [anchorEl, contacts.length, platform]);

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
      await copySupportListText(value);
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
        "cK_slsPltfListSupportPopover",
        arrowAbove && "cK_slsPltfListSupportPopover--flip",
      ]
        .filter(Boolean)
        .join(" ")}
      role="dialog"
      aria-modal="false"
      aria-label={`Support contacts for ${platformName}`}
      style={{ top: pos.top, left: pos.left }}>
      <span
        className="cK_slsPltfListSupportPopover__arrow"
        style={{ left: pos.arrowLeft }}
        aria-hidden="true"
      />

      <div className="cK_slsPltfListSupportPopover__header">
        <span className="cK_slsPltfListSupportPopover__title">
          {headerCount} — {platformName}
        </span>
        <button
          type="button"
          className="cK_slsPltfListSupportPopover__closeBtn"
          onClick={onClose}
          aria-label="Close support contacts">
          ×
        </button>
      </div>

      {contacts.length === 0 ? (
        <p className="cK_slsPltfListSupportPopover__empty">
          No support contacts saved yet.
        </p>
      ) : (
        <div className="cK_slsPltfListSupportPopover__groups">
          {contacts.map((item, index) => (
            <section
              key={`support-group-${index}`}
              className="cK_slsPltfListSupportPopover__group">
              <h6 className="cK_slsPltfListSupportPopover__groupTitle">
                <Headset size={GROUP_ICON_SIZE} aria-hidden="true" />
                {getSupportContactCardTitle(item, index)}
              </h6>

              <ul className="cK_slsPltfListSupportPopover__rows">
                {SUPPORT_LIST_POPOVER_FIELDS.map((field) => {
                  const fieldState = getSupportListFieldDisplay(item, field);
                  const FieldIcon = FIELD_ICONS[field.key];
                  const fieldCopyKey = copyKey(index, field.key);
                  const isCopied = copiedKey === fieldCopyKey;

                  return (
                    <li key={field.key} className="cK_slsPltfListSupportPopover__row">
                      <span
                        className="cK_slsPltfListSupportPopover__rowIcon"
                        title={field.label}
                        aria-label={field.label}>
                        {FieldIcon ? (
                          <FieldIcon size={ROW_ICON_SIZE} aria-hidden="true" />
                        ) : null}
                      </span>
                      <span
                        className={[
                          "cK_slsPltfListSupportPopover__rowValue",
                          !fieldState.hasValue &&
                            "cK_slsPltfListSupportPopover__rowValue--empty",
                        ]
                          .filter(Boolean)
                          .join(" ")}>
                        {fieldState.displayValue}
                      </span>
                      <button
                        type="button"
                        className={[
                          "cK_slsPltfListSupportPopover__actionBtn",
                          isCopied && "cK_slsPltfListSupportPopover__actionBtn--copied",
                        ]
                          .filter(Boolean)
                          .join(" ")}
                        title={isCopied ? "Copied" : `Copy ${field.label}`}
                        aria-label={isCopied ? "Copied" : `Copy ${field.label}`}
                        onClick={() =>
                          handleCopy(fieldCopyKey, fieldState.trimmedValue)
                        }
                        disabled={!fieldState.hasValue || !field.copyable}>
                        {isCopied ? (
                          <Check size={ACTION_ICON_SIZE} aria-hidden="true" />
                        ) : (
                          <Copy size={ACTION_ICON_SIZE} aria-hidden="true" />
                        )}
                      </button>
                      {field.linkable && fieldState.href ? (
                        <a
                          className="cK_slsPltfListSupportPopover__actionBtn cK_slsPltfListSupportPopover__actionLink"
                          href={fieldState.href}
                          title={`Open ${field.label}`}
                          aria-label={`Open ${field.label}`}
                          {...(shouldOpenSupportListLinkInNewTab(field.key)
                            ? { target: "_blank", rel: "noreferrer" }
                            : {})}>
                          <ExternalLink size={ACTION_ICON_SIZE} aria-hidden="true" />
                        </a>
                      ) : field.linkable ? (
                        <span
                          className="cK_slsPltfListSupportPopover__actionBtn cK_slsPltfListSupportPopover__actionBtn--disabled"
                          aria-hidden="true">
                          <ExternalLink size={ACTION_ICON_SIZE} />
                        </span>
                      ) : (
                        <span
                          className="cK_slsPltfListSupportPopover__actionBtn cK_slsPltfListSupportPopover__actionBtn--disabled"
                          aria-hidden="true"
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      )}

      <div className="cK_slsPltfListSupportPopover__footer">
        <button
          type="button"
          className="cK_slsPltfListSupportPopover__openBtn"
          onClick={() => onOpenSupport?.(platform)}>
          Open support contacts
        </button>
      </div>
    </div>
  );

  return createPortal(node, document.body);
};

export default CK_slsPltfListSupportPopover;
