import { useState } from "react";
import { Check, Copy, ExternalLink } from "lucide-react";
import { Modal } from "../../../../../../../../01_components/_components.index.js";
import {
  formatLoginCredentialDisplayValue,
  getLoginCredentialCardTitle,
  getLoginCredentialFieldValue,
  getLoginCredentialPasswordHref,
  getLoginCredentialUsernameHref,
  LOGIN_CREDENTIAL_CARD_FIELDS,
} from "../../../02_cK_setup_hlpr/integrationLoginCredentials_hlpr.js";

const ACTION_ICON_SIZE = 13;

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

const CK_stp_integ_fld_loginCredentialZoomModal = ({
  isOpen,
  item,
  index,
  portalUrl,
  onClose,
}) => {
  const [copiedKey, setCopiedKey] = useState(null);

  if (!item) return null;

  const title = getLoginCredentialCardTitle(item, index);

  const handleCopy = async (fieldKey, value) => {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return;

    try {
      await copyTextToClipboard(trimmed);
      setCopiedKey(fieldKey);
      setTimeout(() => {
        setCopiedKey((current) => (current === fieldKey ? null : current));
      }, 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  const renderActionButtons = (fieldKey, rawValue, href) => {
    const trimmed = String(rawValue ?? "").trim();
    const hasValue = Boolean(trimmed);
    const isCopied = copiedKey === fieldKey;

    return (
      <span className="cK_stp_integ_fld_loginCredentials__zoomActions">
        <button
          type="button"
          className={[
            "cK_stp_integ_fld_loginCredentials__actionBtn",
            isCopied && "cK_stp_integ_fld_loginCredentials__actionBtn--copied",
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

        {href ? (
          <a
            className="cK_stp_integ_fld_loginCredentials__actionBtn"
            href={href}
            title="Open link"
            aria-label="Open link"
            target="_blank"
            rel="noreferrer">
            <ExternalLink size={ACTION_ICON_SIZE} aria-hidden="true" />
          </a>
        ) : (
          <span
            className="cK_stp_integ_fld_loginCredentials__actionBtn cK_stp_integ_fld_loginCredentials__actionBtn--disabled"
            aria-hidden="true">
            <ExternalLink size={ACTION_ICON_SIZE} />
          </span>
        )}
      </span>
    );
  };

  return (
    <Modal isOpen={isOpen} title={title} onCancel={onClose}>
      <div className="cK_stp_integ_fld_loginCredentials__zoomModalBody">
        {LOGIN_CREDENTIAL_CARD_FIELDS.map((field) => {
          const rawValue = getLoginCredentialFieldValue(item, field);
          const displayValue = formatLoginCredentialDisplayValue(
            rawValue,
            field.format,
          );
          const isEmpty = displayValue === "-";
          const isMultiline = field.key === "notes";
          const showActions = field.key === "username" || field.key === "password";

          let href = null;
          if (field.key === "username") {
            href = getLoginCredentialUsernameHref(item, portalUrl);
          }
          if (field.key === "password") {
            href = getLoginCredentialPasswordHref(portalUrl);
          }

          return (
            <div
              key={field.key}
              className={[
                "cK_stp_integ_fld_loginCredentials__zoomRow",
                isMultiline &&
                  "cK_stp_integ_fld_loginCredentials__zoomRow--multiline",
                showActions &&
                  "cK_stp_integ_fld_loginCredentials__zoomRow--withActions",
              ]
                .filter(Boolean)
                .join(" ")}
              style={
                showActions
                  ? {
                      gridTemplateColumns: "7.5rem minmax(0, 1fr) auto",
                    }
                  : { gridTemplateColumns: "7.5rem minmax(0, 1fr)" }
              }>
              <span className="cK_stp_integ_fld_loginCredentials__zoomLabel">
                {field.label}
              </span>
              <span
                className={[
                  "cK_stp_integ_fld_loginCredentials__zoomValue",
                  isEmpty && "cK_stp_integ_fld_loginCredentials__zoomValue--empty",
                ]
                  .filter(Boolean)
                  .join(" ")}>
                {field.key === "password" && !isEmpty
                  ? "•".repeat(Math.min(String(rawValue).trim().length, 16))
                  : displayValue}
              </span>
              {showActions
                ? renderActionButtons(field.key, rawValue, href)
                : null}
            </div>
          );
        })}
      </div>
    </Modal>
  );
};

export default CK_stp_integ_fld_loginCredentialZoomModal;
