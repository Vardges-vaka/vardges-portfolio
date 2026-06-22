import { Input_file } from "../../../../../../../../01_components/_components.index.js";
import { splitBrandFileItems } from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import CK_stp_brand_fld_fileAudit from "./CK_stp_brand_fld_fileAudit.jsx";
import CK_stp_brand_fld_logoFormats from "./CK_stp_brand_fld_logoFormats.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_files.css";

const CK_stp_brand_fld_files = ({ states, handlers }) => {
  const files = states.files ?? { items: [] };
  const disabled = Boolean(states.disabled);
  const { logoVariantMap, displayLogoItem, primaryAuditItem, otherItems } =
    splitBrandFileItems(files.items);

  const heroUrl = displayLogoItem?.url || "";
  const pdfItem = logoVariantMap.pdf;
  const hasPdfOnly = !heroUrl && Boolean(pdfItem?.url);

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
            {heroUrl ? (
              <img
                className="cK_stp_brand_fld_files__logoImg"
                src={heroUrl}
                alt="Brand logo preview"
              />
            ) : hasPdfOnly ? (
              <div className="cK_stp_brand_fld_files__logoPlaceholder cK_stp_brand_fld_files__logoPlaceholder--pdf">
                <span>PDF logo available</span>
                <a
                  className="cK_stp_brand_fld_files__pdfLink"
                  href={pdfItem.url}
                  target="_blank"
                  rel="noreferrer">
                  Open PDF
                </a>
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
            logoVariantMap={logoVariantMap}
            onVariantChange={handlers.onLogoVariantChange}
            onVariantFieldChange={handlers.onLogoVariantFieldChange}
          />
        )}
      </div>

      {disabled ? (
        <CK_stp_brand_fld_logoFormats logoVariantMap={logoVariantMap} />
      ) : null}

      <div className="cK_stp_brand_fld_files__otherList">
        <h5 className="cK_stp_brand_fld_files__otherTitle">Other files</h5>

        {otherItems.length === 0 ? (
          <p className="cK_stp_brand_fld_files__emptyHint">
            No other files attached yet.
          </p>
        ) : null}

        {disabled && otherItems.length > 0 ? (
          <ul className="cK_stp_brand_fld_files__readList">
            {otherItems.map((item, index) => (
              <li
                key={`${item.title || "file"}-${item.url || "empty"}-${index}`}
                className="cK_stp_brand_fld_files__readItem">
                <span className="cK_stp_brand_fld_files__readItemName">
                  {item.title || `File ${index + 1}`}
                </span>
                {item.format ? (
                  <span className="cK_stp_brand_fld_files__readItemMeta">
                    {item.format}
                  </span>
                ) : null}
                {item.url ? (
                  <a
                    className="cK_stp_brand_fld_files__readItemLink"
                    href={item.url}
                    target="_blank"
                    rel="noreferrer">
                    Open
                  </a>
                ) : null}
              </li>
            ))}
          </ul>
        ) : null}

        {!disabled
          ? otherItems.map((item, index) => (
              <Input_file
                key={`${item.title || "file"}-${item.url || "empty"}-${index}`}
                labelProps={{
                  isActive: true,
                  message: item.title || `File ${index + 1}`,
                }}
                hintsProps={{
                  isActive: Boolean(item.notes),
                  type: "hint",
                  message: item.notes || item.format || "",
                }}
                showPreviewPanel
                previewUrl={item.url || ""}
                previewFileName={item.title || ""}
                simulateUpload
                onChange={(event) =>
                  handlers.onOtherFileChange?.(
                    index,
                    event.target.files?.[0] ?? null,
                  )
                }
              />
            ))
          : null}

        {!disabled ? (
          <div className="cK_stp_brand_fld_files__addBlock">
            <Input_file
              multiple
              labelProps={{ isActive: true, message: "Add files" }}
              hintsProps={{
                isActive: true,
                type: "hint",
                message: "New files are saved when you confirm this section.",
              }}
              showPreviewPanel
              simulateUpload
              onChange={(event) =>
                handlers.onAddOtherFiles?.([...(event.target.files ?? [])])
              }
            />
          </div>
        ) : null}
      </div>
    </section>
  );
};

export default CK_stp_brand_fld_files;
