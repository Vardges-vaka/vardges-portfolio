import { Modal } from "../../../../../../../../01_components/_components.index.js";
import CK_stp_brand_fld_fileMediaPreview from "./CK_stp_brand_fld_fileMediaPreview.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileMediaModal.css";

const CK_stp_brand_fld_fileMediaModal = ({
  isOpen = false,
  item,
  previewUrl = "",
  onClose,
}) => {
  const label = item?.title || "File preview";

  return (
    <Modal
      isOpen={isOpen}
      title={label}
      onCancel={onClose}
      dialogClassName="cK_stp_brand_fld_fileMediaModal_dialog">
      <div className="cK_stp_brand_fld_fileMediaModal">
        <CK_stp_brand_fld_fileMediaPreview
          item={item}
          previewUrl={previewUrl}
          viewer
          autoPlay
          label={label}
        />
      </div>
    </Modal>
  );
};

export default CK_stp_brand_fld_fileMediaModal;
