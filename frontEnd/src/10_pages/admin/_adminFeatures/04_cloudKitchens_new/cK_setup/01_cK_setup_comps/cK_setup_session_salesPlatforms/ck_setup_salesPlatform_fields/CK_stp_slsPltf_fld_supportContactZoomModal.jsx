import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Modal } from "../../../../../../../../01_components/_components.index.js";
import {
  copySupportContactText,
  formatSupportContactDisplayValue,
  getSupportContactCardTitle,
  getSupportContactFieldHref,
  getSupportContactFieldValue,
  SUPPORT_CONTACT_CARD_FIELDS,
  SUPPORT_CONTACT_LINK_FIELDS,
} from "../../../02_cK_setup_hlpr/salesPlatformSupportContacts_hlpr.js";

const ACTION_ICON_SIZE = 13;

const CK_stp_slsPltf_fld_supportContactZoomModal = ({
  isOpen,
  item,
  index,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!item) return null;

  const title = getSupportContactCardTitle(item, index);

  const handleCopy = async (fieldKey, value) => {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return;

    try {
      await copySupportContactText(trimmed);
      setCopiedKey(fieldKey);
      setTimeout(() => {
        setCopiedKey((current) => (current === fieldKey ? null : current));
      }, 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  const renderActionButtons = (fieldKey, rawValue) => {
    const trimmed = String(rawValue ?? "").trim();
    const hasValue = Boolean(trimmed);
    const isCopied = copiedKey === fieldKey;
    const href = getSupportContactFieldHref(fieldKey, trimmed);
    const showLink = SUPPORT_CONTACT_LINK_FIELDS.has(fieldKey);

    return (
      <span className="cK_stp_slsPltf_fld_supportContacts__zoomActions">
        <button
          type="button"
          className={[
            "cK_stp_slsPltf_fld_supportContacts__actionBtn",
            isCopied && "cK_stp_slsPltf_fld_supportContacts__actionBtn--copied",
          ]
            .filter(Boolean)
            .join(" ")}
          title={isCopied ? "Copied" : "Copy value"}
          aria-label={isCopied ? "Copied" : "Copy value"}
          onClick={() => handleCopy(fieldKey, trimmed)}
          disabled={!hasValue}>
          {isCopied ? (
            <Check size={ACTION_ICON_SIZE} aria-hidden="true" />
          ) : (
            <Copy size={ACTION_ICON_SIZE} aria-hidden="true" />
          )}
        </button>

        {showLink && href ? (
          <a
            className="cK_stp_slsPltf_fld_supportContacts__actionBtn"
            href={href}
            title="Open link"
            aria-label="Open link"
            target="_blank"
            rel="noreferrer">
            <ExternalLink size={ACTION_ICON_SIZE} aria-hidden="true" />
          </a>
        ) : showLink ? (
          <span
            className="cK_stp_slsPltf_fld_supportContacts__actionBtn cK_stp_slsPltf_fld_supportContacts__actionBtn--disabled"
            aria-hidden="true">
            <ExternalLink size={ACTION_ICON_SIZE} />
          </span>
        ) : null}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} title={title} onCancel={onClose}>
      <div className="cK_stp_slsPltf_fld_supportContacts__zoomModalBody">
        {SUPPORT_CONTACT_CARD_FIELDS.map((field) => {
          const rawValue = getSupportContactFieldValue(item, field);
          const displayValue = formatSupportContactDisplayValue(rawValue);
          const isEmpty = displayValue === "-";
          const showActions = SUPPORT_CONTACT_LINK_FIELDS.has(field.key);

          return (
            <div
              key={field.key}
              className={[
                "cK_stp_slsPltf_fld_supportContacts__zoomRow",
                showActions &&
                  "cK_stp_slsPltf_fld_supportContacts__zoomRow--withActions",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                showActions
                  ? { gridTemplateColumns: "7.5rem minmax(0, 1fr) auto" }
                  : { gridTemplateColumns: "7.5rem minmax(0, 1fr)" }
              }>
              <span className="cK_stp_slsPltf_fld_supportContacts__zoomLabel">
                {field.label}
              </span>
              <span
                className={[
                  "cK_stp_slsPltf_fld_supportContacts__zoomValue",
                  isEmpty && "cK_stp_slsPltf_fld_supportContacts__zoomValue--empty",
                ]
                  .filter(Boolean)
                  .join(" ")}>
                {displayValue}
              </span>
              {showActions ? renderActionButtons(field.key, rawValue) : null}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default CK_stp_slsPltf_fld_supportContactZoomModal;
