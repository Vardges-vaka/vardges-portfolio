import {
  LOGO_FORMAT_SLOTS,
  countPresentLogoVariants,
} from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import CK_stp_brand_fld_logoFormatEdit from "./CK_stp_brand_fld_logoFormatEdit.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_logoFormats.css";

const CK_stp_brand_fld_logoFormatsRead = ({ logoVariantMap }) => {
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
                {isPresent && item.url ? (
                  <a
                    className="cK_stp_brand_fld_logoFormats__openLink"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer">
                    Open
                  </a>
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
  logoVariantMap,
  editMode = false,
  onVariantChange,
  onVariantFieldChange,
}) => {
  if (editMode) {
    return (
      <CK_stp_brand_fld_logoFormatEdit
        logoVariantMap={logoVariantMap}
        onVariantChange={onVariantChange}
        onVariantFieldChange={onVariantFieldChange}
      />
    );
  }

  return <CK_stp_brand_fld_logoFormatsRead logoVariantMap={logoVariantMap} />;
};

export default CK_stp_brand_fld_logoFormats;
