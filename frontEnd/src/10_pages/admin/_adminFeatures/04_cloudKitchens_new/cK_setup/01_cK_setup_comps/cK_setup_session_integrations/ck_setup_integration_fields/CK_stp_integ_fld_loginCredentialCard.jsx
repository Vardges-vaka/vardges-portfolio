import { useState } from "react";
import {
  Check,
  Copy,
  CopyPlus,
  Expand,
  KeyRound,
  LogIn,
  Mail,
  Pencil,
  Phone,
  ShieldCheck,
  Trash2,
  User,
  UserRound,
} from "lucide-react";
import {
  copyLoginCredentialText,
  formatLoginCredentialDisplayValue,
  getLoginCredentialCardTitle,
  getLoginCredentialFieldValue,
  LOGIN_CREDENTIAL_CARD_PREVIEW_FIELDS,
  LOGIN_CREDENTIAL_COPYABLE_CARD_FIELDS,
} from "../../../02_cK_setup_hlpr/integrationLoginCredentials_hlpr.js";

const ACTION_ICON_SIZE = 14;
const ROW_ICON_SIZE = 13;
const COPY_ICON_SIZE = 12;

const FIELD_ICON_TONES = {
  username: "primary",
  password: "tertiary",
  email: "secondary",
  phone: "secondary",
  loginType: "primary",
  belongsTo: "secondary",
  requiresOtp: "tertiary",
};

const FIELD_ICONS = {
  username: User,
  password: KeyRound,
  email: Mail,
  phone: Phone,
  loginType: LogIn,
  belongsTo: UserRound,
  requiresOtp: ShieldCheck,
};

const getFieldIconTone = (iconKey) => FIELD_ICON_TONES[iconKey] ?? "primary";

const ICON_TONE_CLASS = {
  primary: "cK_stp_integ_fld_loginCredentials__iconTone--primary",
  secondary: "cK_stp_integ_fld_loginCredentials__iconTone--secondary",
  tertiary: "cK_stp_integ_fld_loginCredentials__iconTone--tertiary",
};

const hasText = (value) =>
  typeof value === "string"
    ? value.trim().length > 0
    : value != null && value !== false && value !== "";

const maskValue = (value) => {
  const trimmed = String(value ?? "").trim();
  if (!trimmed) return "-";
  return "•".repeat(Math.min(trimmed.length, 12));
};

const CK_stp_integ_fld_loginCredentialCard = ({
  item,
  index,
  disabled,
  onZoom,
  onUpdate,
  onDuplicate,
  onDelete,
}) => {
  const title = getLoginCredentialCardTitle(item, index);
  const [copiedKey, setCopiedKey] = useState(null);

  const handleCopy = async (fieldKey, value) => {
    const trimmed = String(value ?? "").trim();
    if (!trimmed) return;

    try {
      await copyLoginCredentialText(trimmed);
      setCopiedKey(fieldKey);
      setTimeout(() => {
        setCopiedKey((current) => (current === fieldKey ? null : current));
      }, 1600);
    } catch {
      setCopiedKey(null);
    }
  };

  return (
    <article className="cK_stp_integ_fld_loginCredentials__card">
      <div className="cK_stp_integ_fld_loginCredentials__cardHead">
        <h5 className="cK_stp_integ_fld_loginCredentials__cardTitle">{title}</h5>

        <div className="cK_stp_integ_fld_loginCredentials__cardHeadActions">
          <button
            type="button"
            className={[
              "cK_stp_integ_fld_loginCredentials__iconBtn",
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
              "cK_stp_integ_fld_loginCredentials__iconBtn",
              ICON_TONE_CLASS.secondary,
            ].join(" ")}
            title="Update credential"
            aria-label={`Update ${title}`}
            onClick={onUpdate}
            disabled={disabled}>
            <Pencil size={ACTION_ICON_SIZE} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={[
              "cK_stp_integ_fld_loginCredentials__iconBtn",
              ICON_TONE_CLASS.secondary,
            ].join(" ")}
            title="Duplicate credential"
            aria-label={`Duplicate ${title}`}
            onClick={onDuplicate}
            disabled={disabled}>
            <CopyPlus size={ACTION_ICON_SIZE} aria-hidden="true" />
          </button>
          <button
            type="button"
            className={[
              "cK_stp_integ_fld_loginCredentials__iconBtn",
              ICON_TONE_CLASS.tertiary,
            ].join(" ")}
            title="Delete credential"
            aria-label={`Delete ${title}`}
            onClick={onDelete}
            disabled={disabled}>
            <Trash2 size={ACTION_ICON_SIZE} aria-hidden="true" />
          </button>
        </div>
      </div>

      <div className="cK_stp_integ_fld_loginCredentials__cardBody">
        {LOGIN_CREDENTIAL_CARD_PREVIEW_FIELDS.map((field) => {
          const rawValue = getLoginCredentialFieldValue(item, field);
          const displayValue = field.masked
            ? maskValue(rawValue)
            : formatLoginCredentialDisplayValue(rawValue, field.format);
          const isEmpty = displayValue === "-";
          const FieldIcon = FIELD_ICONS[field.iconKey];
          const isCopyable = LOGIN_CREDENTIAL_COPYABLE_CARD_FIELDS.has(field.key);
          const isCopied = copiedKey === field.key;

          return (
            <div
              key={field.key}
              className={[
                "cK_stp_integ_fld_loginCredentials__cardRow",
                isCopyable && "cK_stp_integ_fld_loginCredentials__cardRow--copyable",
              ]
                .filter(Boolean)
                .join(" ")}>
              <span
                className={[
                  "cK_stp_integ_fld_loginCredentials__cardRowIcon",
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
                  "cK_stp_integ_fld_loginCredentials__cardValue",
                  !hasText(rawValue) &&
                    "cK_stp_integ_fld_loginCredentials__cardValue--empty",
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
                    "cK_stp_integ_fld_loginCredentials__cardCopyBtn",
                    ICON_TONE_CLASS.primary,
                    isCopied &&
                      "cK_stp_integ_fld_loginCredentials__cardCopyBtn--copied",
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

export default CK_stp_integ_fld_loginCredentialCard;
