import { useState } from "react";
import {
  Check,
  Clock,
  Copy,
  CopyPlus,
  Expand,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  Tag,
  Trash2,
} from "lucide-react";
import {
  copySupportContactText,
  formatSupportContactDisplayValue,
  getSupportContactCardTitle,
  getSupportContactFieldValue,
  SUPPORT_CONTACT_CARD_PREVIEW_FIELDS,
  SUPPORT_CONTACT_COPYABLE_CARD_FIELDS,
} from "../../../02_cK_setup_hlpr/salesPlatformSupportContacts_hlpr.js";

const ACTION_ICON_SIZE = 14;
const ROW_ICON_SIZE = 13;
const COPY_ICON_SIZE = 12;

const FIELD_ICON_TONES = {
  label: "primary",
  email: "secondary",
  phone: "secondary",
  whatsApp: "primary",
  hours: "tertiary",
};

const FIELD_ICONS = {
  label: Tag,
  email: Mail,
  phone: Phone,
  whatsApp: MessageCircle,
  hours: Clock,
};

const getFieldIconTone = (iconKey) => FIELD_ICON_TONES[iconKey] ?? "primary";

const ICON_TONE_CLASS = {
  primary: "cK_stp_slsPltf_fld_supportContacts__iconTone--primary",
  secondary: "cK_stp_slsPltf_fld_supportContacts__iconTone--secondary",
  tertiary: "cK_stp_slsPltf_fld_supportContacts__iconTone--tertiary",
};

const hasText = (value) =>
  typeof value === "string"
    ? value.trim().length > 0
    : value != null && value !== false && value !== "";

const CK_stp_slsPltf_fld_supportContactCard = ({
  item,
  index,
  disabled,
  onZoom,
  onUpdate,
  onDuplicate,
  onDelete,
}) => {
  const title = getSupportContactCardTitle(item, index);
  const [copiedKey, setCopiedKey] = useState(null);

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

  return (
    <article className="cK_stp_slsPltf_fld_supportContacts__card">
      <div className="cK_stp_slsPltf_fld_supportContacts__cardHead">
        <h5 className="cK_stp_slsPltf_fld_supportContacts__cardTitle">{title}</h5>

        <div className="cK_stp_slsPltf_fld_supportContacts__cardHeadActions">
          <button
            type="button"
            className={[
              "cK_stp_slsPltf_fld_supportContacts__iconBtn",
              ICON_TONE_CLASS.primary,
            ].join(" ")}
            title="View details"
            aria-label={`View details for ${title}`}
            onClick={onZoom}
            disabled={disabled}>
            <Expand size={ACTION_ICON_SIZE} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={[
              "cK_stp_slsPltf_fld_supportContacts__iconBtn",
              ICON_TONE_CLASS.secondary,
            ].join(" ")}
            title="Update contact"
            aria-label={`Update ${title}`}
            onClick={onUpdate}
            disabled={disabled}>
            <Pencil size={ACTION_ICON_SIZE} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={[
              "cK_stp_slsPltf_fld_supportContacts__iconBtn",
              ICON_TONE_CLASS.secondary,
            ].join(" ")}
            title="Duplicate contact"
            aria-label={`Duplicate ${title}`}
            onClick={onDuplicate}
            disabled={disabled}>
            <CopyPlus size={ACTION_ICON_SIZE} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={[
              "cK_stp_slsPltf_fld_supportContacts__iconBtn",
              ICON_TONE_CLASS.tertiary,
            ].join(" ")}
            title="Delete contact"
            aria-label={`Delete ${title}`}
            onClick={onDelete}
            disabled={disabled}>
            <Trash2 size={ACTION_ICON_SIZE} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="cK_stp_slsPltf_fld_supportContacts__cardBody">
        {SUPPORT_CONTACT_CARD_PREVIEW_FIELDS.map((field) => {
          const rawValue = getSupportContactFieldValue(item, field);
          const displayValue = formatSupportContactDisplayValue(rawValue);
          const isEmpty = displayValue === "-";
          const FieldIcon = FIELD_ICONS[field.iconKey];
          const isCopyable = SUPPORT_CONTACT_COPYABLE_CARD_FIELDS.has(field.key);
          const isCopied = copiedKey === field.key;

          return (
            <div
              key={field.key}
              className={[
                "cK_stp_slsPltf_fld_supportContacts__cardRow",
                isCopyable && "cK_stp_slsPltf_fld_supportContacts__cardRow--copyable",
              ]
                .filter(Boolean)
                .join(" ")}>
              <span
                className={[
                  "cK_stp_slsPltf_fld_supportContacts__cardRowIcon",
                  ICON_TONE_CLASS[getFieldIconTone(field.iconKey)],
                ].join(" ")}
                title={field.label}
                aria-label={field.label}>
                {FieldIcon ? (
                  <FieldIcon size={ROW_ICON_SIZE} aria-hidden="true" />
                ) : null}
              </span>
              <span
                className={[
                  "cK_stp_slsPltf_fld_supportContacts__cardValue",
                  !hasText(rawValue) &&
                    "cK_stp_slsPltf_fld_supportContacts__cardValue--empty",
                ]
                  .filter(Boolean)
                  .join(" ")}
                title={isEmpty ? field.label : displayValue}>
                {displayValue}
              </span>
              {isCopyable ? (
                <button
                  type="button"
                  className={[
                    "cK_stp_slsPltf_fld_supportContacts__cardCopyBtn",
                    ICON_TONE_CLASS.primary,
                    isCopied &&
                      "cK_stp_slsPltf_fld_supportContacts__cardCopyBtn--copied",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  title={isCopied ? "Copied" : `Copy ${field.label}`}
                  aria-label={isCopied ? "Copied" : `Copy ${field.label}`}
                  onClick={() => handleCopy(field.key, rawValue)}
                  disabled={disabled || !hasText(rawValue)}>
                  {isCopied ? (
                    <Check size={COPY_ICON_SIZE} aria-hidden="true" />
                  ) : (
                    <Copy size={COPY_ICON_SIZE} aria-hidden="true" />
                  )}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </article>
  );
};

export default CK_stp_slsPltf_fld_supportContactCard;
