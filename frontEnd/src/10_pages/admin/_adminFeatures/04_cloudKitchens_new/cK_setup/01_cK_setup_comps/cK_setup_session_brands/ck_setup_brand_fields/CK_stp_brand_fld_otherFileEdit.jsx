import { useCallback, useState } from "react";
import { Input_file } from "../../../../../../../../01_components/_components.index.js";
import { countPresentOtherFiles, buildFilePreviewUrl, hasRemovableFileContent } from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import CK_stp_brand_fld_fileActions from "./CK_stp_brand_fld_fileActions.jsx";
import CK_stp_brand_fld_fileDeleteBtn from "./CK_stp_brand_fld_fileDeleteBtn.jsx";
import CK_stp_brand_fld_fileItemFields from "./CK_stp_brand_fld_fileItemFields.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_otherFiles.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileItemFields.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileActions.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileDeleteBtn.css";

const CK_stp_brand_fld_otherFileEdit = ({
  brandId,
  integrationId = "",
  items = [],
  resolveFileUrl,
  onOtherFileChange,
  onOtherFileFieldChange,
  onOtherFileDelete,
  onAddOtherFiles,
}) => {
  const [expandedKeys, setExpandedKeys] = useState(() => new Set());
  const { present, total } = countPresentOtherFiles(items);

  const toggleExpanded = useCallback((rowKey) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(rowKey)) next.delete(rowKey);
      else next.add(rowKey);
      return next;
    });
  }, []);

  return (
    <div className="cK_stp_brand_fld_otherFiles cK_stp_brand_fld_otherFiles--edit">
      <div className="cK_stp_brand_fld_otherFiles__header">
        <h5 className="cK_stp_brand_fld_otherFiles__title">Attached files</h5>
        <span className="cK_stp_brand_fld_otherFiles__count">
          {present} / {total} uploaded
        </span>
      </div>

      {items.length === 0 ? (
        <p className="cK_stp_brand_fld_otherFiles__emptyHint">
          No other files attached yet. Use Add files below.
        </p>
      ) : (
        <ul className="cK_stp_brand_fld_otherFiles__list">
          {items.map((item, index) => {
            const rowKey = `${item.title || "file"}-${item.url || "empty"}-${index}`;
            const isPresent = hasRemovableFileContent(item);
            const isOpen = expandedKeys.has(rowKey);
            const label = item?.title || `File ${index + 1}`;
            const previewUrl = buildFilePreviewUrl(item, resolveFileUrl);

            return (
              <li
                key={rowKey}
                className={[
                  "cK_stp_brand_fld_otherFiles__row",
                  "cK_stp_brand_fld_otherFiles__row--edit",
                  isPresent
                    ? "cK_stp_brand_fld_otherFiles__row--present"
                    : "cK_stp_brand_fld_otherFiles__row--missing",
                  isOpen && "cK_stp_brand_fld_otherFiles__row--open",
                ]
                  .filter(Boolean)
                  .join(" ")}>
                <button
                  type="button"
                  className="cK_stp_brand_fld_otherFiles__toggle"
                  aria-expanded={isOpen}
                  aria-label={`${isOpen ? "Collapse" : "Expand"} ${label} fields`}
                  onClick={() => toggleExpanded(rowKey)}>
                  <span
                    className="cK_stp_brand_fld_otherFiles__chevron"
                    aria-hidden="true">
                    {isOpen ? "▼" : "▶"}
                  </span>
                </button>

                <div className="cK_stp_brand_fld_otherFiles__summary">
                  <span className="cK_stp_brand_fld_otherFiles__label">{label}</span>
                  {item?.format ? (
                    <span className="cK_stp_brand_fld_otherFiles__meta">
                      {item.format}
                    </span>
                  ) : null}
                  <span
                    className={[
                      "cK_stp_brand_fld_otherFiles__status",
                      isPresent
                        ? "cK_stp_brand_fld_otherFiles__status--present"
                        : "cK_stp_brand_fld_otherFiles__status--missing",
                    ].join(" ")}>
                    {isPresent ? "Present" : "Missing"}
                  </span>
                </div>

                <div className="cK_stp_brand_fld_otherFiles__actions">
                  {isPresent ? (
                    <>
                      <CK_stp_brand_fld_fileDeleteBtn
                        label={`Delete ${label}`}
                        onDelete={() => onOtherFileDelete?.(index)}
                      />
                      <CK_stp_brand_fld_fileActions
                        brandId={brandId}
                        integrationId={integrationId}
                        item={item}
                        resolveFileUrl={resolveFileUrl}
                        previewUrl={previewUrl}
                      />
                    </>
                  ) : null}
                </div>

                {isOpen ? (
                  <div className="cK_stp_brand_fld_otherFiles__panel">
                    <CK_stp_brand_fld_fileItemFields
                      item={item}
                      brandId={brandId}
                      integrationId={integrationId}
                      defaultTitle={label}
                      defaultFormat={item?.format || ""}
                      resolveFileUrl={resolveFileUrl}
                      onFieldChange={(path, value) =>
                        onOtherFileFieldChange?.(index, path, value)
                      }
                      fileInput={{
                        previewUrl,
                        previewFileName: label,
                        onChange: (event) =>
                          onOtherFileChange?.(
                            index,
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
      )}

      <div className="cK_stp_brand_fld_otherFiles__addBlock">
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
          onChange={(event) => onAddOtherFiles?.([...(event.target.files ?? [])])}
        />
      </div>
    </div>
  );
};

export default CK_stp_brand_fld_otherFileEdit;
