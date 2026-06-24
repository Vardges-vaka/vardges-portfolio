import { splitBrandFileItems, buildFilePreviewUrl } from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import { useBrandFileReadUrls } from "../../../03_cK_setup_hooks/cK_setup_brands_hooks/useBrandFileReadUrls.js";
import CK_stp_brand_fld_fileAudit from "./CK_stp_brand_fld_fileAudit.jsx";
import CK_stp_brand_fld_fileActions from "./CK_stp_brand_fld_fileActions.jsx";
import CK_stp_brand_fld_fileMediaPreview from "./CK_stp_brand_fld_fileMediaPreview.jsx";
import CK_stp_brand_fld_logoFormats from "./CK_stp_brand_fld_logoFormats.jsx";
import CK_stp_brand_fld_otherFiles from "./CK_stp_brand_fld_otherFiles.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_files.css";

const CK_stp_brand_fld_files = ({ brandId, states, handlers }) => {
  const files = states.files ?? { items: [] };
  const disabled = Boolean(states.disabled);
  const { resolveFileUrl } = useBrandFileReadUrls(brandId, files);
  const { logoVariantMap, displayLogoItem, primaryAuditItem, otherItems } =
    splitBrandFileItems(files.items);

  const heroPreviewUrl = buildFilePreviewUrl(displayLogoItem, resolveFileUrl);
  const pdfItem = logoVariantMap.pdf;
  const pdfPreviewUrl = buildFilePreviewUrl(pdfItem, resolveFileUrl);
  const hasPdfOnly = !heroPreviewUrl && Boolean(pdfPreviewUrl);

  return (
    <section className="cK_stp_brand_fld_files">
      <div
        className={[
          "cK_stp_brand_fld_files__logoRow",
          !disabled && "cK_stp_brand_fld_files__logoRow--edit",
        ]
          .filter(Boolean)
          .join(" ")}>
        {disabled ? (
          <div className="cK_stp_brand_fld_files__logoVisual">
            {heroPreviewUrl ? (
              <>
                <img
                  className="cK_stp_brand_fld_files__logoImg"
                  src={heroPreviewUrl}
                  alt="Brand logo preview"
                />
                <CK_stp_brand_fld_fileActions
                  brandId={brandId}
                  item={displayLogoItem}
                  resolveFileUrl={resolveFileUrl}
                  previewUrl={heroPreviewUrl}
                  className="cK_stp_brand_fld_files__heroActions"
                />
              </>
            ) : hasPdfOnly ? (
              <div className="cK_stp_brand_fld_files__logoPlaceholder cK_stp_brand_fld_files__logoPlaceholder--pdf">
                <CK_stp_brand_fld_fileMediaPreview
                  item={pdfItem}
                  previewUrl={pdfPreviewUrl}
                  label="PDF logo"
                />
                <CK_stp_brand_fld_fileActions
                  brandId={brandId}
                  item={pdfItem}
                  resolveFileUrl={resolveFileUrl}
                  previewUrl={pdfPreviewUrl}
                  className="cK_stp_brand_fld_files__heroActions"
                />
              </div>
            ) : (
              <div
                className="cK_stp_brand_fld_files__logoPlaceholder"
                role="img"
                aria-label="No logo found">
                No logo found
              </div>
            )}
          </div>
        ) : null}

        {disabled ? (
          <CK_stp_brand_fld_fileAudit item={primaryAuditItem} />
        ) : (
          <CK_stp_brand_fld_logoFormats
            editMode
            brandId={brandId}
            logoVariantMap={logoVariantMap}
            resolveFileUrl={resolveFileUrl}
            onVariantChange={handlers.onLogoVariantChange}
            onVariantFieldChange={handlers.onLogoVariantFieldChange}
            onVariantDelete={handlers.onLogoVariantDelete}
          />
        )}
      </div>

      {disabled ? (
        <CK_stp_brand_fld_logoFormats
          brandId={brandId}
          logoVariantMap={logoVariantMap}
          resolveFileUrl={resolveFileUrl}
        />
      ) : null}

      <CK_stp_brand_fld_otherFiles
        brandId={brandId}
        items={otherItems}
        editMode={!disabled}
        resolveFileUrl={resolveFileUrl}
        onOtherFileChange={handlers.onOtherFileChange}
        onOtherFileFieldChange={handlers.onOtherFileFieldChange}
        onOtherFileDelete={handlers.onOtherFileDelete}
        onAddOtherFiles={handlers.onAddOtherFiles}
      />
    </section>
  );
};

export default CK_stp_brand_fld_files;
