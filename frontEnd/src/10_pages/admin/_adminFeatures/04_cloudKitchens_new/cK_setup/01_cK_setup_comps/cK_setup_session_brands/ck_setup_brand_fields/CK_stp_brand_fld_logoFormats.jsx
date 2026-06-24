import {
  LOGO_FORMAT_SLOTS,
  buildFilePreviewUrl,
  countPresentLogoVariants,
} from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import CK_stp_brand_fld_fileActions from "./CK_stp_brand_fld_fileActions.jsx";
import CK_stp_brand_fld_logoFormatEdit from "./CK_stp_brand_fld_logoFormatEdit.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_logoFormats.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileItemFields.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileActions.css";

const CK_stp_brand_fld_logoFormatsRead = ({
  brandId,
  integrationId = "",
  logoVariantMap,
  resolveFileUrl,
}) => {
  const { present, total } = countPresentLogoVariants(logoVariantMap);

  return (
    <div className="cK_stp_brand_fld_logoFormats">
      <div className="cK_stp_brand_fld_logoFormats__header">
        <h5 className="cK_stp_brand_fld_logoFormats__title">Logo formats</h5>
        <span className="cK_stp_brand_fld_logoFormats__count">
          {present} / {total} uploaded
        </span>
      </div>

      <ul className="cK_stp_brand_fld_logoFormats__list">
        {LOGO_FORMAT_SLOTS.map((slot) => {
          const item = logoVariantMap[slot.key];
          const isPresent = Boolean(item?.url);
          const previewUrl = buildFilePreviewUrl(item, resolveFileUrl);

          return (
            <li
              key={slot.key}
              className={[
                "cK_stp_brand_fld_logoFormats__row",
                isPresent
                  ? "cK_stp_brand_fld_logoFormats__row--present"
                  : "cK_stp_brand_fld_logoFormats__row--missing",
              ].join(" ")}>
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

              <div className="cK_stp_brand_fld_logoFormats__actions">
                {isPresent && previewUrl ? (
                  <CK_stp_brand_fld_fileActions
                    brandId={brandId}
                    integrationId={integrationId}
                    item={item}
                    resolveFileUrl={resolveFileUrl}
                    previewUrl={previewUrl}
                  />
                ) : isPresent ? (
                  <CK_stp_brand_fld_fileActions
                    brandId={brandId}
                    integrationId={integrationId}
                    item={item}
                    resolveFileUrl={resolveFileUrl}
                  />
                ) : null}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const CK_stp_brand_fld_logoFormats = ({
  brandId,
  integrationId = "",
  logoVariantMap,
  editMode = false,
  resolveFileUrl,
  onVariantChange,
  onVariantFieldChange,
  onVariantDelete,
}) => {
  if (editMode) {
    return (
      <CK_stp_brand_fld_logoFormatEdit
        brandId={brandId}
        integrationId={integrationId}
        logoVariantMap={logoVariantMap}
        resolveFileUrl={resolveFileUrl}
        onVariantChange={onVariantChange}
        onVariantFieldChange={onVariantFieldChange}
        onVariantDelete={onVariantDelete}
      />
    );
  }

  return (
    <CK_stp_brand_fld_logoFormatsRead
      brandId={brandId}
      integrationId={integrationId}
      logoVariantMap={logoVariantMap}
      resolveFileUrl={resolveFileUrl}
    />
  );
};

export default CK_stp_brand_fld_logoFormats;
