import CK_stp_brand_fld_otherFileEdit from "./CK_stp_brand_fld_otherFileEdit.jsx";
import CK_stp_brand_fld_otherFileRead from "./CK_stp_brand_fld_otherFileRead.jsx";
import { countPresentOtherFiles } from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_otherFiles.css";

const CK_stp_brand_fld_otherFiles = ({
  brandId,
  integrationId = "",
  items = [],
  editMode = false,
  resolveFileUrl,
  onOtherFileChange,
  onOtherFileFieldChange,
  onOtherFileDelete,
  onAddOtherFiles,
}) => {
  const { total } = countPresentOtherFiles(items);

  if (editMode) {
    return (
      <CK_stp_brand_fld_otherFileEdit
        brandId={brandId}
        integrationId={integrationId}
        items={items}
        resolveFileUrl={resolveFileUrl}
        onOtherFileChange={onOtherFileChange}
        onOtherFileFieldChange={onOtherFileFieldChange}
        onOtherFileDelete={onOtherFileDelete}
        onAddOtherFiles={onAddOtherFiles}
      />
    );
  }

  return (
    <div className="cK_stp_brand_fld_otherFiles">
      <div className="cK_stp_brand_fld_otherFiles__header">
        <h5 className="cK_stp_brand_fld_otherFiles__title">Other files</h5>
        <span className="cK_stp_brand_fld_otherFiles__count">
          {total} attached
        </span>
      </div>

      {total === 0 ? (
        <p className="cK_stp_brand_fld_otherFiles__emptyHint">
          No other files attached yet.
        </p>
      ) : (
        <CK_stp_brand_fld_otherFileRead
          brandId={brandId}
          integrationId={integrationId}
          items={items}
          resolveFileUrl={resolveFileUrl}
        />
      )}
    </div>
  );
};

export default CK_stp_brand_fld_otherFiles;
