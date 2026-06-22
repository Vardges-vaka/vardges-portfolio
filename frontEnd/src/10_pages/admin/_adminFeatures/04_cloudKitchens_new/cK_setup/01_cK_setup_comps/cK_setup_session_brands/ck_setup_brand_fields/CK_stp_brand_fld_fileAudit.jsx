import { Fragment } from "react";
import {
  formatAuditDate,
  resolveAuditUserName,
} from "../../../02_cK_setup_hlpr/cuisineTagAudit_hlpr.js";
import "../../../_styles/cK_setup_session_brands/ck_setup_brand_fields/cK_stp_brand_fld_fileAudit.css";

const formatBool = (value) => {
  if (value === true) return "Yes";
  if (value === false) return "No";
  return "—";
};

const AUDIT_ROWS = [
  { key: "createdBy", label: "Created by", format: resolveAuditUserName },
  { key: "updatedBy", label: "Updated by", format: resolveAuditUserName },
  { key: "deletedBy", label: "Deleted by", format: resolveAuditUserName },
  { key: "deletedAt", label: "Deleted at", format: formatAuditDate },
  { key: "isDeleted", label: "Is deleted", format: formatBool },
  {
    key: "deletedReason",
    label: "Deleted reason",
    format: (value) => value || "—",
  },
];

const CK_stp_brand_fld_fileAudit = ({ item, title = "Logo audit" }) => (
  <aside className="cK_stp_brand_fld_fileAudit">
    <h6 className="cK_stp_brand_fld_fileAudit__title">{title}</h6>
    <dl className="cK_stp_brand_fld_fileAudit__grid">
      {AUDIT_ROWS.map(({ key, label, format }) => {
        const raw = item?.[key];
        const value = format(raw);
        const isDeletedFlag = key === "isDeleted" && raw === true;

        return (
          <Fragment key={key}>
            <dt className="cK_stp_brand_fld_fileAudit__term">{label}</dt>
            <dd
              className={[
                "cK_stp_brand_fld_fileAudit__value",
                isDeletedFlag && "cK_stp_brand_fld_fileAudit__value--deleted",
              ]
                .filter(Boolean)
                .join(" ")}>
              {value}
            </dd>
          </Fragment>
        );
      })}
    </dl>
  </aside>
);

export default CK_stp_brand_fld_fileAudit;
