import { useCallback, useState } from "react";
import {
  LOGO_FORMAT_SLOTS,
  buildFilePreviewUrl,
  buildLogoVariantTitle,
  countPresentLogoVariants,
  hasRemovableFileContent,
} from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import CK_stp_brand_fld_fileDeleteBtn from "./CK_stp_brand_fld_fileDeleteBtn.jsx";
import CK_stp_brand_fld_fileItemFields from "./CK_stp_brand_fld_fileItemFields.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_logoFormats.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileItemFields.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileDeleteBtn.css";

const CK_stp_brand_fld_logoFormatEdit = ({
  brandId,
  integrationId = "",
  logoVariantMap,
  resolveFileUrl,
  onVariantChange,
  onVariantFieldChange,
  onVariantDelete,
}) => {
  const [expandedKeys, setExpandedKeys] = useState(() => new Set());
  const { present, total } = countPresentLogoVariants(logoVariantMap);

  const toggleExpanded = useCallback((slotKey) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(slotKey)) next.delete(slotKey);
      else next.add(slotKey);
      return next;
    });
  }, []);

  return (
    <div className="cK_stp_brand_fld_logoFormats cK_stp_brand_fld_logoFormats--edit">
      <div className="cK_stp_brand_fld_logoFormats__header">
        <h5 className="cK_stp_brand_fld_logoFormats__title">Logo formats</h5>
        <span className="cK_stp_brand_fld_logoFormats__count">
          {present} / {total} uploaded
        </span>
      </div>

      <ul className="cK_stp_brand_fld_logoFormats__list">
        {LOGO_FORMAT_SLOTS.map((slot) => {
          const item = logoVariantMap[slot.key];
          const isPresent = hasRemovableFileContent(item);
          const isOpen = expandedKeys.has(slot.key);
          const defaultTitle = buildLogoVariantTitle(slot.key);
          const previewUrl = buildFilePreviewUrl(item, resolveFileUrl);

          return (
            <li
              key={slot.key}
              className={[
                "cK_stp_brand_fld_logoFormats__row",
                "cK_stp_brand_fld_logoFormats__row--edit",
                isPresent
                  ? "cK_stp_brand_fld_logoFormats__row--present"
                  : "cK_stp_brand_fld_logoFormats__row--missing",
                isOpen && "cK_stp_brand_fld_logoFormats__row--open",
              ]
                .filter(Boolean)
                .join(" ")}>
              <button
                type="button"
                className="cK_stp_brand_fld_logoFormats__toggle"
                aria-expanded={isOpen}
                aria-label={`${isOpen ? "Collapse" : "Expand"} ${slot.label} fields`}
                onClick={() => toggleExpanded(slot.key)}>
                <span
                  className="cK_stp_brand_fld_logoFormats__chevron"
                  aria-hidden="true">
                  {isOpen ? "▼" : "▶"}
                </span>
              </button>

              <div className="cK_stp_brand_fld_logoFormats__summary">
                <div className="cK_stp_brand_fld_logoFormats__summaryMain">
                  <span className="cK_stp_brand_fld_logoFormats__label">
                    {slot.label}
                  </span>
                  <span
                    className={[
                      "cK_stp_brand_fld_logoFormats__status",
                      isPresent
                        ? "cK_stp_brand_fld_logoFormats__status--present"
                        : "cK_stp_brand_fld_logoFormats__status--missing",
                    ].join(" ")}>
                    {isPresent ? "Present" : "Missing"}
                  </span>
                </div>

                {isPresent ? (
                  <CK_stp_brand_fld_fileDeleteBtn
                    label={`Delete ${slot.label} logo`}
                    onDelete={() => onVariantDelete?.(slot.key)}
                  />
                ) : null}
              </div>

              {isOpen ? (
                <div className="cK_stp_brand_fld_logoFormats__panel">
                  <CK_stp_brand_fld_fileItemFields
                    item={item}
                    brandId={brandId}
                    integrationId={integrationId}
                    showMediaPreview={false}
                    defaultTitle={defaultTitle}
                    defaultFormat={slot.key}
                    resolveFileUrl={resolveFileUrl}
                    onFieldChange={(path, value) =>
                      onVariantFieldChange?.(slot.key, path, value)
                    }
                    fileInput={{
                      accept: slot.accept,
                      previewUrl,
                      previewFileName: slot.label,
                      hint: isPresent
                        ? "Upload a new file to replace this format."
                        : "Upload the file for this logo format.",
                      onChange: (event) =>
                        onVariantChange?.(
                          slot.key,
                          event.target.files?.[0] ?? null,
                        ),
                    }}
                  />
                </div>
              ) : null}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CK_stp_brand_fld_logoFormatEdit;
