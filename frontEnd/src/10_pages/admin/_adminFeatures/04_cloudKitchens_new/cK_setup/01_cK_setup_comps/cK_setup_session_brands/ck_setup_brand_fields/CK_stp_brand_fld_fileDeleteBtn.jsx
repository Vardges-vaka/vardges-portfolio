import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileDeleteBtn.css";

const CK_stp_brand_fld_fileDeleteBtn = ({
  onDelete,
  label = "Delete file",
  className = "",
}) => (
  <button
    type="button"
    className={["cK_stp_brand_fld_fileDeleteBtn", className].filter(Boolean).join(" ")}
    aria-label={label}
    onClick={onDelete}>
    Delete
  </button>
);

export default CK_stp_brand_fld_fileDeleteBtn;
