import { Fragment, useCallback, useState } from "react";
import {
  buildFilePreviewUrl,
  formatFileItemValue,
  getFileItemUsedIn,
} from "../../../02_cK_setup_hlpr/brandFiles_hlpr.js";
import {
  formatAuditDate,
  resolveAuditUserName,
} from "../../../02_cK_setup_hlpr/cuisineTagAudit_hlpr.js";
import CK_stp_brand_fld_fileActions from "./CK_stp_brand_fld_fileActions.jsx";
import CK_stp_brand_fld_fileMediaPreview from "./CK_stp_brand_fld_fileMediaPreview.jsx";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_otherFiles.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileMediaPreview.css";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileActions.css";

const DETAIL_ROWS = [
  { label: "Title", getValue: (item) => item?.title },
  { label: "Format", getValue: (item) => item?.format },
  { label: "Size (KB)", getValue: (item) => item?.sizeIn_KB },
  { label: "Used in", getValue: (item) => getFileItemUsedIn(item) },
  { label: "Ref", getValue: (item) => item?.ref },
  { label: "Description", getValue: (item) => item?.description?.value },
  { label: "Description short", getValue: (item) => item?.description?.short },
  { label: "Description long", getValue: (item) => item?.description?.long },
  { label: "Notes", getValue: (item) => item?.notes },
];

const AUDIT_ROWS = [
  { label: "Created by", getValue: (item) => resolveAuditUserName(item?.createdBy) },
  { label: "Updated by", getValue: (item) => resolveAuditUserName(item?.updatedBy) },
  { label: "Deleted by", getValue: (item) => resolveAuditUserName(item?.deletedBy) },
  { label: "Deleted at", getValue: (item) => formatAuditDate(item?.deletedAt) },
  {
    label: "Is deleted",
    getValue: (item) =>
      item?.isDeleted === true ? "Yes" : item?.isDeleted === false ? "No" : "—",
  },
  { label: "Deleted reason", getValue: (item) => item?.deletedReason },
];

const CK_stp_brand_fld_otherFileRead = ({
  brandId,
  integrationId = "",
  items = [],
  resolveFileUrl,
}) => {
  const [expandedKeys, setExpandedKeys] = useState(() => new Set());

  const toggleExpanded = useCallback((rowKey) => {
    setExpandedKeys((prev) => {
      const next = new Set(prev);
      if (next.has(rowKey)) next.delete(rowKey);
      else next.add(rowKey);
      return next;
    });
  }, []);

  return (
    <ul className="cK_stp_brand_fld_otherFiles__list">
      {items.map((item, index) => {
        const rowKey = `${item.title || "file"}-${item.url || "empty"}-${index}`;
        const isPresent = Boolean(item?.url);
        const isOpen = expandedKeys.has(rowKey);
        const previewUrl = buildFilePreviewUrl(item, resolveFileUrl);
        const label = item?.title || `File ${index + 1}`;

        return (
          <li
            key={rowKey}
            className={[
              "cK_stp_brand_fld_otherFiles__row",
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
              aria-label={`${isOpen ? "Collapse" : "Expand"} ${label} details`}
              onClick={() => toggleExpanded(rowKey)}>
              <span className="cK_stp_brand_fld_otherFiles__chevron" aria-hidden="true">
                {isOpen ? "▼" : "▶"}
              </span>
            </button>

            <div className="cK_stp_brand_fld_otherFiles__summary">
              <span className="cK_stp_brand_fld_otherFiles__label">{label}</span>
              {item?.format ? (
                <span className="cK_stp_brand_fld_otherFiles__meta">{item.format}</span>
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
                <CK_stp_brand_fld_fileActions
                  brandId={brandId}
                  integrationId={integrationId}
                  item={item}
                  resolveFileUrl={resolveFileUrl}
                  previewUrl={previewUrl}
                />
              ) : null}
            </div>

            {isOpen ? (
              <div className="cK_stp_brand_fld_otherFiles__panel">
                {previewUrl ? (
                  <CK_stp_brand_fld_fileMediaPreview
                    item={item}
                    previewUrl={previewUrl}
                    label={label}
                  />
                ) : null}

                <dl className="cK_stp_brand_fld_otherFiles__detailGrid">
                  {DETAIL_ROWS.map(({ label: rowLabel, getValue }) => (
                    <Fragment key={rowLabel}>
                      <dt className="cK_stp_brand_fld_otherFiles__term">{rowLabel}</dt>
                      <dd className="cK_stp_brand_fld_otherFiles__value">
                        {formatFileItemValue(getValue(item))}
                      </dd>
                    </Fragment>
                  ))}
                </dl>

                <div className="cK_stp_brand_fld_otherFiles__auditBlock">
                  <h6 className="cK_stp_brand_fld_otherFiles__auditTitle">Audit</h6>
                  <dl className="cK_stp_brand_fld_otherFiles__detailGrid">
                    {AUDIT_ROWS.map(({ label: rowLabel, getValue }) => (
                      <Fragment key={rowLabel}>
                        <dt className="cK_stp_brand_fld_otherFiles__term">{rowLabel}</dt>
                        <dd className="cK_stp_brand_fld_otherFiles__value">
                          {formatFileItemValue(getValue(item))}
                        </dd>
                      </Fragment>
                    ))}
                  </dl>
                </div>
              </div>
            ) : null}
          </li>
        );
      })}
    </ul>
  );
};

export default CK_stp_brand_fld_otherFileRead;
