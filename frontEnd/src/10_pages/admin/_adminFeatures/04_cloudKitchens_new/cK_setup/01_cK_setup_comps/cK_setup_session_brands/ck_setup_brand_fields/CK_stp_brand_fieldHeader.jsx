import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fieldHeader.css";

const CK_stp_brand_fieldHeader = ({
  title,
  showUpdate = false,
  showConfirmCancel = false,
  onUpdate,
  onCancel,
  onConfirm,
  isSaving = false,
  leftChild = null,
  middleChild = null,
  rightChild = null,
}) => {
  return (
    <div className="cK_stp_brand_fieldHeader">
      <div className="cK_stp_brand_fieldHeader__start">
        <h4 className="cK_stp_brand_fieldHeader__title">{title}</h4>
        {leftChild}
      </div>

      <div className="cK_stp_brand_fieldHeader__middle">{middleChild}</div>

      <div className="cK_stp_brand_fieldHeader__end">
        {rightChild}
        {showUpdate ? (
          <button
            type="button"
            className="cK_stp_brand_fieldHeader__btn cK_stp_brand_fieldHeader__btn_primary"
            onClick={onUpdate}
            disabled={isSaving}>
            Update
          </button>
        ) : null}
        {showConfirmCancel ? (
          <>
            <button
              type="button"
              className="cK_stp_brand_fieldHeader__btn cK_stp_brand_fieldHeader__btn_secondary"
              onClick={onCancel}
              disabled={isSaving}>
              Cancel
            </button>
            <button
              type="button"
              className="cK_stp_brand_fieldHeader__btn cK_stp_brand_fieldHeader__btn_primary"
              onClick={onConfirm}
              disabled={isSaving}>
              Confirm
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};

export default CK_stp_brand_fieldHeader;
