import CK_stp_brand_fieldHeader from "./CK_stp_brand_fieldHeader.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_collapsibleSection.css";

const CK_stp_brand_collapsibleSection = ({
  fieldKey,
  title,
  isExpanded = false,
  onToggle,
  sectionClassName = "",
  headerProps = {},
  rightChild = null,
  readOnly = false,
  isSaving = false,
  isEditOpen = false,
  keepFieldsetEnabled = false,
  children,
}) => {
  const toggleLabel = `${isExpanded ? "Collapse" : "Expand"} ${title}`;
  const showConfirmCancel = isExpanded && headerProps.showConfirmCancel;
  const showUpdate = isExpanded && headerProps.showUpdate;
  const fieldsetDisabled =
    !keepFieldsetEnabled && (readOnly || !isEditOpen || isSaving);

  return (
    <section
      className={[
        "cK_stp_brand_collapsibleSection",
        sectionClassName,
        !isExpanded && "cK_stp_brand_collapsibleSection--collapsed",
        readOnly && "cK_stp_brand_collapsibleSection--readOnly",
      ]
        .filter(Boolean)
        .join(" ")}
      data-field={fieldKey}>
      <CK_stp_brand_fieldHeader
        title={title}
        {...headerProps}
        showUpdate={showUpdate}
        showConfirmCancel={showConfirmCancel}
        rightChild={
          <>
            {rightChild}
            <button
              type="button"
              className="cK_stp_brand_fieldHeader__btn cK_stp_brand_fieldHeader__btn_secondary cK_stp_brand_collapsibleSection__toggle"
              aria-expanded={isExpanded}
              aria-controls={`brand-section-${fieldKey}`}
              aria-label={toggleLabel}
              onClick={onToggle}
              disabled={isSaving || showConfirmCancel}>
              <span className="cK_stp_brand_collapsibleSection__chevron" aria-hidden="true">
                {isExpanded ? "▼" : "▶"}
              </span>
            </button>
          </>
        }
      />

      {isExpanded ? (
        <fieldset
          id={`brand-section-${fieldKey}`}
          className="cK_setup_brands_viewOne__sectionBody"
          disabled={fieldsetDisabled}>
          {children}
        </fieldset>
      ) : null}
    </section>
  );
};

export default CK_stp_brand_collapsibleSection;
